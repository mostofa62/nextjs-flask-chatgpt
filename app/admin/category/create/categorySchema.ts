import { object, array, string, number, StringSchema } from "yup";

export default object().shape({
    category:object().shape({
            label: string()
              .ensure()
              .required("Label is required"),

              value: string()
              .ensure()
              .required("Value is required"),

              
             
})
});
