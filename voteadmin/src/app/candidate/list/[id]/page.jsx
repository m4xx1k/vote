import React from 'react';
import CandidateList from "@/features/candidate/ui/candidate-list";

const Page = ({params: {id}}) => {
    return (
        <CandidateList id={id}/>
    );
};

export default Page;
