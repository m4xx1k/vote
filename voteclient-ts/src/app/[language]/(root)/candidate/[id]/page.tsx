import { serverFetchCandidateWithRating } from '@/shared/api/candidates.api'
import { TLocale, getDictionary } from '@/shared/lib/i18n/dictionary'
import CandidateInfo from '@/widgets/candidate/ui/candidate-info'
import CandidateRating from '@/widgets/candidate/ui/candidate-rating'
type Props = {
	params: {
		id: string
		language: TLocale
	}
}

const Page = async ({ params: { id, language } }: Props) => {
	const candidate = await serverFetchCandidateWithRating(id)

	const {
		page: { candidate: content },
	} = await getDictionary(language)

	if (!candidate) return null
	return (
		<main className='page'>
			<section className='minister'>
				<div className='minister__container'>
					<div className='minister__body'>
						<CandidateInfo candidate={candidate} language={language} />
						<CandidateRating candidate={candidate} content={content} />
					</div>
				</div>
			</section>
		</main>
	)
}

export default Page
