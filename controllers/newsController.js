const newsModel = require('../models/newsModel'); // uses functions made in models
const generateUniqueSlug = require('../services/generateUniqueSlug');
const db = require('../db/db');
// for functions called in routes
// params are in the url like /news/:slug or /admin/news/edit/:id

exports.renderNewsPage = async (req, res) => {
    const [allCategories] = await db.query(`
        SELECT *
        FROM news_categories
        ORDER BY name ASC
    `);

    try {
        const articles = await newsModel.getAllPublishedArticles();

        res.render('news', {
            title: 'News',
            articles,
            allCategories
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }

};

exports.renderArticlePage = async (req, res) => { // displays one public news page
    try {
        const slug = req.params.slug;

        const article = await newsModel.getArticleBySlug(slug);

        if (!article) {
            return res.status(404).send('Article not found');
        }

        const blocks = await newsModel.getArticleBlocks(article.article_id);

        const categories = await newsModel.getArticleCategories(article.article_id);

        res.render('newsArticle', {
            title: article.title,
            article,
            blocks,
            categories
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.renderCreatePage = async (req, res) => { // only dynamic thing in page is catagories

    const db = require('../db/db');

    const [categories] = await db.query(`
        SELECT *
        FROM news_categories
        ORDER BY name ASC
    `);

    res.render('adminCreateNews', {
        title: 'Create Article',
        categories
    });
};

exports.createArticle = async (req, res) => {

    try {

        const {
            title,
            summary,
            featured,
            categories,
            blocks,
            status
        } = req.body;

        const heroFile =
            req.files.find( // from multer uplaod
                file => file.fieldname === 'hero_image'
            );

        const hero_image = heroFile
            ? `/uploads/news/${heroFile.filename}`
            : null;

        const slug = await generateUniqueSlug(title);

        const articleId =
            await newsModel.createArticle({
                slug,
                title,
                summary,
                hero_image,
                featured: featured === 'on',
                status
            });

        if (categories) {

            const categoryArray = // depending on number selected, may be an array
                Array.isArray(categories)
                    ? categories
                    : [categories];

            await newsModel.attachCategoriesToArticle(
                articleId,
                categoryArray
            );
        }

        let order = 1;

        for (let i = 0; i < blocks.length; i++) {

            const block = blocks[i];

            if (block.type === 'image') {
                const imageFile =
                    req.files.find(
                        file =>
                            file.fieldname === `block_image_${i}`
                    );

                await newsModel.createImageBlock({
                    articleId,
                    order,
                    image_path:
                        `/uploads/news/${imageFile.filename}`,
                    caption:
                        block.caption || ''
                });
            } else {
                await newsModel.createBlock({
                    articleId,
                    order,
                    type: block.type,
                    content: block.content
                });
            }
            order++;
        }

        if (status === 'published') {
            res.redirect(`/news/${slug}`);
        } else {
            res.redirect('/admin/news');
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to create article');
    }
};

exports.renderAdminNewsPage = async (req, res) => {

    try {

        const db = require('../db/db');

        const [articles] = await db.query(`
            SELECT *
            FROM news_articles
            ORDER BY created_at DESC
        `);

        res.render('adminNewsDashboard', {
            title: 'Manage News',
            articles
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.deleteArticle = async (req, res) => {
    try {
        const articleId = req.params.id;
        await newsModel.deleteArticle(articleId);

        res.redirect('/admin/news');

    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to delete article');
    }
};

exports.renderEditPage = async (req, res) => { // for an exusting article
    try {
        const articleId = req.params.id;

        const article =
            await newsModel.getArticleById(
                articleId
            );
        const blocks =
            await newsModel.getArticleBlocks(
                articleId
            );
        const categories =
            await newsModel.getArticleCategories(
                articleId
            );

        const [allCategories] = await db.query(`
            SELECT *
            FROM news_categories
            ORDER BY name ASC
        `);

        res.render('adminEditNews', {
            title: 'Edit Article',
            article,
            blocks,
            categories,
            allCategories
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.updateArticle = async (req, res) => { // delete and resubmit whole article
    try {
        const articleId = req.params.id;

        const {
            title,
            summary,
            featured,
            categories,
            blocks,
            status
        } = req.body;

        const heroFile =
            req.files.find(
                file =>
                    file.fieldname === 'hero_image'
            );

        const existingArticle =
            await newsModel.getArticleById(
                articleId
            );

        const hero_image = heroFile
            ? `/uploads/news/${heroFile.filename}`
            : existingArticle.hero_image;

        await newsModel.updateArticle({
            articleId,
            title,
            summary,
            hero_image,
            featured: featured === 'on',
            status
        });

        await newsModel.deleteBlocksForArticle(
            articleId
        );

        await newsModel.deleteCategoryJoins(
            articleId
        );

        if (categories) {

            const categoryArray =
                Array.isArray(categories)
                    ? categories
                    : [categories];

            await newsModel.attachCategoriesToArticle(
                articleId,
                categoryArray
            );
        }

        let order = 1;

        for (let i = 0; i < blocks.length; i++) {

            const block = blocks[i];

            if (block.type === 'image') {

                const imageFile =
                    req.files.find(
                        file =>
                            file.fieldname ===
                            `block_image_${i}`
                    );

                await newsModel.createImageBlock({
                    articleId,
                    order,
                    image_path: imageFile
                        ? `/uploads/news/${imageFile.filename}`
                        : block.existing_image,
                    caption: block.caption || ''
                });

            } else {

                await newsModel.createBlock({
                    articleId,
                    order,
                    type: block.type,
                    content: block.content
                });
            }
            order++;
        }

        if (status === 'published') {
            res.redirect(
                `/news/${existingArticle.slug}`
            );
        } else {
            res.redirect('/admin/news');
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to update article');
    }
};

exports.renderPreviewPage = async (
    req,
    res
) => {

    try {
        const slug = req.params.slug;

        const article = await newsModel.getArticlePreviewBySlug(slug);

        if (!article) {
            return res
                .status(404)
                .send('Article not found');
        }

        const blocks = await newsModel.getArticleBlocks(
            article.article_id
        );

        const categories = await newsModel.getArticleCategories(
            article.article_id
        );

        res.render('newsArticle', {
            title: article.title,
            article,
            blocks,
            categories,
            isPreview: true
        });

    } catch (err) {

        console.error(err);

        res.status(500).send('Server Error');
    }
};

