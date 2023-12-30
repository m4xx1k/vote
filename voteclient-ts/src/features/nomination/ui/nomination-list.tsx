import NominationItem from '@/entities/nomination/ui/nomination-item'
import { serverFetchAllNominations } from '@/shared/api/nomination.api'
import { TLocale } from '@/shared/lib/i18n/dictionary'
type Props = {
	language: TLocale
}
const NominationList = async ({ language }: Props) => {
	const nominations = await serverFetchAllNominations()

	return (
		<div className='category__items'>
			{nominations.map(nomination => (
				<NominationItem
					key={nomination._id}
					nomination={nomination}
					language={language}
				/>
			))}
		</div>
	)
}

export default NominationList
