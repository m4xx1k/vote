const Router = require('express')
const router = new Router()
const candidateRouter = require('./candidate.router')
const nominationRouter = require('./nomination.router')
const voteRouter = require('./vote.router')
const userRouter = require('./user.router')

router.use('/candidate', candidateRouter)
router.use('/nomination', nominationRouter)
router.use('/vote', voteRouter)
router.use('/user', userRouter)

module.exports = router
