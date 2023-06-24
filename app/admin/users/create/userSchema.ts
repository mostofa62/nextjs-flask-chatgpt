import { object, array, string, number, StringSchema } from "yup";
import axios from "axios";

const url = process.env.url;


export default object().shape({
    user:object().shape({
            name: string()
              .ensure()
              .required("Name is required"),

              email: string()
              .ensure()
              .email("Provide a Valid Email address")
              .required("Email is required")
              .test(
                'emal-backend-validation',  // Name
                'Email is already in use',               // Msg
                async (email) => {
                  // Res from backend will be flag at res.data.success, true for 
                  // username good, false otherwise
                  const { data: { success } } = await axios.post(
                    `${url}userbyemail`, 
                    { email: email }
                  );
        
                  return success
                }
              )
              ,

              password: string()
              /*.ensure()*/
              
              .when('$newentry', {
                is: (val:number)=>val && val > 0 ,
                //is :1,
                then: (schema) =>{
                  return schema.required("Password is required")
                }
              }),
              /*
              .when('newentry',(newentry, schema):any=>{
                
                  return  newentry. == 1 ?schema.required("Password is required"):schema;
                
                
              }),
              */
             
})
});
