import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Label, Radio, Spinner, TextInput } from "flowbite-react";
import React from 'react';
import { useForm } from "react-hook-form";
import * as z from "zod";
import ValidationError from "../../../components/shared/ValidationError/ValidationError";
import axios from "axios";
import { HiInformationCircle } from "react-icons/hi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  name: z.string().min(3, "Name must be  at least 3 char"),
  email: z.string().email("Invalid email"),
  password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, " Password must be at least 8 char , at least one uppercase letter , one number , one special char "),
  rePassword: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "  Password must be at least 8 char , at least one uppercase letter , one number , one special char "),
  dateOfBirth: z.string().refine((value) => {
    let date = new Date(value);
    let today = new Date();
    return date < today
    // let age = today.getFullYear() - date.getFullYear();
    // if (age < 18) {
    //   return false;
    // }
    // return true;
  }, "Inalid date"),
  gender: z.enum(["male", "female"], "Gender is required")
}).refine((data) => {
  return data.password === data.rePassword
}, {
  message: "Password not match",
  path: ["rePassword"]
})
const defultValues = {
  name: '',
  email: "",
  password: "",
  rePassword: "",
  dateOfBirth: "",
  gender: ""
}

function Register() {
  let navigate = useNavigate()
  let [apiError, setApiError] = useState(null);
  let [success, setSuccess]=useState(null)
  let { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({
    defultValues,
    resolver: zodResolver(schema),
  });

  async function onsubmit(values) {
    console.log(values);
    try {
      let { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}users/signup`, values)
      console.log(data);
      setSuccess("User registered seccessfully")
      setApiError(null)
      setTimeout(() => {
        navigate('/login')
      }, 2000);
  
    } catch (error) {
      console.log(error);
      setSuccess(null)
      setApiError(error.response.data.error)
    }
  }
  return (
    <>
      <div className="max-w-lg py-12 mx-auto">
        <div className="dark:bg-gray-800 p-6 rounded-lg">
          <h2 className='text-center'>Register</h2>
          {apiError && <Alert color="failure" className="my-4" icon={HiInformationCircle}>
            <span className="font-medium"> {apiError} </span>
          </Alert>}
          {success && <Alert color="success" className="my-4" icon={HiInformationCircle}>
            <span className="font-medium"> {success} </span>
          </Alert>}

          <form onSubmit={handleSubmit(onsubmit)} className="flex  flex-col gap-4 ">

            {/* ***************************** Email ***************************** */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email">Your email</Label>
              </div>
              <TextInput id="email" type="email" placeholder="mostafa@gmail.com" shadow  {...register("email")} />
              {/* <p className="text-red-500">{errors?.email?.message}</p> */}
              <ValidationError error={errors.email} />
            </div>
            {/* ***************************** Name ***************************** */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name">Your Name</Label>
              </div>
              <TextInput id="name" type="text" placeholder="Mostafa" shadow  {...register("name")} />
              <ValidationError error={errors.name} />

            </div>
            {/* ***************************** Password ***************************** */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password">Your Password</Label>
              </div>
              <TextInput id="password" type="password" placeholder="****************" shadow  {...register("password")} />
              <ValidationError error={errors.password} />

            </div>
            {/* ***************************** Confirm Password ***************************** */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="rePassword">Confirm Password</Label>
              </div>
              <TextInput id="rePassword" type="password" placeholder="****************" shadow  {...register("rePassword")} />
              <ValidationError error={errors.rePassword} />

            </div>
            {/* ***************************** Date Of Birth  ***************************** */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="dateOfBirth"> Date Of Birth</Label>
              </div>
              <TextInput id="dateOfBirth" type="date" shadow  {...register("dateOfBirth")} />
              <ValidationError error={errors.dateOfBirth} />

            </div>
            {/* ***************************** Gender  ***************************** */}
            <div>
              <div className="flex max-w-md flex-col gap-4">
                <div className="mb-2 block">
                  <Label htmlFor="dateOfBirth"> Your Gender</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio id="male" value="male"   {...register("gender")} />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio id="female" value="female"  {...register("gender")} />
                  <Label htmlFor="female">Female</Label>
                </div>


              </div>
              <ValidationError error={errors.gender} />

            </div>
            {/* ***************************** Submit Button  ***************************** */}
            <Button className="cursor-pointer" disabled={!isValid} type="submit">{isSubmitting && <Spinner aria-label="Spinner button example" size="sm" light />} <span className="pl-3">Register</span>
            </Button>
          </form>
        </div>

      </div>

    </>
  )
}

export default Register
