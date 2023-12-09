const {Scenes: {BaseScene}, Markup} = require('telegraf')


const scene = new BaseScene("language");

scene.enter(async (ctx) => {
        try {
            const {isRegistration} = ctx.session
            const text = isRegistration ? ctx.t('welcome', {...ctx.from}) : ctx.t('lang_choose')
            await ctx.replyWithHTML(text,
                {
                    ...Markup.inlineKeyboard(
                        [
                            Markup.button.callback('Русский', 'ru'),
                            Markup.button.callback('Узбекча', 'uz')
                        ],
                    )
                }
            )
        } catch (e) {
            console.log(e)
        }
    }
)


scene.action('ru', async (ctx) => {
    await ctx.i18n.setLocale('ru');
    const {isRegistration, previousScene} = ctx.session
    if (isRegistration) {
        await ctx.scene.enter('contact')
        ctx.session.isRegistration = false
    } else {
        await ctx.scene.enter(previousScene ? previousScene : 'web')
    }

});
scene.action('uz', async (ctx) => {
    await ctx.i18n.setLocale('uz');
    const {isRegistration, previousScene} = ctx.session
    if (isRegistration) {
        await ctx.scene.enter('contact')
        ctx.session.isRegistration = false
    } else {
        await ctx.scene.enter(previousScene ? previousScene : 'web')
    }
});


module.exports = scene;
