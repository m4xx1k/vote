'use client'
import TextField from '@/shared/ui/TextField'
import {useForm} from "react-hook-form";
import {createNomination, deleteNomination, updateNomination} from "@/shared/api/nominations.api";
import {useSWRConfig} from "swr";

const required = 'обязательное поле'
const NominationForm = ({type = 'create', nomination}) => {
    const {mutate} = useSWRConfig()
    const {register, formState: {errors}, handleSubmit} = useForm({defaultValues: nomination ?? {}})


    const onSubmit = async data => {
        let result
        if (type === 'create') {
            result = await createNomination(data)
        }
        if (type === 'update') {
            console.log({data})
            result = await updateNomination(data)
        }
        await mutate('nominations')
        console.log({result})
    }
    const remove = async () => {
        await Promise.all([mutate('nominations'), deleteNomination(nomination._id)])
    }
    return (
        <>
            {type === 'create' && <h1 className={'font-bold text-lg text-center my-4'}>Создать номинацию</h1>}
            <form onSubmit={handleSubmit(onSubmit)} action="voteadmin/src/features/vote/ui#">
                <TextField inputProps={{...register('ru.name', {required})}} error={errors?.ru?.name}
                           label='Название на русском'
                           type='text' placeholder='...'/>
                <TextField inputProps={{...register('uz.name', {required})}} error={errors?.uz?.name}
                           label='Название на узбекском'
                           type='text' placeholder='...'/>

                <div className={'flex items-center gap-4'}>
                    <button type="submit"
                            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                        {{
                            create: 'Добавить', update: "Изменить"
                        }[type]}
                    </button>
                    {
                        type === 'update' &&
                        <button onClick={remove} type={'button'}
                                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800">
                            Удалить
                        </button>
                    }
                </div>


            </form>
        </>

    )
}

export default NominationForm;
