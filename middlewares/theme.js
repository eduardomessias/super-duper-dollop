module.exports = {
  resolve: async (req, res, next) => {
    res.locals.theme = req.params.theme;
    
    next();
  }
}