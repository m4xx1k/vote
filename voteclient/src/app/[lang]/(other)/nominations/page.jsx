import Image from "next/image";
import NominationList from "../../../../entities/nomination/ui/nomination-list";

const Page =  ({params: {lang}}) => {
    return (

            <main className="page">

                <section className="category">
                    <div className="category__container">
                        <div className="category__body">
                            <h1 className="category__title title">Категории</h1>
                            <NominationList lang={lang}/>
                            <div className="category__banner">
                                <div className="category__banner-text">Голосуя за определенного кандидата вы сможете
                                    дать оценку его работе, показать удовлетворенность его деятельностью на своем посту!
                                </div>
                                <div className="category__banner-img">
                                    <Image src="" alt=""/>

                                </div>
                                <div className="category__banner-bg">
                                    <Image src="" alt=""/>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

    );
};

export default Page;
