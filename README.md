# Middleware to turn off caching

[![Build Status](https://travis-ci.org/helmetjs/nocache.svg?branch=master)](https://travis-ci.org/helmetjs/nocache)

It's possible that you've got bugs in an old HTML or JavaScript file, and with a cache, some users will be stuck with those old versions. This will (try to) abolish all client-side caching.

```javascript
var nocache = require('nocache');
app.use(nocache());
```

This will set `Cache-Control` and `Pragma` headers to stop caching. It will also set an `Expires` header of 0, effectively saying "this has already expired."

If you want to crush the `ETag` header as well, you can:

```javascript
app.use(nocache({ noEtag: true }));
```

Caching has some real benefits, and you lose them here. Browsers won't cache resources with this enabled, although *some* performance is retained if you keep ETag support. It's also possible that you'll introduce *new* bugs and you'll wish people had old resources cached, but that's less likely.
