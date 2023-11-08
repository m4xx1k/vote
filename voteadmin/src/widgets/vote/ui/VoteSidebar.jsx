import React from 'react';
import CandidateForm from "@/features/candidate/ui/candidate-form";
import NominationForm from "@/features/nomination/ui/nomination-form";

const VoteSidebar = () => {
    return (
        <aside className={'flex flex-col w-fit py-4 px-2 items-center gap-4 border-r-2 border-gray'}>
            <section>
                <h3 className={'font-bold text-lg'}>Номинации</h3>
            </section>
            <NominationForm/>
            <CandidateForm/>
        </aside>
    );
};

export default VoteSidebar;
