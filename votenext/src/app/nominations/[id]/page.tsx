import React from 'react';
import {fetchCandidatesByNomination} from '@/shared/api/candidates.api'
import List from "@/features/candidate/ui/list";

const Page = async ({params: {id}}) => {

    return (
        <div>
            <List id={id}/>
        </div>
    );
};

export default Page;
