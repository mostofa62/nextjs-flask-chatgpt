"use client";
import React from 'react';
import {useField} from 'formik';

const TextArea = ({className,...props}:any)=>{
    const [field, meta] = useField(props);
    return(
        <>
            <textarea className={className} {...field} {...props} />

        </>
    )

}

export default TextArea;