import Image from 'next/image'
import Logo from '../../assets/img/logo_white.svg'
import Background from '../../assets/images/bg.png'
import {getDictionary} from "../../shared/i18n/dictionary";
import Link from "next/link";

export default async function Home({params: {lang}}) {
    const {page: {main}} = await getDictionary(lang)
    const changeLanguage = {
        'ru': {link:'/uz', text:'Узб'},
        'uz': {link:'/ru',text:'Рус'}
    }
    return (
        <div className="wrapper">
            <main className="page">
                <section className="hero">
                    <div className="hero__container">
                        <div className="hero__body">
                            <Link href="#" className="hero__logo logo">
                                <Image width={157} height={24} quality={100} src={Logo.src} alt="LOGO"/>
                            </Link>
                            <h1 className="hero__title title">{main.title}</h1>
                            <div className="hero__text text text_big">
                                <p>
                                    {main.description}
                                </p>
                            </div>
                            <Link href={`/${lang}/nominations`} className={'hero__link button'}>{main.button}</Link>
                            <Link href={changeLanguage[lang].link} className="hero__language">{changeLanguage[lang].text}</Link>
                        </div>
                    </div>
                    <div className="hero__backgroung-ibg">
                        <Image src={Background.src} fill={true} alt=""/>
                    </div>
                </section>
            </main>

        </div>
    )
}
