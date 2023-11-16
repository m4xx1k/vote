import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {photo} from "../../../../../shared/utils/candidate.utils";
import {fetchCandidatesByNomination} from "../../../../../shared/api/candidates.api";
const imgStyle = {width:94, height:94, minWidth:94, minHeight:94, maxWidth:94, maxHeight:94, objectFit:'cover', borderRadius:'50%'}
const Page = async ({params: {id, lang}}) => {
    const candidates = await fetchCandidatesByNomination(id)

    return (
        <>
            <main className="page">
                <section className="active-minister">
                    <div className="active-minister__container">
                        <div className="active-minister__body">
                            <h1 className="active-minister__title title">Самый активный министр</h1>
                            <div className="active-minister__items">
                                {candidates.map(candidate =>
                                    <Link key={candidate._id} href={`/${lang}/candidate/${candidate._id}`}
                                          className="active-minister__item item-active-minister">
                                        <div className="item-active-minister__ico">
                                            <Image style={imgStyle} src={photo(candidate.photo)} width={94} height={94} alt=""/>
                                        </div>
                                        <div className="item-active-minister__content">
                                            <div className="item-active-minister__name">{candidate[lang].name}</div>
                                            <div className="item-active-minister__text text">
                                                {candidate[lang].description}
                                            </div>
                                        </div>
                                    </Link>
                                )}


                            </div>
                        </div>
                    </div>
                </section>

            </main>


        </>
    );
};

export default Page;
