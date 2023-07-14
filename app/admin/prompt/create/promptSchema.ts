import { object, array, string, number, StringSchema } from "yup";

export default object().shape({
    prompt:object().shape({
            title: string()
              .ensure()
              .required("Title is required"),

              text: string()
              .ensure()
              .required("Text is required"),

              category:object().shape({
                value: string().required("Required Category"),
                label: string().required("Please select a Category")
              })
              .nullable(),

              
             
})
});
