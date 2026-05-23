INSERT INTO news_categories (name, slug)
VALUES
('News', 'news'),
('Assembly Days', 'assembly-days'),
('Partners', 'partners'),
('Field Partners', 'field-partners'),
('Training Programs', 'training-programs'),
('Interviews', 'interviews'),
('Mothers Stories', 'mothers-stories');

INSERT INTO news_articles (
    slug,
    title,
    summary,
    hero_image,
    featured,
    status,
    published_at
)
VALUES (
    'volunteers-pack-kits-adelaide',
    'Volunteers Pack Thousands of Kits in Adelaide',
    'Community volunteers gathered in Adelaide to assemble birthing kits for women in need.',
    '/uploads/news/test-hero.jpg',
    true,
    'published',
    NOW()
);

INSERT INTO news_article_categories (
    article_id,
    category_id
)
VALUES
(1, 1),
(1, 2);

INSERT INTO news_blocks (
    article_id,
    block_order,
    block_type,
    content
)
VALUES
(
    1,
    1,
    'paragraph',
    'More than 200 volunteers gathered this weekend to assemble thousands of birthing kits for communities in need.'
);

INSERT INTO news_blocks (
    article_id,
    block_order,
    block_type,
    content
)
VALUES
(
    1,
    2,
    'paragraph',
    'The assembly day was organised by local supporters and community groups across Adelaide.'
);

INSERT INTO news_blocks (
    article_id,
    block_order,
    block_type,
    image_path,
    caption
)
VALUES
(
    1,
    3,
    'image',
    '/uploads/news/group-photo.jpg',
    'Volunteers assembling birthing kits during the Adelaide event.'
);