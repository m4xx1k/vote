'use client'
import React from 'react'

const defaultClassName = "bg-gray-100 border border-primary-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 focus:border-2 block w-full p-2.5"

const Input = ({className, ...rest}) => {
    return (
        <input className={className ? defaultClassName + className : defaultClassName}
               placeholder="Type product name" {...rest}/>)
}

export default Input
