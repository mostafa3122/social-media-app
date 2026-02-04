import { Avatar, Button, Card, Label, Spinner, TextInput } from 'flowbite-react'
import React from 'react'
import ValidationError from '../shared/ValidationError/ValidationError'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function AddComment({ id }) {
    let queryClient = useQueryClient()
    let { register, handleSubmit, formState: { errors, isSubmitting, isValid }, reset } = useForm()
    async function AddComment(values) {
        return await axios.post(`${import.meta.env.VITE_BASE_URL}comments`, { ...values, post: id }, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
    }
    let { mutate: handleAddComment, isPending } = useMutation({
        mutationFn: AddComment,
        onSuccess: () => {
            toast.success("Comment added successfully 🎉");
            queryClient.invalidateQueries({
                queryKey: ["posts"]
            })
            reset()
        },
        onError: () => {
            toast.error("Comment added failed ❌");

        }

    })
    return (
        <>
            <Card >
                <form onSubmit={handleSubmit(handleAddComment)} className="flex flex-col gap-4">

                    <div className="flex items-center  gap-2">
                        <Avatar className="cursor-pointer" alt="User settings" img={"https://linked-posts.routemisr.com/uploads/default-profile.png"} rounded />
                        <TextInput id='content' type="text" placeholder=" Comment" className="grow-1" {...register("content", { required: "You must write any post" })} shadow />
                    </div>
                    <ValidationError error={errors.body} />
                    <Button disabled={!isValid || isSubmitting} type="submit" className="cursor-pointer">
                        {
                            isPending && <Spinner className="me-2" aria-label="loading" size="sm" light />
                        }
                        Add Comment</Button>
                </form>
            </Card>
        </>
    )
}
