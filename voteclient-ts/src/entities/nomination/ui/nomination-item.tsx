import { TLocale } from '@/shared/lib/i18n/dictionary'
import { INomination } from '@/shared/types/nomination'
import Link from 'next/link'
type Props = {
	nomination: INomination
	language: TLocale
}
const NominationItem = ({ nomination, language }: Props) => {
	return (
		<Link
			href={`/${language}/nominations/${nomination._id}?nomination=${nomination[
				language
			].name.replaceAll(' ', '_')}`}
			className='category__item'
		>
			<p>{nomination[language].name}</p>
		</Link>
	)
}

export default NominationItem
