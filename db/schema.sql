CREATE TABLE news_articles (
    article_id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    hero_image VARCHAR(500),
    featured BOOLEAN DEFAULT FALSE,
    status ENUM('draft', 'published') DEFAULT 'draft',
    published_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE news_categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE news_article_categories (
    article_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (article_id, category_id),
    FOREIGN KEY (article_id)
        REFERENCES news_articles(article_id)
        ON DELETE CASCADE,
    FOREIGN KEY (category_id)
        REFERENCES news_categories(category_id)
        ON DELETE CASCADE
);

CREATE TABLE news_blocks (
    block_id INT AUTO_INCREMENT PRIMARY KEY,
    article_id INT NOT NULL,
    block_order INT NOT NULL,
    block_type ENUM(
        'paragraph',
        'heading',
        'image',
        'quote'
    ) NOT NULL,
    content TEXT,
    image_path VARCHAR(500),
    caption TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id)
        REFERENCES news_articles(article_id)
        ON DELETE CASCADE
);