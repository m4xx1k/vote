'use client'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import {useForm, Controller} from "react-hook-form";
import {DateRangePicker} from 'react-date-range';
import {fetchUsersInRange} from "@/shared/api/users.api";
import useSWR from "swr";
import * as rdrLocales from 'react-date-range/dist/locale';

const Page = () => {
    const {control, handleSubmit, getValues} = useForm({
        defaultValues: {
            date: [{
                startDate: new Date(),
                endDate: new Date(),
                key: "selection"
            }]
        }
    })
    const {data: users, isLoading, mutate, error} = useSWR('users', () => fetchUsersInRange(getValues('date')[0]))

    const handleChangeDate = (data, onChange) => {
        onChange([data.selection])
        console.log(data.selection)
    }
    const onSubmit = async () => {
        await mutate()
        console.log(users)
    }
    console.log({users, isLoading, error})
    return (
        <div className={'flex'}>
            <div>
                <h2 className={'text-bold text-xl'}>Вьіберете промежуток</h2>
                <form className={'sticky flex flex-col'} onSubmit={handleSubmit(onSubmit)}>
                    <Controller control={control} name={'date'}
                                render={({field}) => (
                                    <DateRangePicker locale={rdrLocales.ru} ranges={field.value}
                                                     onChange={data => handleChangeDate(data, field.onChange)}/>

                                )}>

                    </Controller>
                    <button className={'w-fit mt-[-80px] ml-2 bg-blue-600 text-white rounded px-8 py-4 text-xl'}
                            type={'submit'}>
                        Найти
                    </button>
                </form>

            </div>
            <div className={'w-full'}>
                <h2 className={'text-bold text-xl'}>Найдено {users?.length} пользователей</h2>

                <ul className={'w-full flex flex-col gap-2 overflow-y-scroll h-[calc(100vh-120px)] overflow-x-hidden px-4'}>
                    {(users || []).map(user => <li className={'bg-gray-100 w-full p-4 mx-1'} key={user._id}>
                    <div className={'flex items-center gap-2'}>
                        <div className={'w-64'}>
                            Telegram ID: <span className={'text-lg text-blue-400'}>{user.tg_id}</span>
                        </div>
                        <div className={'w-64'}>
                            IP: <span className={'text-lg text-blue-400'}>{user.ip}</span>
                        </div>

                    </div>
                        <div className={'flex items-center gap-2'}>
                        <div className={'w-64'}>
                            Телефон: <span className={'text-lg text-blue-400'}>{user.phone}</span>
                        </div><div className={'w-64'}>
                            Username: <span className={'text-lg text-blue-400'}>{user.username}</span>
                        </div>
                    </div>

                    </li>)}
                </ul>
            </div>

        </div>

    );
};

export default Page;
