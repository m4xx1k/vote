import CandidateItem from '@/entities/candidate/ui/candidate-item'
import { serverFetchCandidatesByNomination } from '@/shared/api/candidates.api'
import { TLocale } from '@/shared/lib/i18n/dictionary'
type Props = {
	language: TLocale
	id: string
}
const CandidateList = async ({ language, id }: Props) => {
	const candidates = await serverFetchCandidatesByNomination(id)
	return (
		<div className='active-minister__items'>
			{candidates.map(candidate => (
				<CandidateItem
					key={candidate._id}
					candidate={candidate}
					language={language}
				/>
			))}
		</div>
	)
}

export default CandidateList
