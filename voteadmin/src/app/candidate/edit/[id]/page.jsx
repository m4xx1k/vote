import React from 'react';
import CandidateForm from "@/features/candidate/ui/candidate-form";
import {fetchOneCandidate} from "@/shared/api/candidates.api";

const Page = async ({params: {id}}) => {
    const candidate = await fetchOneCandidate(id)
    return (
        <>
            <h2 className={'font-bold text-2xl py-2'}>Изменить кандидата</h2>
            <div  className={'flex items-center gap-4 text-lg font-bold bg-blue-200 w-fit py-1 px-3 rounded'}>
                Количество голосов -
                <div className={'flex gap-2'}>
                    <div className={'underline text-green-500 font-semibold'}>За:</div>
                    <div className={''}>{candidate.for.count}</div>
                </div>
                <div className={'flex gap-2'}>
                    <div className={'underline text-rose-500 font-semibold'}>Против:</div>
                    <div className={''}>{candidate.against.count}</div>
                </div>
            </div>
            <CandidateForm type={'update'} candidate={candidate}/>


        </>
    );
};

export default Page;
