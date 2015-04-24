module.exports = function nocache(options) {

  var noEtag = (options || {}).noEtag;

  return function nocache(req, res, next) {
    res.setHeader('Cache-Control', 'private, no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    if (noEtag) {
      res.removeHeader('ETag');
    }
    next();
  };

};
