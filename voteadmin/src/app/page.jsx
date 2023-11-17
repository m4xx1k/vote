import NominationsEdit from "../widgets/nomination/ui/nominations-edit";
import Link from "next/link";

const EditNominations = async () => {
    return (
        <>
            <div className={'flex gap-4 items-center mt-8 ml-2'}>
                <h2 className={'font-bold text-3xl '}>Список номинаций</h2>
                <Link
                    className={'inline-flex items-center h-10 px-2 py-1  text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800'}
                    href={`/nomination/new`}>Создать</Link> <Link
                    className={'inline-flex items-center h-10 px-2 py-1  text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800'}
                    href={`/nomination/order`}>Изменить Порядок</Link>
            </div>

            <NominationsEdit/>
        </>
    );
};

export default EditNominations;
