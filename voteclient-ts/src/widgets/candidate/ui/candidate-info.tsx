import { TLocale } from '@/shared/lib/i18n/dictionary'
import { ICandidateWidthRating } from '@/shared/types/candidate'
import { photo } from '@/shared/utils'
import Image from 'next/image'
import { Fragment } from 'react'
type Props = {
	language: TLocale
	candidate: ICandidateWidthRating
}
const CandidateInfo = ({ language, candidate }: Props) => {
	return (
		<Fragment>
			<div
				style={{
					maxHeight: 192,
					maxWidth: 192,
					minHeight: 192,
					minWidth: 192,
				}}
				className='minister__image-ibg--contain'
			>
				<Image
					style={{
						maxHeight: 192,
						maxWidth: 192,
						minHeight: 192,
						minWidth: 192,
						objectFit: 'cover',
						margin: '0 auto',
						borderRadius: '50%',
					}}
					src={photo(candidate.photo)}
					width={192}
					height={192}
					quality={90}
					alt=''
				/>
			</div>
			<h2 className={'minister__maintitle title'}>
				{candidate[language].name}
			</h2>
			<div className='minister__text text'>
				{candidate[language].description}
			</div>
		</Fragment>
	)
}

export default CandidateInfo
