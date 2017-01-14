export function getLoginCallback(req, res, next) {
  const { code, error, error_description } = req.query;
  const FB = req.FB;

  if (error) {
    return next(new Error(error_description));
  } else if (!code) {
    return res.redirect('/');
  }

  const param = {
    client_id: FB.options('appId'),
    client_secret: FB.options('appSecret')
  };

  // exchangeCodeForAccessToken
  return FB
    .napiAsync('oauth/access_token', {
      ...param,
      redirect_uri: FB.options('redirectUri'),
      code
    })
    .then(resp =>
      FB.napiAsync('oauth/access_token', {
        ...param,
        grant_type: 'fb_exchange_token',
        fb_exchange_token: resp.access_token
      })
    )
    .then((resp) => {
      req.session.access_token = resp.access_token; // eslint-disable-line
      req.session.expires = resp.expires || 0; // eslint-disable-line

      return res.redirect('/');
    }).catch(next);
}

export function getLogout(req, res) {
  req.session = null; // eslint-disable-line
  res.redirect('/');
}
