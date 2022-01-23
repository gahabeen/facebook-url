const notMatched = require('./notMatched.json');
const aBiz = require('./aBiz.json');
const aBusiness = require('./aBusiness.json');
const aFacebookDomain = require('./aFacebookDomain.json');
const aGroup = require('./aGroup.json');
const aHashtag = require('./aHashtag.json');
const aJob = require('./aJob.json');
const aKnownUrl = require('./aKnownUrl.json');
const anEvent = require('./anEvent.json');
const anOffer = require('./anOffer.json');
const aNote = require('./aNote.json');
const aPage = require('./aPage.json');
const aPageAbout = require('./aPageAbout.json');
const aPageAsPg = require('./aPageAsPg.json');
const aPageByCategory = require('./aPageByCategory.json');
const aPageCommunity = require('./aPageCommunity.json');
const aPageEvents = require('./aPageEvents.json');
const aPageFundraisers = require('./aPageFundraisers.json');
const aPageGroups = require('./aPageGroups.json');
const aPageJobs = require('./aPageJobs.json');
const aPageLive = require('./aPageLive.json');
const aPageOffers = require('./aPageOffers.json');
const aPagePhotos = require('./aPagePhotos.json');
const aPagePosts = require('./aPagePosts.json');
const aPageReviews = require('./aPageReviews.json');
const aPageServices = require('./aPageServices.json');
const aPageShop = require('./aPageShop.json');
const aPhoto = require('./aPhoto.json');
const aPixel = require('./aPixel.json');
const aPlace = require('./aPlace.json');
const aPost = require('./aPost.json');
const aPublic = require('./aPublic.json');
const aService = require('./aService.json');
const aStory = require('./aStory.json');
const aUser = require('./aUser.json');
const aUserAbout = require('./aUserAbout.json');
const aUserFriends = require('./aUserFriends.json');
const aUserPhotos = require('./aUserPhotos.json');
const aUserPosts = require('./aUserPosts.json');
const aUserSports = require('./aUserSports.json');
const aUserVideos = require('./aUserVideos.json');
const aVideo = require('./aVideo.json');

const data = {
    notMatched,
    aBiz,
    aBusiness,
    aFacebookDomain,
    aGroup,
    aHashtag,
    aJob,
    aKnownUrl,
    anEvent,
    anOffer,
    aNote,
    aPage,
    aPageAbout,
    aPageAsPg,
    aPageByCategory,
    aPageCommunity,
    aPageEvents,
    aPageFundraisers,
    aPageGroups,
    aPageJobs,
    aPageLive,
    aPageOffers,
    aPagePhotos,
    aPagePosts,
    aPageReviews,
    aPageServices,
    aPageShop,
    aPixel,
    aPlace,
    aPost,
    aPublic,
    aService,
    aStory,
    aPhoto,
    aUser,
    aUserAbout,
    aUserFriends,
    aUserPhotos,
    aUserPosts,
    aUserSports,
    aUserVideos,
    aVideo,
};

const getSamples = (...lists) => {
    const maxByList = process.env.SAMPLES_MAX_NB || 300;
    const samples = [];
    for (const list of lists) {
        samples.push(
            ...list.slice(0, list.length > maxByList ? maxByList : list.length),
        );
    }
    return samples;
};

module.exports = {
    data,
    getSamples,
};
