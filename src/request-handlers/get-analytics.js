import config from 'config';
import Promise from 'bluebird';

const pageId = config.get('facebook').pageId;

const getPeriod = offsetDay => ({
  start: parseInt(new Date(new Date().getTime()
         - (parseInt(offsetDay) * 24 * 60 * 60 * 1000)).getTime() / 1000),
  end: parseInt(new Date().getTime() / 1000)
});

function getPageView(FB, offsetDay) {
  const { start, end } = getPeriod(offsetDay);
  const url = `/${pageId}/insights/page_views_total/day?since=${start}&until=${end}`;

  return FB.napiAsync(url);
}

function getPageLikes(FB, offsetDay) {
  const { start, end } = getPeriod(offsetDay);
  const url = `/${pageId}/insights/page_fans?since=${start}&until=${end}`;

  return FB.napiAsync(url);
}

function getPageReach(FB, offsetDay) {
  const { start, end } = getPeriod(offsetDay);
  const url = `/${pageId}/insights/page_impressions_unique/day?since=${start}&until=${end}`;

  return FB.napiAsync(url);
}

function getPostEngagements(FB, offsetDay) {
  const { start, end } = getPeriod(offsetDay);
  const url = `/${pageId}/insights/post_consumptions/lifetime?since=${start}&until=${end}`;

  return FB.napiAsync(url);
}

function getVideoViews(FB, offsetDay) {
  const { start, end } = getPeriod(offsetDay);
  const url = `/${pageId}/insights/total_video_views/lifetime?since=${start}&until=${end}`;

  return FB.napiAsync(url);
}

export function getInsightData(req, res, next) {
  const offset = req.query.offset || 5;
  Promise.all([
    getPageView(req.FB, offset),
    getVideoViews(req.FB, offset),
    getPostEngagements(req.FB, offset),
    getPageLikes(req.FB, offset),
    getPageReach(req.FB, offset)
  ]).spread((pageView, videoViews, postEnagements, pageLikes, pageReach) => {
    res.json({
      offset,
      insight: {
        view: pageView.data,
        video: videoViews.data,
        engagements: postEnagements.data,
        likes: pageLikes.data,
        reach: pageReach.data
      }
    });
  }).catch(next);
}

export function getAnalyticsView(req, res) {
  res.render('analytics');
}
