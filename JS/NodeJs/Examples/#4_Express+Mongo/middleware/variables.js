module.exports = function(req, res, next) {
  res.locals.isAuth = req.session.isAuthenticated // берем из сессии для использования в шаблонах
  res.locals.csrf = req.csrfToken()
  next()
}
