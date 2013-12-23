# wob

 minimalist http server wrapper 

## Installation

    npm install wob

## Examples

```js
var fs = require('fs')
  , Browserify = require('browserify')
  , Stylus = require('stylus-fs')

wob.createServer(function(req) {
  if (req.url === '/index.js')
    return Browserify(__dirname + req.url)
  if (req.url === '/index.css')
    return Stylus(__dirname + req.url.replace(/\.css$/, '.styl'))
  if (req.url === '/index.html')
    return fs.createReadStream(__dirname + req.url)
  throw wob.status[404]
})
```

### Passing headers

```js
wob.createServer(function(req) {
  return stream.on('piped', function(res) {
    res.setHeader('Content-Type', 'x-weird/weirdness')
  })
})
```

## API

### wob(function(req, res) -> Response)

  Wrap a wob request handler so you can feed it to `http.createServer`

  A promise will be resolved.
  A Stream will be piped to the response stream (`return stream` is pretty much equivalent to doing `stream.pipe(res)` in core-http)
  Any other value will be serialised to JSON and sent as response.

  Thrown errors are also serialised to JSON. If they have a `.statusCode` property, that'll be set as status code.

### wob.createServer(function(req, res) -> Response)

  Shorthand for `http.createServer(wob(fn))`

### Response

  `Stream | Value | Promise<Response>`

## License

  MIT

