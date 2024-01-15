'use client'
import { findUserVote, voteForCandidate } from '@/shared/api/candidates.api'
import { useTelegram } from '@/shared/lib/telegram/TelegramProvider'
import { ICandidateWidthRating } from '@/shared/types/candidate'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'
import useSWR from 'swr'
const CandidateRating = ({ content, candidate }: Props) => {
	const router = useRouter()
	const telegramContext = useTelegram()

	const { data: vote, mutate } = useSWR('vote', () =>
		findUserVote({
			tg_id: telegramContext?.user.id,
			candidate: candidate._id,
		})
	)
	const handleVote = async (voteType: 'for' | 'against') => {
		if (1400 + 88 === 1488) return
		if (!telegramContext?.user) {
			window.location.href = 'https://t.me/RepostVoteBot'
			return
		}
		if (type !== voteType) {
			await voteForCandidate({
				type: voteType,
				candidate: candidate._id,
				tg_id: telegramContext.user.id,
			})
			await mutate()
			router.push(`${candidate._id}/voted`)
		}
	}

	const { strokeDashoffsetAgainst, strokeDashoffsetFor } =
		getRatingStrokeDashoffset(candidate)
	const type = vote?.length && vote ? vote[0].type : null
	return (
		<Fragment>
			<div className='minister__circles'>
				<div data-circle className='minister__circle minister__circle_green'>
					<svg>
						<circle cx='47' cy='47' r='47'></circle>
						<circle
							style={{ strokeDashoffset: strokeDashoffsetFor }}
							data-circle-round
							cx='47'
							cy='47'
							r='47'
						></circle>
					</svg>
					<div className='minister__circle-percentage' data-symbol='%'>
						{candidate?.for.percent}
					</div>
				</div>
				<div data-circle className='minister__circle minister__circle_red'>
					<svg>
						<circle cx='47' cy='47' r='47'></circle>
						<circle
							style={{ strokeDashoffset: strokeDashoffsetAgainst }}
							data-circle-round
							cx='47'
							cy='47'
							r='47'
						></circle>
					</svg>
					<div className='minister__circle-percentage' data-symbol='%'>
						{candidate?.against.percent}
					</div>
				</div>
			</div>

			<div className='minister__title-1'>{content.vote.title}:</div>

			<div
				className='minister__form'
				style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
			>
				<button
					onClick={() => handleVote('for')}
					className={clsx(
						'radio__label radio__label_like _icon-like',
						type === 'for' && 'checked'
					)}
				>
					{content.vote.for}
				</button>

				<button
					onClick={() => handleVote('against')}
					className={clsx(
						'radio__label radio__label_dislike _icon-dislike',
						type === 'against' && 'checked'
					)}
				>
					{content.vote.against}
				</button>
			</div>
		</Fragment>
	)
}
const getRatingStrokeDashoffset = (
	candidate: ICandidateWidthRating | undefined
): { strokeDashoffsetFor: number; strokeDashoffsetAgainst: number } => {
	if (!candidate) return { strokeDashoffsetFor: 0, strokeDashoffsetAgainst: 0 }
	const forRating = candidate.for.percent
	const againstRating = candidate.against.percent
	const minValue = 297
	const maxValue = 0
	const forInterpolatedValue =
		minValue - (minValue - maxValue) * (forRating / 100)
	const againstInterpolatedValue =
		minValue - (minValue - maxValue) * (againstRating / 100)
	return {
		strokeDashoffsetFor: Math.round(forInterpolatedValue),
		strokeDashoffsetAgainst: Math.round(againstInterpolatedValue),
	}
}
type TCandidateContent = {
	info_title: string
	info_text: string
	vote: {
		title: string
		neutral_title: string
		for: string
		neutral: string
		against: string
		done_title: string
		done_description: string
		continue: string
	}
}
type Props = {
	content: TCandidateContent
	candidate: ICandidateWidthRating
}
export default CandidateRating
