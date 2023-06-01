module.exports = function nocache() {
  return function nocache(_, res, next) {
    res.setHeader("Surrogate-Control", "no-store");
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Expires", "0");

    next();
  };
};
