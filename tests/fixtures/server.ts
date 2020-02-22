// Mock server to run tests
import express from 'express'
import bodyParser from 'body-parser'
import api from './routes'

const port = parseInt(process.env.PORT) || 4000

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/api', api)

app.listen(port, () => {
	// @ts-ignore
	console.log(`App listening to port: ${port}`)
})

export default app
