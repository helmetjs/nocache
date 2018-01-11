var nocache = require('..')

var assert = require('assert')
var connect = require('connect')
var request = require('supertest')

describe('nocache', function () {
  it('sets headers properly', function () {
    var app = connect()
    app.use(function (req, res, next) {
      res.setHeader('ETag', 'abc123')
      next()
    })
    app.use(nocache())
    app.use(function (req, res) {
      res.end('Hello world!')
    })

    return request(app).get('/')
      .expect('Surrogate-Control', 'no-store')
      .expect('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('Pragma', 'no-cache')
      .expect('Expires', '0')
      .expect('ETag', 'abc123')
      .expect('Hello world!')
  })

  it('names its function and middleware', function () {
    assert.equal(nocache.name, 'nocache')
    assert.equal(nocache().name, 'nocache')
  })
})
