'use client'
import {findUserVote, getCandidateWithRating, voteForCandidate} from "../../../../../shared/api/candidates.api";
import Image from "next/image";
import {photo} from "../../../../../shared/utils/candidate.utils";
import useSWR from "swr";
import {useTelegram} from "../../../../../shared/providers/TelegramProvider";
import {clsx} from "clsx";
import {getDictionary} from "../../../../../shared/i18n/dictionary";
import {useEffect, useState} from "react";
import Voted from "../../../../../widgets/vote/ui/voted";


const active = 'border-2 border-black'
const Page = ({params: {id, lang}}) => {
    const [isVoting, setIsVoting] = useState(false)
    const {user} = useTelegram()
    const {data: candidate, isLoading, error, mutate: mutateCandidate} = useSWR(id, () => getCandidateWithRating(id))
    const {data: vote, mutate} = useSWR('vote', () => findUserVote({
        tg_id: user.id,
        candidate: id
    }))
    const [content, setContent] = useState({})
    useEffect(() => {
        getDictionary(lang).then(data => setContent(data.page.candidate))
    }, [lang])

    const type = vote?.length && vote ? vote[0].type : null
    const strokeDashoffsetFor = getRatingCircleStroke(candidate ? candidate?.for.percent : 0)
    const strokeDashoffsetAgainst = getRatingCircleStroke(candidate ? candidate?.against.percent : 0)
    const handleVote = async (voteType) => {
        if (type !== voteType) {
            setIsVoting(true)
            await voteForCandidate({type: voteType, candidate: id, tg_id: user.id})
            await mutateCandidate()
            await mutate()
        }
    }
    if (isVoting) return <Voted content={content} setIsVoting={setIsVoting}/>

    return (<main className="page">

            <section className="minister">
                <div className="minister__container">
                    {isLoading || error || !candidate || !Object.keys(content).length ? null :

                        <div className="minister__body">
                            <div style={{maxHeight: 192, maxWidth: 192, minHeight: 192, minWidth: 192,}}
                                 className="minister__image-ibg--contain">
                                <Image style={{
                                    maxHeight: 192,
                                    maxWidth: 192,
                                    minHeight: 192,
                                    minWidth: 192,
                                    objectFit: 'cover',
                                    margin: '0 auto',
                                    borderRadius: '50%'
                                }}
                                       src={photo(candidate.photo)} width={192} height={192} quality={90} alt=""/>
                            </div>
                            <h2 className={"minister__maintitle title"}>{candidate[lang].name}</h2>
                            <div className="minister__text text">{candidate[lang].description}</div>


                            <div className="minister__circles">
                                <div data-circle className="minister__circle minister__circle_green">
                                    <svg>
                                        <circle cx="47" cy="47" r="47"></circle>
                                        <circle style={{strokeDashoffset: strokeDashoffsetFor}} data-circle-round
                                                cx="47"
                                                cy="47" r="47"></circle>
                                    </svg>
                                    <div className="minister__circle-percentage"
                                         data-symbol="%">{candidate?.for.percent}</div>
                                </div>
                                <div data-circle className="minister__circle minister__circle_red">
                                    <svg>
                                        <circle cx="47" cy="47" r="47"></circle>
                                        <circle style={{strokeDashoffset: strokeDashoffsetAgainst}} data-circle-round
                                                cx="47" cy="47" r="47"></circle>
                                    </svg>
                                    <div className="minister__circle-percentage"
                                         data-symbol="%">{candidate?.against.percent}</div>
                                </div>
                            </div>





                            <div className="minister__title-1">{content.vote.title}:</div>

                            <div className="minister__form" style={{display: 'flex', flexDirection: 'column', gap: 4}}>
                                <button style={type === 'for' ? {border: '2px solid black'} : {}}
                                        onClick={() => handleVote('for')}
                                        className={clsx("radio__label radio__label_like _icon-like", type === 'for' && active)}>
                                    {content.vote.for}
                                </button>

                                <button style={type === 'against' ? {border: '2px solid black'} : {}}
                                        onClick={() => handleVote('against')}
                                        className={clsx("radio__label radio__label_dislike _icon-dislike", type === 'against' && active)}>
                                    {content.vote.against}
                                </button>
                            </div>
                        </div>

                    }


                </div>
            </section>
        </main>
    );
};

const getRatingCircleStroke = (rating) => {
    if (rating === undefined || rating === null) {
        rating = 0;
    }

    const minValue = 297;
    const maxValue = 0;
    const interpolatedValue = minValue - (minValue - maxValue) * (rating / 100);
    return Math.round(interpolatedValue);
};
export default Page;
