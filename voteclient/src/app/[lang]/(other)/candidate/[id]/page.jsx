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
    const {data: vote, isLoadingVote, errorVote, mutate} = useSWR('vote', () => findUserVote({
        tg_id: user.id,
        candidate: id
    }))
    const [content, setContent] = useState({})
    useEffect(() => {
        getDictionary(lang).then(data => setContent(data.page.candidate))
    }, [lang])

    const type = vote?.length && vote ? vote[0].type : null
    const strokeDashoffset = getRatingCircleStroke(candidate ? candidate?.rating : 0)
    const handleVote = async (voteType) => {
        if (type !== voteType) {
            setIsVoting(true)
            await voteForCandidate({type: voteType, candidate: id, tg_id: user.id})
            await mutateCandidate()
            await mutate()
        }
    }
    const neutral = candidate?.neutral ? candidate.neutral.toFixed(0) : 0
    if (isLoading || error || !candidate || !content) return null

    if (isVoting) return <Voted setIsVoting={setIsVoting}/>

    return (<main className="page">

            <section className="minister">
                <div className="minister__container">
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
                        {/*<div className={'max-w-sm'}>*/}
                        {/*    {JSON.stringify({candidate, error})}*/}
                        {/*</div>*/}
                        <div data-circle className="minister__circle">
                            <svg>
                                <circle cx="47" cy="47" r="47"></circle>
                                <circle style={{strokeDashoffset}} data-circle-round cx="47" cy="47" r="47"></circle>
                            </svg>
                            <div style={{fontSize: 20}} className="minister__circle-percentage"
                                 data-symbol="%">{(candidate?.rating || 0).toFixed(0)}</div>
                        </div>
                        <div className="minister__title-2">Проголосовали нейтрально:</div>
                        <div className="minister__progres progres" data-progres={neutral}>
                            <div className="progres__bar">
                            <span style={{width: `${neutral}%`}} data-progres-line className="progres__line"><span
                                className="progres__text">{neutral}</span></span>
                            </div>
                            <div className="progres__bottom">
                                <span>0</span>
                                <span>100%</span>
                            </div>
                        </div>
                        <div className="minister__info">
                            <div className="minister__title-2">{content.info_title}:</div>
                            <div className="minister__text text text_big">
                                {content.info_text}
                            </div>
                        </div>

                        <div className="minister__title-1">{content.vote.title}:</div>

                        <div className="minister__form" style={{display: 'flex', flexDirection: 'column', gap: 4}}>
                            <button style={type === 'for' ? {border: '2px solid black'} : {}}
                                    onClick={() => handleVote('for')}
                                    className={clsx("radio__label radio__label_like _icon-like", type === 'for' && active)}>
                                {content.vote.for}
                            </button>
                            <button onClick={() => handleVote('neutral')}
                                    className={clsx("radio__label", type === 'neutral' && active)}>{content.vote.neutral}</button>
                            <button style={type === 'against' ? {border: '2px solid black'} : {}}
                                    onClick={() => handleVote('against')}
                                    className={clsx("radio__label radio__label_dislike _icon-dislike", type === 'against' && active)}>
                                {content.vote.against}
                            </button>
                            {type}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};


const getRatingCircleStroke = (rating) => {
    let value = rating
    if (!rating) value = 0
    const minValue = 297;
    const maxValue = 0;
    const interpolatedValue = minValue + (maxValue - minValue) * (value / 100);
    return Math.round(interpolatedValue);
}

export default Page;
