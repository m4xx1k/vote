'use client'
import {findUserVote, getCandidateWithRating, voteForCandidate} from "../../../../../shared/api/candidates.api";
import Image from "next/image";
import {photo} from "../../../../../shared/utils/candidate.utils";
import useSWR from "swr";
import {useTelegram} from "../../../../../shared/providers/TelegramProvider";
import {clsx} from "clsx";

const getRatingCircleStroke = (rating) => {
    let value = rating
    if (!rating) value = 0
    const minValue = 297;
    const maxValue = 0;
    const interpolatedValue = minValue + (maxValue - minValue) * (value / 100);
    return Math.round(interpolatedValue);
}


const active = 'border-2 border-black'
const Page = ({params: {id, lang}}) => {
    const {user} = useTelegram()
    const {data: candidate, isLoading, error} = useSWR(id, () => getCandidateWithRating(id))
    const {data: vote, isLoadingVote, errorVote, mutate} = useSWR('vote', () => findUserVote({
        tg_id: user.id,
        candidate: id
    }))

    const type = vote?.length && vote ? vote[0].type : null
    const strokeDashoffset = getRatingCircleStroke(candidate ? candidate?.rating : 0)
    const handleVote = async (type) => {
        await voteForCandidate({type, candidate: id, tg_id: user.id})
        await mutate()
    }
    if (isLoading || error || !candidate) return 'wait'
    return (<main className="page">

            <section className="minister">
                <div className="minister__container">
                    <div className="minister__body">
                        <div style={{maxHeight: 192, maxWidth: 192,}} className="minister__image-ibg--contain">
                            <Image style={{maxHeight: 192, maxWidth: 192, objectFit: 'cover', margin: '0 auto'}}
                                   src={photo(candidate.photo)} width={192} height={192} alt=""/>
                        </div>
                        <h2 className={clsx("minister__maintitle title", 'max-w-sm')}>ID:{JSON.stringify({user})}</h2>
                        <h1 className="minister__maintitle title">{candidate[lang].name} {JSON.stringify({type})}</h1>
                        <div className="minister__text text">{candidate[lang].description}</div>
                        {/*<div className={'max-w-sm'}>*/}
                        {/*    {JSON.stringify({candidate, error})}*/}
                        {/*</div>*/}
                        <div data-circle className="minister__circle">
                            <svg>
                                <circle cx="47" cy="47" r="47"></circle>
                                <circle style={{strokeDashoffset}} data-circle-round cx="47" cy="47" r="47"></circle>
                            </svg>
                            <div style={{fontSize: 16}} className="minister__circle-percentage"
                                 data-symbol="%">{(candidate?.rating || 0).toFixed(4)}</div>
                        </div>

                        <div className="minister__info">
                            <div className="minister__title-2">Информация:</div>
                            <div className="minister__text text text_big">
                                {JSON.stringify({user}, null, 4)}
                            </div>
                        </div>

                        <div className="minister__title-1">Проголосовать:</div>

                        <div className="minister__form">
                            <button style={type === 'for' ? {border: '2px solid black'} : {}}
                                    onClick={() => handleVote('for')}
                                    className={clsx("radio__label radio__label_like _icon-like", type === 'for' && active)}>За
                            </button>
                            <button className="radio__label">Нейтрально</button>
                            <button style={type === 'against' ? {border: '2px solid black'} : {}}
                                    onClick={() => handleVote('against')}
                                    className={clsx("radio__label radio__label_dislike _icon-dislike", type === 'against' && active)}>Против
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>


    )
        ;
};

export default Page;
