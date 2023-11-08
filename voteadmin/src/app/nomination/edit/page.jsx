import NominationForm from "@/features/nomination/ui/nomination-form";
import {fetchAllNominations} from "@/shared/api/nominations.api";

const EditNominations = async () => {
    const nominations = await fetchAllNominations()
    return (
        <>
            <h2 className={'font-bold text-lg mt-8 ml-2'}>Список номинаций</h2>

            <ul className={'flex flex-col gap-8 px-8 pt-4'}>

                {nominations.map(nomination => <NominationForm key={nomination._id} type={'update'} nomination={nomination}/>)}
            </ul>
        </>
    );
};

export default EditNominations;
