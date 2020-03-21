module.exports = {
  GET: async (req, res, next) => {
    res.local.theme = req.params.t
    
    res.render('home');
  }
}