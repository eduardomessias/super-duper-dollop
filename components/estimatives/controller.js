module.exports = {
  GET: async (req, res, next) => {
    console.log(req.locals)
    
    res.locals.theme = req.locals.theme;
    
    res.render('estimatives');
  }
}