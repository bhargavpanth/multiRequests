## requestMultipleUrls

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
