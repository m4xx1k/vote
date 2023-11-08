const {Scenes: {BaseScene}, Markup} = require('telegraf')


const scene = new BaseScene("language");

scene.enter(async (ctx) => {
        try {
            const {isRegistration} = ctx.session
            if (isRegistration) {
                await ctx.replyWithHTML(ctx.t('welcome', {...ctx.from}),
                    {
                        ...Markup.inlineKeyboard(
                            [
                                Markup.button.callback('ru', 'ru'),
                                Markup.button.callback('uz', 'uz')
                            ],
                        )
                    }
                )
            } else {
                await ctx.replyWithHTML(`Вьіберите язьік`,
                    {
                        ...Markup.inlineKeyboard(
                            [
                                Markup.button.callback('ru', 'ru'),
                                Markup.button.callback('uz', 'uz')
                            ],
                        )
                    }
                )

            }

        } catch (e) {
            console.log(e)
        }
    }
)


scene.action('ru', async (ctx) => {
    await ctx.i18n.setLocale('ru');
    const {isRegistration, previousScene} = ctx.session
    if (isRegistration) {
        await ctx.scene.enter('ip')
        ctx.session.isRegistration = false
    } else {
        const language = await ctx.i18n.getLocale()

        await ctx.replyWithHTML(`ВВійти`, Markup.inlineKeyboard([
            [
                Markup.button.webApp(`${language} | Web`, `${process.env.WEB}?language=${language}`)]
        ]))


        // await ctx.scene.enter(previousScene ? previousScene : 'nominations')
    }

});
scene.action('uz', async (ctx) => {
    await ctx.i18n.setLocale('uz');
    const {isRegistration, previousScene} = ctx.session
    if (isRegistration) {
        await ctx.scene.enter('ip')
        ctx.session.isRegistration = false
    } else {

        const language = await ctx.i18n.getLocale()

        await ctx.replyWithHTML(`ВВійти`, Markup.inlineKeyboard([
            [
                Markup.button.webApp(`${language} | Web`, `${process.env.WEB}?language=${language}`)]
        ]))


        // await ctx.scene.enter(previousScene ? previousScene : 'nominations')
    }
});


module.exports = scene;
