module.exports = function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()

        .replace(/\s+/g, '-')  // \s is whitespace, /g is global

        .replace(/[^\w\-]+/g, '') // anything not a word character or hyphen

        .replace(/\-\-+/g, '-'); // multiple hyphens to single
};