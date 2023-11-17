'use client'
import TextField from '@/shared/ui/TextField'
import Select from '@/shared/ui/Select'
import ImageUpload from "@/shared/ui/ImageUpload";
import {useForm} from "react-hook-form";
import useSWR from "swr";
import {fetchAllNominations} from "@/shared/api/nominations.api";
import {updateCandidate, createCandidate} from "@/shared/api/candidates.api";

const CandidateForm = ({type = 'create', candidate}) => {

    const {data: nominations, isLoading, error} = useSWR('nominations', fetchAllNominations)
    const {
        register,
        handleSubmit,
        control,
        getValues,
        formState: {errors, dirtyFields}
    } = useForm({defaultValues: candidate ?? {}})
    const onSubmit = async data => {
        let result;
        const formData = new FormData()
        formData.append('body', JSON.stringify(data))
        if (typeof data.photo !== 'string')
            formData.append('photo', data.photo)
        if (type === 'create') {
            result = await createCandidate(formData)
        }

        if (type === 'update') {
            result = await updateCandidate(data._id, formData)
        }
        console.log(type, result)
    }
    if (isLoading || error) return 'wait'
    return (
        <>
            {type === 'create' && <h1 className={'font-bold text-lg text-center my-4'}>Создать кандидата</h1>}

            <form onSubmit={handleSubmit(onSubmit)} action="voteadmin/src/features/vote/ui#">
                <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
                    <TextField inputProps={{...register('ru.name', {required: true})}} error={errors?.ru?.name}
                               label='Название на русском'
                               type='text' placeholder='...'/>
                    <TextField inputProps={{...register('uz.name', {required: true})}} error={errors?.uz?.name}
                               label='Название на узбекском'
                               type='text' placeholder='...'/>



                    <TextField inputProps={{...register('ru.description', {required: true, min: 0})}}
                               error={errors['ru.description']}
                               label='Описание кандидата на русском'
                               placeholder='...'/>

                    <TextField inputProps={{...register('uz.description', {required: true, min: 0})}}
                               error={errors['uz.description']}
                               label='Описание кандидата на узбекском'
                               placeholder='...'/>
                    <div></div>
                    <div>
                        <label htmlFor="category"
                               className="block mb-2 text-sm font-medium">Номинация</label>
                        <Select selectProps={{...register('nomination')}}
                                items={nominations.map(nomination => ({...nomination, name: nomination.ru.name}))}/>
                    </div>


                    <ImageUpload dirtyFields={dirtyFields} type={type} getValues={getValues} control={control}/>

                </div>
                <button type="submit"
                        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                    {{create:'Создать', update:'Сохранить'}[type]}
                </button>
            </form>

        </>

    )
}
const orderChange = (e, cb) => {
    const {value} = e.target
    if (!Number.isNaN(value) && value >= 0) cb(value)
}

export default CandidateForm;
