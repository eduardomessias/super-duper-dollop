module.exports = {
  GET: async (req, res, next) => {
    res.locals.theme = 'sketchy';
    res.render('home');
  }
}