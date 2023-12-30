import Rating from '@/assets/img/category/rate.png'

import Uz from '@/assets/img/category/uz.png'
import { TLocale, getDictionary } from '@/shared/lib/i18n/dictionary'

import Image from 'next/image'
type Props = {
	language: TLocale
}
const NominationBottomBanner = async ({ language }: Props) => {
	const {
		page: { nomination },
	} = await getDictionary(language)
	return (
		<div className='category__banner'>
			<div className='category__banner-text'>{nomination.banner__text}</div>
			<div className='category__banner-img'>
				<Image src={Rating} width={152} alt='' />
			</div>
			<div className='category__banner-bg'>
				<Image src={Uz} alt='' />
			</div>
		</div>
	)
}

export default NominationBottomBanner
