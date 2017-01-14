export default function getHome(req, res) {
  const { access_token: accessToken } = req.session;

  if (!accessToken) {
    return res.render('home', {
      loginUrl: req.FB.getLoginUrl({ scope: 'user_about_me' })
    });
  }

  return res.redirect('/analytics');
}
