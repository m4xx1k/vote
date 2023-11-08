'use client'
const defaultClassName = "bg-gray-100 border border-primary-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 focus:border-2 block w-full p-2.5"

const TextField = ({label, className, error, inputProps}) => {
    return (
        <div className="w-full min-w-[320px]">
            {label && <label htmlFor="brand"
                    className="block mb-2 text-sm font-medium text-gray-900">{label}</label>}
            <input {...inputProps} className={className ? defaultClassName + className : defaultClassName}
                   placeholder="Введите значение..."/>
            {error && <span className={'text-rose-600 text-sm italic underline'}>{error.message}</span>}
        </div>
    )
}

export default TextField
