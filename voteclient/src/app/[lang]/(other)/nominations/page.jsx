import Image from "next/image";
import NominationList from "../../../../entities/nomination/ui/nomination-list";
import {getDictionary} from "../../../../shared/i18n/dictionary";
import Uz from '../../../../assets/img/category/uz.png'
import Rating from '../../../../assets/img/category/rate.png'
import {serverFetchAllNominations} from "../../../../shared/api/nomination.api";
import Link from "next/link";

const Page = async ({params: {lang}}) => {
    const {page: {nomination}} = await getDictionary(lang)
    const nominations = await serverFetchAllNominations()
    return (

        <main className="page">

            <section className="category">
                <div className="category__container">
                    <div className="category__body">
                        <h1 className="category__title title">{nomination.title}</h1>
                        <div className="category__items">
                            {
                                (Array.isArray(nominations) ? nominations : []).map(nomination => (
                                    <Link key={nomination._id}
                                          href={`/${lang}/nominations/${nomination._id}?nomination=${nomination[lang].name.replaceAll(' ', '_')}`}
                                          className="category__item">
                                        <p>{nomination[lang].name}</p>
                                        {/*<p>{JSON.stringify({lang, nomination})}</p>*/}
                                    </Link>


                                ))
                            }

                        </div>
                        <div className="category__banner">
                            <div className="category__banner-text">
                                {nomination.banner__text}
                            </div>
                            <div className="category__banner-img">
                                <Image src={Rating} width={152} alt=""/>

                            </div>
                            <div className="category__banner-bg">
                                <Image src={Uz} alt=""/>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main>

    );
};

export default Page;
