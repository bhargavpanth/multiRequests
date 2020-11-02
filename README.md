## requestMultipleUrls

[![NPM Status](https://img.shields.io/npm/dm/multi_url.svg?style=flat-square)](https://www.npmjs.com/package/multi_url)

### Usage
```
import { requestMultipleUrls } from 'requestMultipleUrls'

const urls = [ 'https://example.com/test', 'https://example.com/random' ]

const results = requestMultipleUrls(urls)

Promise.all(results).then(data => {
	// handle the results
}).catch(err => {
	// handle error
})

```
