var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

const searchPages = [
  {
    title: 'Home',
    url: '/',
    view: 'home.ejs',
    description: 'Birthing Kit Foundation Australia homepage, vision, mission, impact and birthing kit information.',
    keywords: 'home vision mission impact birthing kit foundation'
  },
  {
    title: 'Donate',
    url: '/donate',
    view: 'Donate.ejs',
    description: 'Support clean births by donating to the Birthing Kit Foundation.',
    keywords: 'donate giving support fundraising'
  },
  {
    title: 'Volunteer',
    url: '/volunteer',
    view: 'Volunteer.ejs',
    description: 'Volunteer, pack kits and get involved with birthing kit assembly.',
    keywords: 'volunteer pack kits assembly day get involved'
  },
  {
    title: 'Become a Member',
    url: '/becomeamember',
    view: 'BecomeAMember.ejs',
    description: 'Become a member and support safer births for women and girls.',
    keywords: 'member membership join get involved'
  },
  {
    title: 'Corporate Support',
    url: '/corporate-support',
    view: 'CorporateSupport.ejs',
    description: 'Explore corporate support, employee engagement, ESG, CSR and workplace giving opportunities with BKFA.',
    keywords: 'corporate support csr esg employee engagement workplace giving corporate volunteering'
  },
  {
    title: 'Clean Birth Kits',
    url: '/cleanbirthkits',
    view: 'CleanBirthKits.ejs',
    description: 'Learn what is inside a clean birth kit and how each item supports safer childbirth.',
    keywords: 'clean birth kits plastic sheet soap gloves gauze cord sterile blade'
  },
  {
    title: 'Our Projects',
    url: '/ourprojects',
    view: 'OurProjects.ejs',
    description: 'Explore BKFA projects and global partnerships.',
    keywords: 'projects field partners global initiatives'
  },
  {
    title: 'Annual Reports',
    url: '/reports',
    view: 'Reports.ejs',
    description: 'View annual reports and financial reporting information.',
    keywords: 'annual reports financial report'
  },
  {
    title: 'Resources',
    url: '/resources',
    view: 'Resources.ejs',
    description: 'Find resources, manuals and documents for assembly days.',
    keywords: 'resources assembly day manual documents'
  },
  {
    title: 'FAQ',
    url: '/faq',
    view: 'FAQ.ejs',
    description: 'Frequently asked questions about BKFA and clean birth kits.',
    keywords: 'faq questions help'
  },
  {
    title: 'News',
    url: '/news',
    view: 'News.ejs',
    description: 'Read news and updates from the Birthing Kit Foundation.',
    keywords: 'news updates stories'
  },
  {
    title: 'Contact',
    url: '/contact',
    view: 'Contact.ejs',
    description: 'Contact the Birthing Kit Foundation.',
    keywords: 'contact email message'
  },
  {
    title: 'Our Team',
    url: '/ourteam',
    view: 'OurTeam.ejs',
    description: 'Meet the BKFA team.',
    keywords: 'team people staff board'
  },
  {
    title: 'Our History',
    url: '/ourhistory',
    view: 'OurHistory.ejs',
    description: 'Learn about the history of the Birthing Kit Foundation.',
    keywords: 'history milestones about'
  },
  {
    title: 'Our Supporters',
    url: '/oursupporters',
    view: 'OurSupporters.ejs',
    description: 'Learn about BKFA supporters and community partners.',
    keywords: 'supporters partners sponsors'
  },
  {
    title: 'Our Approach',
    url: '/ourapproach',
    view: 'OurApproach.ejs',
    description: 'Learn about BKFA approach and clean birth practices.',
    keywords: 'approach clean birth practices'
  },
  {
    title: '20 Years of BKFA',
    url: '/twenty-years',
    view: 'TwentyYears.ejs',
    description: 'Celebrate 20 years of the Birthing Kit Foundation.',
    keywords: 'twenty years celebrate anniversary kits'
  }
].map(function(page) {
  return Object.assign({}, page, {
    searchText: buildSearchText(page)
  });
});

function readViewText(viewName) {
  try {
    return fs.readFileSync(path.join(__dirname, '..', 'views', viewName), 'utf8')
      .replace(/<%[\s\S]*?%>/g, ' ')
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&[a-zA-Z0-9#]+;/g, ' ');
  } catch (error) {
    return '';
  }
}

function normaliseText(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function searchVariants(term) {
  if (term.endsWith('s') && term.length > 3) {
    return [term, term.slice(0, -1)];
  }

  if (term.length > 2) {
    return [term, term + 's'];
  }

  return [term];
}

function buildSearchText(page) {
  return normaliseText([
    page.title,
    page.url,
    page.description,
    page.keywords,
    readViewText(page.view)
  ].join(' '));
}

function scorePage(page, terms) {
  return terms.reduce(function(score, term) {
    const variants = searchVariants(term);
    const matches = variants.filter(function(variant) {
      return page.searchText.includes(variant);
    });

    if (matches.length === 0) {
      return score;
    }

    const titleBoost = variants.some(function(variant) {
      return normaliseText(page.title).includes(variant);
    }) ? 5 : 0;

    const keywordBoost = variants.some(function(variant) {
      return normaliseText(page.keywords).includes(variant);
    }) ? 3 : 0;

    return score + 1 + titleBoost + keywordBoost;
  }, 0);
}

router.get('/', function(req, res) {
  const query = (req.query.q || '').trim();
  const terms = normaliseText(query).split(/\s+/).filter(Boolean);

  const results = terms.length
    ? searchPages
        .map(function(page) {
          return Object.assign({}, page, {
            score: scorePage(page, terms)
          });
        })
        .filter(function(page) {
          return page.score > 0;
        })
        .sort(function(a, b) {
          return b.score - a.score || a.title.localeCompare(b.title);
        })
        .slice(0, 10)
    : [];

  res.render('Search', {
    query: query,
    results: results
  });
});

module.exports = router;
