import React from 'react';
import CandidateList from "@/features/candidate/ui/candidate-list";
import Link from "next/link";

const Page = ({params: {id}}) => {
    return (
        <>
            <div className={'flex gap-4 items-center mt-8 ml-2'}>
                <h2 className={'font-bold text-2xl'}>Список кандидатов</h2>
                <Link
                    className={'inline-flex items-center h-10 px-2 py-1  text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800'}
                    href={`/candidate/new`}>Создать</Link>
            </div>
            <CandidateList id={id}/>

        </>
    );
};

export default Page;
