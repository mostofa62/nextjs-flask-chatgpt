import { object, array, string, number, StringSchema } from "yup";

export default object().shape({
    user:object().shape({
            
              email: string()
              .ensure()
              .email("Provide a Valid Email address")
              .required("Email is required"),

              password: string()
              .ensure()
              .required("Password is required")
              
             
})
});
