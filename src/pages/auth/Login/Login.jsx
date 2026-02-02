import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Label, Radio, Spinner, TextInput } from "flowbite-react";
import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import * as z from "zod";
import ValidationError from "../../../components/shared/ValidationError/ValidationError";
import axios from "axios";
import { HiInformationCircle } from "react-icons/hi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../components/context/UserContext/UserContext";

const schema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        " Password must be at least 8 char , at least one uppercase letter , one number , one special char "),

})
const defultValues = {

    email: "",
    password: "",

}


function Login() {
    const {token , setToken}=useContext(UserContext)
    console.log(token);
    let navigate = useNavigate()
    let [apiError, setApiError] = useState(null);
    let [success, setSuccess] = useState(null)
    let { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({
        defultValues,
        resolver: zodResolver(schema),
    });

    async function onsubmit(values) {
        console.log(values);
        try {
            let { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}users/signin`, values)
            console.log(data);
            setSuccess("User logged in seccessfully")
            setApiError(null)
            
            setTimeout(() => {
                localStorage.setItem("token" , data.token)
                setToken(data.token)
                navigate('/home')
            }, 1500);

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
                    <h2 className='text-center'>Login</h2>
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

                        {/* ***************************** Password ***************************** */}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password">Your Password</Label>
                            </div>
                            <TextInput id="password" type="password" placeholder="****************" shadow  {...register("password")} />
                            <ValidationError error={errors.password} />

                        </div>

                        {/* ***************************** Submit Button  ***************************** */}
                        <Button className="cursor-pointer" disabled={!isValid} type="submit">{isSubmitting && <Spinner aria-label="Spinner button example" size="sm" light />} <span className="pl-3">Login</span>
                        </Button>
                    </form>
                </div>

            </div>
        </>
    )
}

export default Login
