# wob

 minimalist http server wrapper 

## Installation

    npm install wob

## API

### wob(function(req, res) -> Response)

  Wrap a wob request handler so you can feed it to `http.createServer`

  A promise will be resolved.
  A Stream will be piped to the response stream (`return stream` is pretty much equivalent to doing `stream.pipe(res)` in core-http)
  Any other value will be serialised as JSON and sent as response.

### wob.createServer(function(req, res) -> Response)

  Shorthand for `http.createServer(wob(fn))`

### Response

  `Stream | Value | Promise<Response>`

## License

  MIT

