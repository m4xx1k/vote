const {Scenes: {BaseScene}, Markup} = require('telegraf')
const candidateService = require("../../services/candidate.service");
const voteService = require("../../services/vote.service");
const nominationService = require("../../services/nomination.service");

const isCandidateVoted = (votes, candidateId) => votes.some(vote => vote.candidate === candidateId)

const scene = new BaseScene("nomination");

scene.enter(async (ctx) => {
        try {

            const locale = await ctx.i18n.getLocale()
            const {nominationId} = ctx.session
            if (nominationId) {
                const candidates = await candidateService.findAllByNominationId({id: nominationId, locale})
                const votes = await voteService.check({tg_id: ctx.from.id, nomination: nominationId})
                const nomination = await nominationService.findOne({id: nominationId})
                await ctx.reply(`Кандидати в ${nomination[locale].name}:`,
                    {
                        ...Markup.inlineKeyboard([
                            ...candidates.map((candidate, i) =>
                                [Markup.button.callback(`${isCandidateVoted(votes, candidate._id) ? '🟢' : '⚪'} ${i + 1}. ${candidate[locale].name}`, `candidate:${candidate._id}:dfjkdjf}`)]),
                            [Markup.button.callback('Перейти в номинации', 'go2nominations')],

                        ])
                    })
            } else {

                await ctx.scene.enter('nominations')
            }
        } catch (e) {
            console.log(e)
            await ctx.scene.reenter()
        }

    }
)


scene.action(/candidate:[A-Za-z0-9]+:[A-Za-z0-9]+/i, async (ctx) => {
    const [_, id, name] = ctx.match[0].split(':')


    ctx.session.candidateId = id
    ctx.session.candidateName = name
    await ctx.scene.enter('candidate')
});

scene.action('go2nominations', async (ctx) => {
    await ctx.scene.enter('nominations')
});

module.exports = scene;

