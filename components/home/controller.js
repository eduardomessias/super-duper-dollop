module.exports = {
  GET: async (req, res, next) => {
    res.locals.theme = req.params.theme;
    res.render('home');
  }
}