import React from 'react';
import CandidateForm from "@/features/candidate/ui/candidate-form";
import {fetchOneCandidate} from "@/shared/api/candidates.api";

const Page = async ({params:{id}}) => {
    const candidate = await fetchOneCandidate(id)
    return (
        <>
            <h2 className={'font-bold text-2xl py-2'}>Изменить кандидата</h2>

            <CandidateForm type={'update'} candidate={candidate}/>

        </>
    );
};

export default Page;
