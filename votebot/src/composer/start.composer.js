const {Composer, Markup} = require('telegraf')
const userService = require('../services/user.service')


const composer = new Composer()

composer.command('start', async (ctx) => {
    try {
        const isNewUser = await userService.isNewUser({...ctx.from})
        if (isNewUser) {
            ctx.session.isRegistration = true
            await ctx.scene.enter('language')
        } else {
            await ctx.scene.enter('web')
            // await ctx.scene.enter('nominations')
        }
    } catch (e) {
        console.error('cant handle start command', e)
    }
})


composer.command('language', async ctx => await ctx.scene.enter('language'))
module.exports = composer
