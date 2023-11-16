const {Scenes: {BaseScene}, Markup} = require('telegraf')
const candidateService = require("../../services/candidate.service");
const voteService = require("../../services/vote.service");
const path = require("path");


const scene = new BaseScene("candidate");

scene.enter(async (ctx) => {

        try {
            const {candidateId} = ctx.session
            if (candidateId) {

                const locale = await ctx.i18n.getLocale()
                const candidate = await candidateService.findOne({id: candidateId})
                const voted = await voteService.check({
                    tg_id: ctx.from.id,
                    nomination: candidate.nomination,
                })
                // const source = path.join(__dirname,'..', '..', '..', '..', 'voteserver/photos/candidates', candidate.photo)
                await ctx.replyWithPhoto({
                    source: `${process.env.BACKEND_API_URL}/${candidate.photo}`,
                    // source
                })
                const inlineButtons = [
                    [Markup.button.callback('Перейти в номинации', 'go2nominations')],
                    [Markup.button.callback('Перейти в кандидаты', 'go2candidates')],
                ]
                if (!voted?.length)
                    inlineButtons.unshift([Markup.button.callback('Проголосовать', `vote:${candidate._id}:${candidate.nomination}`)])
                await ctx.reply(`Вы выбрали кандидата "${candidate[locale].name}".`,
                    {
                        ...Markup.inlineKeyboard(inlineButtons).oneTime()
                    }
                );

            } else {
                await ctx.scene.enter('nomination')
            }

        } catch (e) {
            console.log(e)
            await ctx.scene.enter('nominations')
        }

    },
)

scene.action('go2nominations', async (ctx) => {
    await ctx.scene.enter('nominations')
});
scene.action('go2candidates', async (ctx) => {

    await ctx.scene.enter('nomination')
});
scene.action('exit', async (ctx) => {
    await ctx.scene.leave()
});

scene.action(/nomination:[A-Za-z0-9]+/i, async (ctx) => {
    const [_, id, name] = ctx.match[0].split(':')

    ctx.session.nominationId = id
    ctx.session.nominationName = name
    await ctx.scene.enter('candidate');
});

scene.action(/vote:[A-Za-z0-9]+:[A-Za-z0-9]+/i, async (ctx) => {
    const [_, candidate, nomination] = ctx.match[0].split(':')

    await voteService.vote({tg_id: ctx.from.id, candidate, nomination})
    await ctx.scene.enter('nomination');
});

module.exports = scene;
