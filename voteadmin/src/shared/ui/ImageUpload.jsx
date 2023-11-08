'use client'
import {Controller} from "react-hook-form";
import {useRef, useState} from "react";
import Image from "next/image";

const initialImage = (type, imageValue) => {
    return {
        create: imageValue, update: imageValue?.startsWith('http') ? imageValue : `${NEXT_PUBLIC_API}${imageValue}`
    }[type]
}
const NEXT_PUBLIC_API = process.env.NEXT_PUBLIC_API
const FileUpload = ({control, getValues, type, dirtyFields}) => {
    const inputRef = useRef()
    const imageValue = getValues('photo')

    const [imageUrl, setImageUrl] = useState(dirtyFields['photo'] ? imageValue : initialImage(type, imageValue))
    const selectImage = (event, onChange) => {
        onChange(event.target.files[0]);
        const url = URL.createObjectURL(event.target.files[0])
        setImageUrl(url)
    }
    const fileInputClick = () => inputRef.current.click()
    const resetImage = () => setImageUrl(null)
    return (
        <>

            {imageUrl ?
                <div className={'flex flex-col items-start'}>

                    <Image src={imageUrl} height={128} width={128} alt={'image'}
                           className={'max-w-[128px] max-h-[128px] object-cover rounded'}/>
                    <button onClick={resetImage} className={'py-2 rounded underline'}>Удалить фото</button>

                </div>
                :
                <>
                    <Controller
                        control={control}
                        name={"photo"}
                        rules={{required: "photo is required"}}
                        render={({field: {value, onChange, ...field}}) => {
                            return (
                                <input
                                    {...field}
                                    onChange={e => selectImage(e, onChange)}
                                    type="file"
                                    id="picture"
                                    ref={inputRef}
                                    className={'hidden'}
                                />
                            );
                        }}
                    />
                    <button
                        type={'button'}
                        className={'h-32 w-32 bg-blue-600  border-2 border-dashed rounded border-white flex items-center justify-center leading-none text-white text-[100px]'}
                        onClick={fileInputClick}>+
                    </button>
                </>

            }

        </>
    );
};

export default FileUpload;
