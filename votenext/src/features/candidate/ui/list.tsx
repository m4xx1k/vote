import React from 'react';
import {fetchCandidatesByNomination} from "@/shared/api/candidates.api";
import Item from "@/entities/candidate/ui/item";

const List = async ({id}) => {
    const candidates = await fetchCandidatesByNomination(id)
    return (
        <ul className={'flex flex-col grow gap-2 max-w-[90%] mx-auto'}>
            {candidates.map(candidate => <Item key={candidate._id} data={candidate}/>)}
        </ul>
    );
};

export default List;
