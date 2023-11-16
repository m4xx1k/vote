'use client'
import {fetchAllNominations} from "../../../shared/api/nominations.api";
import useSWR from "swr";
import NominationForm from "../../../features/nomination/ui/nomination-form";

const NominationsEdit = () => {
    const {data: nominations, isLoading, error} = useSWR('nominations', fetchAllNominations)
    if (!nominations || isLoading || error) return '...'
    return (
        <ul className={'flex flex-col gap-8 px-8 pt-4'}>

            {nominations.map(nomination => <NominationForm key={nomination._id} type={'update'}
                                                           nomination={nomination}/>)}
        </ul>
    );
};

export default NominationsEdit;
