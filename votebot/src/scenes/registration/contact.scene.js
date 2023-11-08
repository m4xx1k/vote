const {Scenes, Markup} = require('telegraf')

const userService = require('../../services/user.service')
const {generateVerificationCode, sendVerificationCode} = require("../../utils");

module.exports = new Scenes.WizardScene(
    'contact',
    async (ctx) => {
        await ctx.replyWithHTML('📞 Поделитесь контактом для верификации',
            Markup.keyboard([Markup.button.contactRequest('Отправить 📞')]).oneTime()
        )
        return ctx.wizard.next()
    },
    async (ctx) => {
        try {
            const phone_number = ctx.message?.contact?.phone_number
            if (!phone_number) {
                return ctx.wizard.back()
            }

            const verificationCode = generateVerificationCode()
            ctx.session.verificationCode = verificationCode
            ctx.session.phone = phone_number

            ctx.session.sendCodeTime = new Date().getTime()

            await sendVerificationCode(phone_number, verificationCode, ctx)
            await ctx.reply(`✅Код верификации отправлен. После получения отправьте его мне. (${verificationCode})`,)
            return ctx.wizard.next()
        } catch (e) {
            console.log(e)
        }
    },
    async (ctx) => {
        try {
            const usersCode = Number(ctx.message.text)
            const {verificationCode, sendCodeTime, ip, id, phone} = ctx.session
            const isCorrect = usersCode === verificationCode
            const now = new Date().getTime()

            if (!isCorrect) {
                if (now - sendCodeTime < 60_000) {
                    await ctx.replyWithHTML(`❌ Код неверен спробуйте ще раз`)
                    return
                } else {
                    await ctx.replyWithHTML(`❌ щяс відправим новий пароль`)
                    return ctx.wizard.back()
                }
            }
            const user = await userService.create({
                ip, id, phone, username: ctx.from?.username || ''
            })

            if (user)
                await ctx.replyWithHTML(`🎉\nВот твой профиль в базе данных:\n\n${JSON.stringify(user, null, 4)}`)
            else
                await ctx.replyWithHTML(`бля тьі вже зареган_а пхд`)

            const language = await ctx.i18n.getLocale()

                await ctx.replyWithHTML(`ВВійти`, Markup.inlineKeyboard([
                    [
                        Markup.button.webApp(`${language} | Web`, `${process.env.WEB}?language=${language}`)]
                ]))
            // await ctx.scene.enter('nominations')

        } catch (e) {
            console.log(e)
        }
    }
)
