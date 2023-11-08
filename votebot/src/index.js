const { Telegraf, Stage, session } = require('telegraf')
const WizardScene = require('telegraf/scenes/wizard')
require('dotenv').config()

const token = process.env.BOT_TOKEN
const bot = new Telegraf(token)
const users = []

const calcScene = new WizardScene(
	'calc',
	async (ctx) => {
		try {
			await ctx.replyWithHTML(`Введите первое число`)
			return ctx.wizard.next()
		} catch {}
	},
	async (ctx) => {
		try {
			const a = +ctx.message.text
			if (isNaN(a)) return
			ctx.session.a = a

			await ctx.replyWithHTML(`Введите второе число`)
			return ctx.wizard.next()
		} catch {}
	},
	async (ctx) => {
		try {
			const b = +ctx.message.text
			if (isNaN(b)) return

			const { a } = ctx.session
			const res = a + b

			await ctx.replyWithHTML(`Результат: ${a} + ${b} = ${res}`)
			return ctx.scene.leave()
		} catch {}
	}
)

const stage = new Stage([calcScene])
bot.use(session())
bot.use(stage.middleware())

bot.command('start', async (ctx) => {
	try {
		users.push(ctx.from.id)

		await ctx.replyWithHTML(`
👋 Привет, <b>${ctx.from.first_name}</b>!
Введи /help чтобы узнать доступные команды!
    `)
	} catch (e) {
		console.error('cant handle start command', e)
	}
})

bot.command('help', async (ctx) => {
	try {
		await ctx.replyWithHTML(`
/calc - Калькулятор
/pass - Генератор пароля
/stats - Статистика для админов
    `)
	} catch (e) {
		console.error('cant handle help command', e)
	}
})

bot.command('pass', async (ctx) => {
	try {
		const pass = randomstring.generate()
		await ctx.reply(pass)
	} catch (e) {
		console.error('cant handle pass command', e)
	}
})

bot.command('calc', async (ctx) => {
	try {
		await ctx.scene.enter('calc')
	} catch (e) {
		console.error('cant enter calc scene', e)
	}
})

bot.command('stats', async (ctx) => {
	try {
		await ctx.replyWithHTML(`Кол-во пользователей: ${users.length}`)
	} catch (e) {
		console.error('cant handle stats command', e)
	}
})

bot.launch().then(() => {
	console.log(`bot started on @${bot.options.username}`)
})
