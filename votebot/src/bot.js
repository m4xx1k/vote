require('dotenv').config()
const {Telegraf, Scenes, session} = require('telegraf')
const {I18n} = require("@grammyjs/i18n");
const startComposer = require('./composer/start.composer')//composers
const nominationsScene = require('./scenes/vote/nominations.scene')//scenes
const webScene = require('./scenes/web/web.scene')
const nominationScene = require('./scenes/vote/nomination.scene')
const candidateScene = require('./scenes/vote/candidate.scene')
const languageScene = require('./scenes/language/language.scene')
const ipScene = require('./scenes/registration/ip.scene')
const contactScene = require('./scenes/registration/contact.scene')
const {previousSceneMiddleware} = require("./middleware/scene.middleware");//middleware
const LocalSession = require('telegraf-session-local')


const {BOT_TOKEN} = process.env//const's

const bot = new Telegraf(BOT_TOKEN)
const sessions = new LocalSession({database: 'session.json'})
bot.use(sessions.middleware())

const i18n = new I18n({
    useSession: true,
    defaultLocale: "ru",
    directory: "src/locales",


});
bot.use(i18n);

const stage = new Scenes.Stage([languageScene, ipScene, contactScene, candidateScene, nominationScene, nominationsScene, webScene])

bot.use(stage.middleware())

bot.use(startComposer.middleware())

bot.use(previousSceneMiddleware)
bot.launch()
process.once('sigint', () => bot.stop('sigint'));
process.once('sigterm', () => bot.stop('sigterm'));
