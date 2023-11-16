const {Scenes: {BaseScene}, Markup} = require('telegraf')


const scene = new BaseScene("web");

scene.enter(async (ctx) => {

        try {
            const locale = await ctx.i18n.getLocale()
            await ctx.replyWithHTML(`ВВійти`, Markup.inlineKeyboard([
                [
                    Markup.button.webApp(`${locale} | Web`, `${process.env.WEB}/${locale}`)]
            ]))
        } catch (e) {
            console.log(e)
        }

    },
)


module.exports = scene;
