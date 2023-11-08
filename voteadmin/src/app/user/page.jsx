'use client'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import {useForm, Controller} from "react-hook-form";
import {DateRangePicker} from 'react-date-range';
import {fetchUsersInRange} from "@/shared/api/users.api";

const Page = () => {
    const {register, control, handleSubmit} = useForm({
        defaultValues: {
            date: [{
                startDate: new Date(),
                endDate: new Date(),
                key: "selection"
            }]
        }
    })
    const handleChangeDate = (data, onChange) => {
        onChange([data.selection])
        console.log(data.selection)
    }
    const onSubmit = async data => {
        const result = await fetchUsersInRange(data.date[0])
        console.log(result)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller control={control} name={'date'}
                        render={({field}) => (
                            <DateRangePicker ranges={field.value}
                                             onChange={data => handleChangeDate(data, field.onChange)}/>

                        )}>

            </Controller>
            <button type={'submit'}>find</button>
        </form>
    );
};

export default Page;
