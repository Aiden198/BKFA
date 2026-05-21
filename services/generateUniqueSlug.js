const slugify = require('./slugify');

const newsModel = require('../models/newsModel');

module.exports = async function generateUniqueSlug(title) {

    const baseSlug = slugify(title);

    let slug = baseSlug;

    let counter = 1;

    while (await newsModel.slugExists(slug)) {

        slug = `${baseSlug}-${counter}`;

        counter++;
    }

    return slug;
};