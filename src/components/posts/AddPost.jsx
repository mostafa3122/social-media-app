import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Avatar, Button, Card, Label, Spinner, TextInput } from "flowbite-react";
import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { SiAffinityphoto } from "react-icons/si";
import { UserContext } from "../context/UserContext/UserContext";
import ValidationError from "../shared/ValidationError/ValidationError";
function AddPost() {
    let {userData} = useContext(UserContext);
    let { register, handleSubmit, reset, formState: { errors, isSubmitting, isValid } } = useForm()
    let queryClient = useQueryClient()
    let { mutate: handleAddPost, isPending } = useMutation({
        mutationFn: Add,
        onSuccess: () => {
            toast.success("Post created successfully 🎉");
            queryClient.invalidateQueries({
                queryKey: ["posts"]
            })
            queryClient.invalidateQueries({
                queryKey: ["user", userData?._id]
            })
            reset()
        },
        onError: () => {
            toast.error("Post created failed ❌");

        }


    })
    async function Add(values) {
        let formData = new FormData()
        formData.append("body", values.body)
        if (values.image[0]) {

            formData.append("image", values.image[0])
        }
        console.log("posts", values);

        return await axios.post(`${import.meta.env.VITE_BASE_URL}posts`, formData, {
            headers: {
                token: localStorage.getItem("token")
            }
        })

    }
    return (
        <>
            <Card >
                <form onSubmit={handleSubmit(handleAddPost)} className="flex flex-col gap-4">
                    <div className="mb-2 block">
                        <Label htmlFor="comment">Post something</Label>
                    </div>
                    <div className="flex   items-center  gap-2">
                        <Avatar className="cursor-pointer" alt="User settings" img={"https://linked-posts.routemisr.com/uploads/default-profile.png"} rounded />
                        <TextInput type="text" placeholder=" Post something" className="grow-1" {...register("body", { required: "You must write any post" })} shadow />
                        <label htmlFor="file">
                            <SiAffinityphoto className="text-3xl cursor-pointer " /></label>
                        <input type="file" id="file" hidden {...register("image")} />
                    </div>
                    <ValidationError error={errors.body} />
                    <Button disabled={!isValid || isPending} type="submit" className="cursor-pointer">
                        {
                            isPending && <Spinner className="me-2" aria-label="loading" size="sm" light />
                        }
                        Add Post</Button>
                </form>
            </Card>
        </>
    )
}

export default AddPost
