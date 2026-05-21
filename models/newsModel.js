const db = require('../db/db');

const fs = require('fs');
const path = require('path');

exports.getAllPublishedArticles = async () => {
    const [rows] = await db.query(`
        SELECT
            na.*,

            GROUP_CONCAT(nc.name SEPARATOR '|')
            AS category_names

        FROM news_articles na

        LEFT JOIN news_article_categories nac
        ON na.article_id = nac.article_id

        LEFT JOIN news_categories nc
        ON nac.category_id = nc.category_id

        WHERE na.status = 'published'

        GROUP BY na.article_id

        ORDER BY na.published_at DESC
    `);

    return rows.map(article => ({
        ...article,

        categories: article.category_names
            ? article.category_names.split('|')
            : []
    }));
};

exports.getArticleBySlug = async (slug) => {
    const [articles] = await db.query(`
        SELECT *
        FROM news_articles
        WHERE slug = ?
        AND status = 'published'
        LIMIT 1
    `, [slug]);

    return articles[0];
};

exports.getArticleBlocks = async (articleId) => {
    const [blocks] = await db.query(`
        SELECT *
        FROM news_blocks
        WHERE article_id = ?
        ORDER BY block_order ASC
    `, [articleId]);

    return blocks;
};

exports.getArticleCategories = async (articleId) => {
    const [categories] = await db.query(`
        SELECT nc.*
        FROM news_categories nc

        JOIN news_article_categories nac
        ON nc.category_id = nac.category_id

        WHERE nac.article_id = ?
    `, [articleId]);

    return categories;
};

exports.getFeaturedArticle = async () => {
    const [rows] = await db.query(`
        SELECT *
        FROM news_articles
        WHERE featured = true
        AND status = 'published'
        ORDER BY published_at DESC
        LIMIT 1
    `);

    return rows[0];
};

exports.createArticle = async (articleData) => {
    const {
        slug,
        title,
        summary,
        hero_image,
        featured,
        status
    } = articleData;

    const [result] = await db.query(`
        INSERT INTO news_articles (
            slug,
            title,
            summary,
            hero_image,
            featured,
            status,
            published_at
        )
        VALUES (?, ?, ?, ?, ?, ?, NOW())
    `, [
        slug,
        title,
        summary,
        hero_image,
        featured,
        status
    ]);

    return result.insertId;
};

exports.attachCategoriesToArticle = async (
    articleId,
    categoryIds
) => {

    for (const categoryId of categoryIds) {

        await db.query(`
            INSERT INTO news_article_categories (
                article_id,
                category_id
            )
            VALUES (?, ?)
        `, [
            articleId,
            categoryId
        ]);
    }
};

exports.createParagraphBlock = async (
    articleId,
    order,
    content
) => {

    await db.query(`
        INSERT INTO news_blocks (
            article_id,
            block_order,
            block_type,
            content
        )
        VALUES (?, ?, 'paragraph', ?)
    `, [
        articleId,
        order,
        content
    ]);
};

exports.createBlock = async ({
    articleId,
    order,
    type,
    content
}) => {

    await db.query(`
        INSERT INTO news_blocks (
            article_id,
            block_order,
            block_type,
            content
        )
        VALUES (?, ?, ?, ?)
    `, [
        articleId,
        order,
        type,
        content
    ]);
};

exports.slugExists = async (slug) => {

    const [rows] = await db.query(`
        SELECT article_id
        FROM news_articles
        WHERE slug = ?
        LIMIT 1
    `, [slug]);

    return rows.length > 0;
};

exports.createImageBlock = async ({
    articleId,
    order,
    image_path,
    caption
}) => {

    await db.query(`
        INSERT INTO news_blocks (
            article_id,
            block_order,
            block_type,
            image_path,
            caption
        )
        VALUES (?, ?, 'image', ?, ?)
    `, [
        articleId,
        order,
        image_path,
        caption
    ]);
};

exports.deleteArticle = async (articleId) => {

    const [articleRows] = await db.query(`
        SELECT hero_image
        FROM news_articles
        WHERE article_id = ?
    `, [articleId]);

    const [blockRows] = await db.query(`
        SELECT image_path
        FROM news_blocks
        WHERE article_id = ?
        AND image_path IS NOT NULL
    `, [articleId]);

    await db.query(`
        DELETE FROM news_articles
        WHERE article_id = ?
    `, [articleId]);

    if (articleRows.length > 0) {

        await deleteImageIfUnused(
            articleRows[0].hero_image
        );
    }

    for (const block of blockRows) {

        await deleteImageIfUnused(
            block.image_path
        );
    }
};

exports.getArticleById = async (articleId) => {

    const [rows] = await db.query(`
        SELECT *
        FROM news_articles
        WHERE article_id = ?
        LIMIT 1
    `, [articleId]);

    return rows[0];
};

exports.deleteBlocksForArticle = async (
    articleId
) => {

    await db.query(`
        DELETE FROM news_blocks
        WHERE article_id = ?
    `, [articleId]);
};

exports.updateArticle = async ({
    articleId,
    title,
    summary,
    hero_image,
    featured,
    status
}) => {

    await db.query(`
        UPDATE news_articles

        SET
            title = ?,
            summary = ?,
            hero_image = ?,
            featured = ?,
            status = ?

        WHERE article_id = ?
    `, [
        title,
        summary,
        hero_image,
        featured,
        status,
        articleId
    ]);
};

exports.deleteCategoryJoins = async (
    articleId
) => {

    await db.query(`
        DELETE FROM news_article_categories
        WHERE article_id = ?
    `, [articleId]);
};

exports.getArticlePreviewBySlug = async (
    slug
) => {

    const [rows] = await db.query(`
        SELECT *
        FROM news_articles
        WHERE slug = ?
        LIMIT 1
    `, [slug]);

    return rows[0];
};

async function deleteImageIfUnused(imagePath) {

    if (!imagePath) return;

    const [heroRows] = await db.query(`
        SELECT COUNT(*) AS count
        FROM news_articles
        WHERE hero_image = ?
    `, [imagePath]);

    const [blockRows] = await db.query(`
        SELECT COUNT(*) AS count
        FROM news_blocks
        WHERE image_path = ?
    `, [imagePath]);

    const totalReferences =
        heroRows[0].count +
        blockRows[0].count;

    if (totalReferences <= 1) {

        const fullPath = path.join(
            __dirname,
            '..',
            'public',
            imagePath
        );

        fs.unlink(fullPath, (err) => {

            if (err) {

                console.error(
                    'Failed to delete image:',
                    fullPath,
                    err
                );
            }
        });
    }
}