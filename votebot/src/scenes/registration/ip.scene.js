const {Scenes: {BaseScene}, Markup} = require('telegraf')
const {WEB_APP_URL} = process.env

const scene = new BaseScene("ip");

scene.enter(async (ctx) => {

        try {
            const locale = await ctx.i18n.getLocale()
            await ctx.reply(ctx.t("lang_selected"),
                Markup.keyboard([Markup.button.webApp(ctx.t('robot'), `${WEB_APP_URL}?lang=${locale}&id=${ctx.from.id}`)]).resize().oneTime());


        } catch (e) {
            console.log(e)
        }
    }
)


scene.on("web_app_data", async ctx => {
    const data = ctx.webAppData.data.json();
    ctx.session.ip = data.ip
    ctx.session.id = ctx.from.id
    await ctx.scene.enter('contact')

});
module.exports = scene;


