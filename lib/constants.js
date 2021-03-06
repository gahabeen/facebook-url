const categories = require('./data/categories.json');

const FB_CATEGORIES = categories;

const HTTPS_PROTOCOL = 'https';
const HTTP_PROTOCOL = 'http';

const FB_ROOT = `www.facebook.com`;
const FB_MOBILE_ROOT = `m.facebook.com`;
const FB_BASIC_ROOT = `mbasic.facebook.com`;

const HOSTNAMES = {
    default: FB_ROOT,
    mobile: FB_MOBILE_ROOT,
    basic: FB_BASIC_ROOT,
};

const PROTOCOLS = {
    secured: HTTPS_PROTOCOL,
    unsecured: HTTP_PROTOCOL,
};

const FB_EXPR = {
    DOT_PHP_START: /^.+\.php/,
    DOT_PHP_END: /.+\.php$/,
};

const FB_PATH = {
    PERMALINK_PHP: `/permalink.php`,
    STORY_PHP: `/story.php`,
    PROFILE_PHP: `/profile.php`,
    DIRECTORY: '/directory',
    DIRECTORY_PAGES: '/directory/pages',
    SEARCH: '/search',
    SEARCH_PAGES: '/search/pages',
    META: '/meta',
    HELP: '/help',
    BUSINESS: '/business',
    SUPPORT: '/support',
    CREATORS: '/creators',
    AR_STUDIO: '/ar-studio',
    FB_GAMING_HOME: '/fbgaminghome',
    PRODUCTS: '/products',
    DOCS: '/docs',
    BLOG: '/blog',
    DEVELOPER_CIRCLES: '/developercircles',
    TECHNOLOGIES: '/technologies',
    ACTIONS: '/action',
    GPA: '/gpa',
    MEDIA: '/media',
    MEDIA___SET: '/media/set',
    ADS: '/ads',
    ADS__LIBRARY: '/ads/library',
    FACEBOOK_MEDIA: '/facebookmedia',
    JOURNALISM_PROJECT: '/journalismproject',
    AUDIENCE_NETWORK: '/audiencenetwork',
    SAFETY: '/safety',
    SUPPORT_SMALL_BUSINESS: '/supportsmallbusiness',
    SOCIAL_IMPACT: '/social-impact',
    COMMUNITY_STANDARS: '/communitystandards',
    AD_PREFERENCES: '/adpreferences',
    AD_CENTER: '/ad_center',
    AD_CAMPAIGN: '/ad_campaign',
    CLIMATE_SCIENCE_INFO: '/climatescienceinfo',
    CORONAVIRUS_INFO: '/coronavirusinfo',
    CRISIS_RESPONSE: '/crisisresponse',
    EMOTHIONAL_HEALTH: '/emotionalhealth',
    FACEBOOK_PAY: '/facebook_pay',
    PEOPLE: '/people',
    COOKIE: '/cookie',
    COOKIE__CONSENT_PAGE: '/cookie/consent-page',
    POLICY: '/policy',
    POLICIES: '/policies',
    POLICIES_COOKIES: '/policies/cookies',
    PRIVACY: '/privacy',
    TERMS: '/terms',
    JOBS: '/jobs',
    JOBS_JOB_OPENING: '/jobs/job-opening',
    FRIENDS: '/friends',
    SERVICES: '/services',
    PAGES: '/pages',
    PG: '/pg',
    BIZ: '/biz',
    EVENTS: '/events',
    WATCH: '/watch',
    BOOKMARKS: '/bookmarks',
    BOOKMARKS__GROUPS: '/bookmarks/groups',
    GROUPS: '/groups',
    GROUPS__FEED: '/groups/feed',
    POSTS: '/posts',
    STORIES: '/stories',
    PLACES: '/places',
    PUBLIC: '/public',
    MAP: '/map',
    COMMUNITY: '/community',
    MARKETPLACE: '/marketplace',
    VIDEOS: '/videos',
    PHOTO: '/photo',
    NOTES: '/notes',
    PHOTOS: '/photos',
    MOVIES: '/movies',
    HASHTAG: '/hashtag',
    OFFER_DETAILS: '/offer_details',
    TRACKING: '/tr',
    PAGES_CATEGORY: '/pages/category',
    PAGE__POSTS: '/posts',
    PAGE__GROUPS: '/groups',
    PAGE__JOBS: '/jobs',
    PAGE__EVENTS: '/events',
    PAGE__REVIEWS: '/reviews',
    PAGE__PHOTOS: '/photos',
    PAGE__PHOTOSET: '/photoset',
    PAGE__ABOUT: '/about',
    PAGE__ABOUT_CONTACT_AND_BASIC_INFO: '/about_contact_and_basic_info',
    PAGE__COMMUNITY: '/community',
    PAGE__GUIDES: '/guides',
    PAGE__OFFERS: '/offers',
    PAGE__FUNDRAISER: '/fundraisers',
    PAGE__SERVICES: '/services',
    PAGE__SHOP: '/shop',
    PAGE__LIVE: '/live',
    PAGE__SETTINGS: '/settings',
    PAGE__PODCASTS: '/podcasts',
    PAGE__INSIGHTS: '/insights',
    USER__POSTS: '/posts',
    USER__ABOUT: '/about',
    USER__ABOUT_CONTACT_AND_BASIC_INFO: '/about_contact_and_basic_info',
    USER__FRIENDS: '/friends',
    USER__PHOTOS: '/photos',
    USER__VIDEOS: '/videos',
    USER__SPORTS: '/sports',
    USER__MUSIC: '/music',
    USER__TVSHOWS: '/tv',
    USER__BOOKS: '/books',
    USER__PODCATS: '/podcasts',
    USER__QUESTIONS: '/did_you_know',
    USER__REVIEWS_GIVEN: '/reviews_written',
    USER__PLACE_REVIEWS_WRITTEN: '/place_reviews_written',
};

module.exports = {
    FB_CATEGORIES,
    HOSTNAMES,
    PROTOCOLS,
    HTTPS_PROTOCOL,
    HTTP_PROTOCOL,
    FB_BASIC_ROOT,
    FB_ROOT,
    FB_MOBILE_ROOT,
    FB_EXPR,
    FB_PATH,
};
