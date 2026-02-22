import { Avatar, Button, Spinner, TextInput } from 'flowbite-react'
import React, { useContext, useState } from 'react'
import ValidationError from '../shared/ValidationError/ValidationError';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import DropDownMenue from '../shared/DropDownMenue';
import { UserContext } from '../context/UserContext/UserContext';
import axios from 'axios';
function Comments({ comment, post }) {
    console.log(comment);
    let [isEdit, setIsEdit] = useState(false);
    let { userData } = useContext(UserContext);
    let queryClient = useQueryClient()
    let { register, handleSubmit, formState: { errors, isSubmitting, isValid }, reset } = useForm()
    // edit comment
    let { mutate: handleEditComment, isPending } = useMutation({
        mutationFn: editComment,
        onSuccess: () => {
            toast.success("Comment edited successfully 🎉");
            queryClient.invalidateQueries(["posts"])
            setIsEdit(false)
        },
        onError: () => {
            toast.error("Comment edited failed ❌");
        }
    })
    function editComment(values) {
        return axios.put(`${import.meta.env.VITE_BASE_URL}comments/${comment._id}`, values, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
    }
    // delete comment 
    // function deleteComment() {
    //     return axios.delete(`${import.meta.env.VITE_BASE_URL}comments/${comment._id}`, {
    //         headers: {
    //             token: localStorage.getItem("token")
    //         }
    //     })
    // }
    // let { mutate: handleDeleteComment } = useMutation({
    //     mutationFn: deleteComment,
    //     onSuccess: () => {
    //         toast.success("Comment deleted successfully 🗑️");
    //         queryClient.invalidateQueries({
    //             queryKey: ["posts"]
    //         })
    //         queryClient.invalidateQueries({
    //             queryKey: ["user", userData?._id]
    //         })
    //     },
    //     onError: () => {
    //         toast.error("Comment deleted failed ❌");

    //     }
    // })
    function deleteComment() {
        return axios.delete(`${import.meta.env.VITE_BASE_URL}comments/${comment._id}`, {
          headers: {
            // token: localStorage.getItem("token")
            token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhiMmNkMDYyMjIwNGRhNTE1YjgyOWE5IiwiaWF0IjoxNzcwMjg2NDM1fQ.Ek6ofj0wvTACu8xy9fM5dL7IKwb2AWBwEC0EQm4u3tY"
        ,
        
        }
        })
      }
      let {mutate:handleDeleteComment}=useMutation({
        mutationFn:deleteComment,
        onSuccess:()=>{
          toast.success("Comment deleted successfully");
          queryClient.invalidateQueries(["posts"])
        },
        onError:()=>{
          toast.error("Comment deleted failed");
        }
      })
    // function deleteComment(commentId) {
    //     return axios.delete(
    //         `${import.meta.env.VITE_BASE_URL}comments/${commentId}`,
    //         {
    //             headers: {
    //                 token: localStorage.getItem("token"),
    //             },
    //         }
    //     );
    // }
    // const { mutate: handleDeleteComment, isPending: isDeleting } = useMutation({
    //     mutationFn: deleteComment,
    //     onSuccess: () => {
    //         toast.success("Comment deleted successfully 🗑️");
    //         queryClient.invalidateQueries({ queryKey: ["posts"] });
    //         queryClient.invalidateQueries({ queryKey: ["user", userData?._id] });
    //     },
    //     onError: (error) => {
    //         toast.error(error?.response?.data?.message || "Delete failed ❌");
    //     }
    // });
    console.log("Logged user:", userData?._id);
    console.log("Comment creator:", comment?.commentCreator?._id);
    console.log("Post owner:", post?.user?._id);
    return (
        <section>
            <header >
                <div className='flex justify-between items-center'>
                    <div className='  flex items-center  pt-2  gap-2'>
                        <Avatar className="cursor-pointer"
                            alt="User settings"
                            img={!comment?.commentCreator?.photo.includes("undefined") ?
                                comment?.commentCreator?.photo :
                                "https://linked-posts.routemisr.com/uploads/default-profile.png"} rounded />
                        <div>
                            <h2 className='text-lg m-0'>{comment?.commentCreator?.name}</h2>
                            <span className='m-0'>{new Date(comment?.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                    {userData?._id === comment?.commentCreator?._id && (
                        <DropDownMenue
                            onEdit={() => setIsEdit(true)}
                            onDelete={() => handleDeleteComment(comment._id)}
                        />
                    )}
                </div>
            </header>
            {/*  body */}
            {isEdit ?
                <form onSubmit={handleSubmit(handleEditComment)} className="flex flex-col gap-4">
                    <div className="flex items-center  gap-2">
                        <TextInput id='content' defaultValue={comment?.content} type="text" placeholder=" Comment" className="grow-1" {...register("content", { required: "You must write any comment" })} shadow />
                    </div>
                    <ValidationError error={errors.content} />
                    <div className="flex items-center gap-2  ">

                        <Button disabled={!isValid || isPending} type="submit" className="cursor-pointer">
                            {
                                isPending && <Spinner className="me-2" aria-label="loading" size="sm" light />
                            }
                            Edit Comment</Button>
                        <Button color={"red"} type='button' onClick={() => setIsEdit(false)}>Cancel</Button>
                    </div>
                </form>
                :
                <h3 className="ps-12 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {comment?.content}
                </h3>}

        </section>
    )
}

export default Comments
