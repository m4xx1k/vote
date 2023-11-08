import React from 'react';
import UITitle from "@/shared/uikit/UITitle";
import {fetchAllNominations} from '@/shared/api/nomination.api'
import UILink from "@/shared/uikit/UILink";

const Page = async () => {
    const nominations = await fetchAllNominations()
    return (
        <div className={'flex flex-col grow'}>
            <UITitle align={'center'} color={'black'} className={'text-2xl my-8'}>Номинации</UITitle>
            <ul className={'flex flex-col grow gap-2 w-[90%] h-full self-center'}>
                {
                    nominations.map(nomination => (
                        <li className={'flex w-full'} key={nomination._id}>
                            <UILink className={'w-full text-center font-regular'} to={`/nominations/${nomination._id}`}
                                    variant={'green'}>{nomination.ru.name}</UILink>
                        </li>

                    ))
                }
            </ul>

        </div>
    );
};

export default Page;
