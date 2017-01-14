import config from 'config';

function getPageView(FB, offsetDay) {
  const endtime = parseInt(new Date().getTime() / 1000);
  const starttime = parseInt(new Date(new Date().getTime() - (parseInt(offsetDay) * 24 * 60 * 60 * 1000)).getTime() / 1000);

  const url = '/' + config('facebook').pageId + '/insights/page_views_total/day?since=' + starttime + '&until=' + endtime;

  return FB.napiAsync(url);
}

export default function getAnalytics(req, res, next) {
  getPageView(req.FB, 5)
    .then(data => res.json(data))
    .catch(next);
}
