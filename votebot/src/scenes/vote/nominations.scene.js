const {Scenes: {BaseScene}, Composer, Telegraf, session, Markup} = require('telegraf')
const nominationService = require("../../services/nomination.service");
const voteService = require("../../services/vote.service");


const scene = new BaseScene("nominations");
const isNominationVoted = (votes, nominationId) => {
    return votes.some(vote => vote.nomination === nominationId)
}
scene.enter(async (ctx) => {
        try {

            const locale = await ctx.i18n.getLocale()
            const nominations = await nominationService.findAll()
            const votes = await voteService.check({tg_id: ctx.from.id})
            await ctx.reply('Выберите номинацию:',
                {
                    ...Markup.inlineKeyboard(
                        nominations.map((nomination, i) =>
                            [Markup.button.callback(` ${isNominationVoted(votes, nomination._id) ? '🟢' : '⚪'} ${i + 1}. ${nomination[locale || 'ru']?.name||'opa'}`, `nomination:${nomination._id}`)])
                    )
                },
            )
        } catch (e) {
            console.log(e)
        }
    }
)


scene.action(/nomination:[A-Za-z0-9]+/i, async (ctx) => {
    try {
        const [_, id] = ctx.match[0].split(':')

        ctx.session.nominationId = id
        await ctx.scene.enter('nomination');

    } catch (e) {
        console.log('action nomination ', e)
    }

});
module.exports = scene;


//
// scene.action("next-step", async ctx => {
//     ctx.deleteMessage().catch(e => { })
//     ctx.user.cursor++;
//     ctx.users.save();
//     ctx.sheets.updateUser(ctx.user);
//     ctx.scene.reenter();
// })
//
// scene.action("been-watch", async ctx => {
//     ctx.edit("really_next", null, Markup.inlineKeyboard([
//         [Markup.button.callback(ctx.getText("yes"), "send-reviews")],
//         [Markup.button.callback(ctx.getText("next"), "next-step")]
//     ]));
// })
//
// scene.action("send-reviews", async ctx => {
//     ctx.scene.state.wait_reviews = true;
//     ctx.edit("send_reviews");
// })
//
// scene.on('text', async ctx => {
//     if (!ctx.scene.state.wait_reviews) return;
//     await ctx.send('okey_send_reviews')
//     ctx.sheets.addReviews(`Шаг ${ctx.user.cursor + 1}/${ctx.settings.get("course_msgs").length}`, ctx.user.id, ctx.message.text)
//     ctx.user.cursor++;
//     ctx.users.save();
//     ctx.sheets.updateUser(ctx.user);
//     ctx.scene.reenter();
// })
//
// scene.action("back", async ctx => ctx.scene.enter("userCourse"));
// scene.action("packets", async ctx => ctx.scene.enter("buyPackets"))
// scene.action("go-test", async ctx => ctx.scene.enter("userTest"))
