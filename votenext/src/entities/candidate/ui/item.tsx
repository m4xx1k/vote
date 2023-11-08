import React from 'react';
import Image from 'next/image'
import UITitle from "@/shared/uikit/UITitle";
import {photo} from '@/shared/utils/candidate.utils'

const Item = ({data}) => {
    console.log(data)
    return (
        <li className={'bg-lightgray flex flex-col h-full gap-1 px-4 rounded-2xl'}>
            <div className={'flex items-center gap-4'}>
                {/*<div className={'rounded-full max-w-[48px] max-h-[48px]'}>*/}
                {/*    <Image src={photo(data.photo)} alt={data.ru.name} style={{objectFit: 'cover'}} width={48}*/}
                {/*           height={48} className={'rounded-full'}/>*/}
                {/*</div>*/}
                <UITitle className={'text-lg'} align={'start'}> {data.ru.name}
                </UITitle>
                <div className={'rounded-full flex items-center justify-center font-bold text-lg'}>

                    <span className={'w-12 text-center rounded mx-1 bg-[green] text-white'}>{data.for} </span>
                    <span className={'w-12 text-center rounded mx-1 bg-rose-600 text-white'}>{data.against}</span>
                    {data?.rating && Math.ceil(data.rating)}%
                </div>
            </div>
            <div className={'flex items-center gap-4 mt-2'}>
                {/*<div className={'rounded-full border-gray border-2 min-w-[48px] w-[48px] h-[48px] flex items-center justify-center font-bold text-lg'}>*/}
                {/*    {data?.rating && Math.ceil(data.rating)}%*/}
                {/*</div>*/}
                {/*<p className={' text-gray font-bold'}>*/}
                {/*    Министр занятости и сокращения бедности*/}
                {/*</p>*/}
            </div>
            {/*<p className={'flex self-end  max-w-[calc(100%-54px)] text-gray font-bold'}>*/}
            {/*    Министр занятости и сокращения бедности*/}
            {/*</p>*/}
        </li>
    );
};

export default Item;
