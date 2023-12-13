const {Scenes, Markup} = require('telegraf')

const userService = require('../../services/user.service')
const {generateVerificationCode, sendVerificationCode} = require("../../utils");

module.exports = new Scenes.WizardScene(
    'contact',

    async (ctx) => {
        await ctx.replyWithHTML(
            ctx.t('share_contact_text'),
            Markup.keyboard([Markup.button.contactRequest(ctx.t('share_contact_button'))]).oneTime()
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

            const smsResult = await userService.sendSms(phone_number, verificationCode)
            console.log({smsResult, verificationCode})
            await ctx.reply(`${ctx.t('code_sent_text')}`)

            return ctx.wizard.next()
        } catch (e) {
            console.log(e)
        }
    },
    async (ctx) => {
        try {

            const usersCode = Number(ctx.message.text)
            const {verificationCode, sendCodeTime, phone} = ctx.session
            const id = ctx.from.id
            const isCorrect = usersCode === verificationCode

            const now = new Date().getTime()

            if (!isCorrect) {
                if (now - sendCodeTime < 60_000) {
                    await ctx.replyWithHTML(ctx.t('code_uncorrect'))
                    return
                } else {
                    await ctx.replyWithHTML(ctx.t('code_resent'))
                    return ctx.wizard.back()
                }
            }
            const user = await userService.create({
                ip: '_', id, phone, username: ctx.from?.username || ''
            })


            await ctx.scene.enter('web')

        } catch (e) {
            console.log(e)
        }
    }
)
