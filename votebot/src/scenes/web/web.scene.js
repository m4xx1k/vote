const {Scenes: {BaseScene}, Markup} = require('telegraf')


const scene = new BaseScene("web");

scene.enter(async (ctx) => {

        try {
            const locale = await ctx.i18n.getLocale()
            await ctx.replyWithHTML(ctx.t('vote'), Markup.inlineKeyboard([
                [
                    Markup.button.webApp(`${locale.toUpperCase()} | Web`, `${process.env.WEB}/${locale}`)]
            ]))
        } catch (e) {
            console.log(e)
        }

    },
)


module.exports = scene;
