import { TLocale, getDictionary } from '@/shared/lib/i18n/dictionary'
import Image from 'next/image'
import Link from 'next/link'
import Background from '../../assets/images/bg.png'
import Logo from '../../assets/img/logo_white.svg'
type Props = {
	params: {
		language: TLocale
	}
}
const changeLanguage = {
	ru: { link: '/uz', text: 'Узб' },
	uz: { link: '/ru', text: 'Рус' },
}
const getChangeLanguageData = (language: string) => {
	if (language !== 'ru' && language !== 'uz') {
		return { link: '/ru', text: 'Рус' }
	}
	return changeLanguage[language]
}
export default async function Home({ params: { language } }: Props) {
	const {
		page: { main },
	} = await getDictionary(language)
	const { link, text } = getChangeLanguageData(language)
	return (
		<div className='wrapper'>
			<main className='page'>
				<section className='hero'>
					<div className='hero__container'>
						<div className='hero__body'>
							<Link href='#' className='hero__logo logo'>
								<Image
									width={157}
									height={24}
									quality={100}
									src={Logo.src}
									alt='LOGO'
								/>
							</Link>
							<h1 className='hero__title title'>{main.title}</h1>
							<div className='hero__text text text_big hero__text-description'>
								<p>{main.description}</p>
							</div>
							<Link
								href={`/${language}/nominations`}
								className={'hero__link button'}
							>
								{main.button}
							</Link>
							<Link href={link} className='hero__language'>
								{text}
							</Link>
						</div>
					</div>
					<div className='hero__backgroung-ibg'>
						<Image src={Background.src} fill={true} alt='backgorund' />
					</div>
				</section>
			</main>
		</div>
	)
}
