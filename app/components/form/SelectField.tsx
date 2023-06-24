"use client";
import Select from 'react-select';
import React from 'react';
import { clsx } from 'clsx';
import { valueContainerCSS } from 'react-select/dist/declarations/src/components/containers';

interface SelectProps{
  defaultValueArray:Array<Object>,
  placeholder:string,
  isMulti? :boolean,
  isClearable?:boolean,
  isSearchable?:boolean,
  options:Array<Object>,
  onChange:(options:any, action:any)=>void,
  onBlur?:(e:any)=>void
}

const containerStyle = "flex flex-col gap-4 w-full bg-white dark:bg-form-input";
const controlStyles="z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input";
const valueContainerStyle="text-black dark:text-white";
const placeholderStyle="text-center text-black dark:text-white logo-font-color1";
const singleValueStyle="text-black dark:text-white";


const selectInputStyles = "relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input";
const menuStyles = "p-1 mt-2 border";
const menuListStyle="dark:border-form-strokedark dark:bg-form-input";
const optionStyle="dark:bg-form-input";

const SelectField = (props:SelectProps) => {
  
  return (
    <>
      <Select
      classNames={{
        /*
        control: ({ isFocused }) =>
          clsx(
            controlStyles,
            isFocused ? "logo-font-color1" : "border-gray-300",
          ),
          */
         control:()=>controlStyles,
          input: () => singleValueStyle,
          menu: () => menuStyles,
          container:()=>containerStyle,
          valueContainer:()=>valueContainerStyle,
          placeholder:()=>placeholderStyle,
          singleValue:()=>singleValueStyle,
          menuList:()=>menuListStyle,
          option:()=>optionStyle
         

      }}
      defaultValue={props.defaultValueArray}
      placeholder={props.placeholder||"Type to search"}      
      isMulti={props.isMulti || false}
      isClearable={props.isClearable || false}
      isSearchable={props.isSearchable || false}
        /*name={props.name}
        /*value={field.value}*/ 
        /*       
        value={state?.value} 
        */
        onChange={props.onChange}
        options={props.options}
        onBlur={() =>{} }
      />
     {/*  <ErrorMessage name={name} /> */}
    </>
  );

};



export default SelectField;