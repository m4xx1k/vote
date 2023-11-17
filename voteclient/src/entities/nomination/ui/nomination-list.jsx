'use client'
import {fetchAllNominations} from "../../../shared/api/nomination.api";
import useSWR from "swr";
import Link from "next/link";

const NominationList = ({lang}) => {
    const {data:nominations, isLoading,error}= useSWR('nominations',fetchAllNominations)
    console.log({data:nominations, isLoading,error})
    if(!nominations || isLoading || error) return 'opaaa'
    return (
        <div className="category__items">
            {
                nominations.map(nomination => (
                    <Link key={nomination._id} href={`/${lang}/nominations/${nomination._id}?nomination=${nomination[lang].name.replaceAll(' ','_')}`}
                          className="category__item">
                        <p>{nomination[lang].name}</p>
                        {/*<p>{JSON.stringify({lang, nomination})}</p>*/}
                    </Link>


                ))
            }

        </div>
    );
};

export default NominationList;
