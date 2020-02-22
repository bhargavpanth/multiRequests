import express from 'express'
import * as middleware from './middlewares'

const router = express.Router()

// checking header
router.get('/customer/:customerId/news/:newsId/fetchNewsContent',
	middleware.isValidCustomer,
	middleware.checkToken,
	middleware.fetchNewsContent
)

// route returns a json object
router.get('/customer/:customerId/fetchSubscriptions',
	middleware.isValidCustomer,
	middleware.fetchSubscriptionTopics
)

// route that times out / throws a server error
router.get('/customer/:customerId/timingOut',
	middleware.isValidCustomer,
	middleware.timeOut
)

// route that responds slowly
router.get('/customer/:customerId/slow',
	middleware.isValidCustomer,
	middleware.slowResponse
)

export default router
