'use strict';
module.exports = wob

var http = require('http')
  , Stream = require('stream')
  , Promise = require('promise')

wob.createServer = function(fn) {
  return http.createServer(wob(fn))
}

function wob(handler) {
  return function(req, res) {
    Promise
      .from(handler(req))
      .then(null, outputError)
      .then(output)

    function output(ret) {
      if (ret instanceof Stream) {
        ret.pipe(res)
        return
      }
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(ret))
    }

    function outputError(err) {
      res.statusCode = (err.statusCode | 0) || 500
      return (
        { name: err.name
        , message: err.message
        , stack: err.stack
          .split('\n')
          .slice(1)
          .map(function(entry) {
            return entry.replace(/^\s*at /, '')
          })
        })
    }
  }
}

wob.status = (function() {
  var statusError = {}
  for (var statusCode in http.STATUS_CODES) {
    statusError[statusCode] = new Error(http.STATUS_CODES[statusCode])
    statusError[statusCode].statusCode = statusCode
  }
  return statusError
})()
