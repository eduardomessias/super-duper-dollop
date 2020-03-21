module.exports = {
  GET: async (req, res, next) => {
    console.log(req.locals)
    
    
    
    res.render('estimatives');
  }
}