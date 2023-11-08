import {fetchAllNominations} from "@/shared/api/nominations.api";
import NominationForm from "@/features/nomination/ui/nomination-form";
import Link from "next/link";

const NominationsList = async () => {
    const nominations = await fetchAllNominations()
    return (
        <>
            <h2 className={'font-bold text-lg mt-8 ml-2'}>Виберете номинацию</h2>

            <ul className={'flex flex-col gap-8 px-8 pt-4'}>

                {nominations.map(nomination => <Link href={`/candidate/list/${nomination._id}`}
                                                     key={nomination._id}>{nomination.ru.name}</Link>)}
            </ul>
        </>
    );
};

export default NominationsList;
