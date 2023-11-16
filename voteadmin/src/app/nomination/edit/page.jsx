import NominationsEdit from "../../../widgets/nomination/ui/nominations-edit";

const EditNominations = async () => {
    return (
        <>
            <h2 className={'font-bold text-lg mt-8 ml-2'}>Список номинаций</h2>

            <NominationsEdit/>
        </>
    );
};

export default EditNominations;
