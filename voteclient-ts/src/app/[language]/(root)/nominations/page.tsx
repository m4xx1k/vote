import NominationList from '@/features/nomination/ui/nomination-list'
import { TLocale, getDictionary } from '@/shared/lib/i18n/dictionary'
import NominationBottomBanner from '@/widgets/nomination/ui/nomination-bottom-banner'
type Props = {
	params: {
		language: TLocale
	}
}
const Page = async ({ params: { language } }: Props) => {
	const {
		page: { nomination },
	} = await getDictionary(language)
	return (
		<main className='page'>
			<section className='category'>
				<div className='category__container'>
					<div className='category__body'>
						<h1 className='category__title title'>{nomination.title}</h1>

						<NominationList language={language} />
						<NominationBottomBanner language={language} />
					</div>
				</div>
			</section>
		</main>
	)
}

export default Page
