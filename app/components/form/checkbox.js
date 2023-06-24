//import React from "react";
const Checkbox = ({ 
  field, 
  type, 
  checked, 
  label, 
  value, 
  inputClassName,
  labelClassName,
  onChange 
}) => {
  return (
    <>
      <input className={inputClassName} {...field} type={type} checked={checked} onChange={onChange} />
<label className={labelClassName}>
      {label}
    </label>
    </>
  );
};

export default Checkbox;
