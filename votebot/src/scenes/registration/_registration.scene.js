// const {Scenes, Markup} = require('telegraf')
//
// const userService = require('../../api/user.service')
// const {getRandomNumber, sendVerificationCode} = require("../../utils");
//
// module.exports = new Scenes.WizardScene(
//     'contact',
//     async (ctx) => {
//         try {
//             await ctx.replyWithHTML('📞 Поділіться контактом для верифікації',
//                 Markup.keyboard([Markup.button.contactRequest('Надіслати 📞')]).oneTime()
//             )
//             return ctx.wizard.next()
//         } catch (e) {
//             console.log(e)
//         }
//     },
//     async (ctx) => {
//         try {
//             const phone_number = ctx.message?.contact?.phone_number
//             if (!phone_number) {
//                 return ctx.wizard.back()
//             }
//             const randomNumber = getRandomNumber()
//             ctx.session.verification_code = randomNumber
//             ctx.session.phone = phone_number
//
//             await sendVerificationCode(phone_number, randomNumber, ctx)
//             ctx.session.sendCodeTime = new Date().getTime()
//             await ctx.reply('✅ Код верифікації відправлено. Після отримання надішліть його мені.',)
//
//             return ctx.wizard.next()
//         } catch (e) {
//             console.log(e)
//         }
//     },
//     async (ctx) => {
//         try {
//             console.log(1)
//             const user_code = Number(ctx.message.text)
//             const session_code = Number(ctx.session.verification_code)
//             const now = new Date().getTime()
//             let sendCodeTime
//             if (ctx.session?.sendCodeTime) {
//                 sendCodeTime = ctx.session?.sendCodeTime
//             } else {
//                 ctx.session.sendCodeTime = now
//             }
//             if (user_code === session_code) {
//                 const {ip, id, phone} = ctx.session
//                 try {
//                     const user = await userService.create({
//                         ip, id, phone, username: ctx.from?.username || ''
//                     })
//
//                     await ctx.replyWithHTML(`🎉 Юхуууууу, все правильно\nОсь твій профіль в базі даних:\n\n${JSON.stringify(user, null, 4)}`)
//
//                 } catch (e) {
//                     await ctx.replyWithHTML(`бля ти вже зареган_а пхд`)
//
//                 }
//
//                 await ctx.scene.enter('nominations')
//
//             } else if (now - sendCodeTime > 10_000) {
//                 return ctx.wizard.selectStep(0)
//             } else {
//                 console.log({user_code, session_code: ctx.session.verification_code})
//                 await ctx.replyWithHTML(`❌ Код невірний, спробуйте ще раз`)
//                 return
//             }
//
//         } catch (e) {
//             console.log(e)
//         }
//     }
// )
