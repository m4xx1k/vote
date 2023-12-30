import { TLocale, getDictionary } from '@/shared/lib/i18n/dictionary'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

const Page = async ({ params: { language, id } }: Props) => {
	const {
		page: { candidate: content },
	} = await getDictionary(language)

	const backToCandidate = async () => {
		'use server'
		revalidateTag('candidate')
		redirect(`/${language}/candidate/${id}`)
	}

	return (
		<main className='page'>
			<form action={backToCandidate} className='done'>
				<div className='done__container'>
					<div className='done__body _icon-cheked'>
						<div className='done__title title'>{content.vote.done_title}</div>
						<div className='done__text text'>
							{content.vote.done_description}
						</div>
						<button type='submit' className='done__link button'>
							{content.vote.continue}
						</button>
					</div>
				</div>
			</form>
		</main>
	)
}

type Props = {
	params: {
		language: TLocale
		id: string
	}
}
export default Page
