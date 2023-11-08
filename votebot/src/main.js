// const setupBot = require('./bot');
// const {MongoClient} = require('mongodb');
//
// (async () => {
//     try {
//         console.log('main start')
//         const {MONGO_URL} = process.env
//         const client = await MongoClient.connect(MONGO_URL)
//         console.log(`MONGO_URL = ${MONGO_URL.split('@')[0]}...`)
//         const bot = await setupBot(client.mongo());
//         await bot.launch()
//         console.log(`bot started on @${bot.options.username}`)
//
//
//     } catch (e) {
//         console.error(e)
//     }
// })()
