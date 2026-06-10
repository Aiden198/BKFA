const slugify = require('./slugify');
const newsModel = require('../models/newsModel');

module.exports = async function generateUniqueSlug(title) {

    const baseSlug = slugify(title);

    let slug = baseSlug;

    let counter = 1;

    while (await newsModel.slugExists(slug)) { //loops until slug is unique from news models
        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    return slug;
};