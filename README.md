# wob

 minimalist http server wrapper 

## Installation

    npm install wob

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

