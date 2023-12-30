import { TLocale } from '@/shared/lib/i18n/dictionary'
import { ICandidate } from '@/shared/types/candidate'
import { photo } from '@/shared/utils'
import Image from 'next/image'
import Link from 'next/link'
type Props = {
	candidate: ICandidate
	language: TLocale
}
const CandidateItem = ({ candidate, language }: Props) => {
	return (
		<Link
			key={candidate._id}
			href={`/${language}/candidate/${candidate._id}`}
			className='active-minister__item item-active-minister'
		>
			<div className='item-active-minister__ico'>
				<Image
					style={{
						width: 94,
						height: 94,
						minWidth: 94,
						minHeight: 94,
						maxWidth: 94,
						maxHeight: 94,
						objectFit: 'cover',
						borderRadius: '50%',
					}}
					src={photo(candidate.photo)}
					width={94}
					height={94}
					alt=''
				/>
			</div>
			<div className='item-active-minister__content'>
				<div className='item-active-minister__name'>
					{candidate[language].name}
				</div>
				<div className='item-active-minister__text text'>
					{candidate[language].description}
				</div>
			</div>
		</Link>
	)
}

export default CandidateItem
