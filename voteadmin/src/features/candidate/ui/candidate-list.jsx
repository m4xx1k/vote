import React from 'react';
import {fetchCandidatesNames} from "@/shared/api/candidates.api";
import CandidateItem from "@/features/candidate/ui/candidate-item";

const CandidateList = async ({id}) => {
    const candidates = await fetchCandidatesNames(id)
    return (
            <ul className={'flex flex-col gap-2'}>
                {candidates.map(candidate => (
                    <CandidateItem candidate={candidate} key={candidate._id}/>
                ))}
            </ul>

    );
};

export default CandidateList;
