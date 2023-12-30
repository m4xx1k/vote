import CandidateList from '@/features/candidate/ui/candidate-list'
import { TLocale } from '@/shared/lib/i18n/dictionary'

type Props = {
	params: {
		id: string
		language: TLocale
	}
	searchParams: {
		nomination: string
	}
}

const Page = async ({ params: { id, language }, searchParams }: Props) => {
	const nominationName = searchParams?.nomination
		? searchParams.nomination.replaceAll('_', ' ')
		: ''
	return (
		<>
			<main className='page'>
				<section className='active-minister'>
					<div className='active-minister__container'>
						<div className='active-minister__body'>
							<h1 className='active-minister__title title'>{nominationName}</h1>
							<CandidateList language={language} id={id} />
						</div>
					</div>
				</section>
			</main>
		</>
	)
}
export default Page
