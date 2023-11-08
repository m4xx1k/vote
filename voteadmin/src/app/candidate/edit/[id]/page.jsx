import React from 'react';
import CandidateForm from "@/features/candidate/ui/candidate-form";
import {fetchOneCandidate} from "@/shared/api/candidates.api";

const Page = async ({params:{id}}) => {
    const candidate = await fetchOneCandidate(id)
    return (

        <CandidateForm type={'update'} candidate={candidate}/>
    );
};

export default Page;
