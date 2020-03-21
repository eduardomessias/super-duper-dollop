module.exports = {
  GET: async (req, res, next) => {
    res.locals.theme = 'darkly';
    res.render('components/home');
  }
}