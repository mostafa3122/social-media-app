import { Avatar, Button, Card, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useContext, useState } from 'react'
import { FaRegComment } from 'react-icons/fa6'
import { FiHeart } from 'react-icons/fi'
import { PiShareFatBold } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import AddComment from '../Comments/AddComment'
import Comments from '../Comments/Comments'
import DropDownMenue from '../shared/ValidationError/DropDownMenue'
import { useForm } from 'react-hook-form'
import { SiAffinityphoto } from 'react-icons/si'
import ValidationError from '../shared/ValidationError/ValidationError'
import axios from "axios";
import { UserContext } from '../context/UserContext/UserContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export default function PostItem({ post, isHome }) {
    let { register, handleSubmit, reset, formState: { errors, isSubmitting, isValid } } = useForm()
    let { userData } = useContext(UserContext);
    let queryClient = useQueryClient()
    let [showCommentForm, setShowCommentForm] = useState(false);
    let [isEdit, setIsEdit] = useState(false);

    // Edit Post
    let { mutate: handleEditPost, isPending } = useMutation({
        mutationFn: editPost,
        onSuccess: () => {
            toast.success("Post edited successfully 🎉");
            queryClient.invalidateQueries({
                queryKey: ["posts"]
            })
            queryClient.invalidateQueries({
                queryKey: ["user", userData?._id]
            })
            setIsEdit(false)
            reset()
        },
        onError: () => {
            toast.error("Post edited failed ❌");

        }
    })
    async function editPost(values) {
        let formData = new FormData()
        formData.append("body", values.body)
        if (values.image[0]) {
            formData.append("image", values.image[0])
        }
        console.log("posts", values);
        return await axios.put(`${import.meta.env.VITE_BASE_URL}posts/${post._id}`, formData, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
    }
    // Delete Post

    async function deletePost() {

        return await axios.delete(`${import.meta.env.VITE_BASE_URL}posts/${post._id}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
    }
    let { mutate: handleDeletePost } = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            toast.success("Post deleted successfully 🎉");
            queryClient.invalidateQueries({
                queryKey: ["posts"]
            })
            queryClient.invalidateQueries({
                queryKey: ["user", userData?._id]
            })

        },
        onError: () => {
            toast.error("Post deleted failed ❌");

        }
    })
    return (
        <>
            <Card >
                {/*  post header */}
                <header >
                    <div className="flex items-center justify-between">
                        <div className='flex items-center gap-2'>
                            <Avatar className="cursor-pointer" alt="User settings" img={post?.user?.photo} rounded />
                            <div>
                                <h2 className='text-lg m-0'>{post?.user?.name}</h2>
                                <span>{new Date(post?.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                        {
                            post.user._id === userData?._id &&
                            <DropDownMenue onEdit={() => { setIsEdit(true) }} onDelete={handleDeletePost} />
                        }
                    </div>
                </header>
                {/* post body */}
                {
                    isEdit ?
                        <form onSubmit={handleSubmit(handleEditPost)} className="flex flex-col gap-4 shadow-xl shadow-zinc-300 p-3 rounded-2xl" >

                            <div className="flex   items-center  gap-2">
                                <Avatar className="cursor-pointer" alt="User settings" img={"https://linked-posts.routemisr.com/uploads/default-profile.png"} rounded />
                                <TextInput type="text" defaultValue={post?.body} placeholder="Edit Your Post" className="grow-1" {...register("body", { required: "You must write any post" })} shadow />
                                <label htmlFor="file">
                                    <SiAffinityphoto className="text-3xl cursor-pointer " /></label>
                                <input type="file" id="file" hidden {...register("image")} />
                            </div>
                            <ValidationError error={errors.body} />
                            <Button disabled={!isValid || isPending} type="submit" className="cursor-pointer">
                                {
                                    isPending && <Spinner className="me-2" aria-label="loading" size="sm" light />
                                }
                                Edit Post</Button>
                        </form>
                        :
                        <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {post?.body}
                        </h3>
                }
                <img src={post?.image} alt={post?.name} />
                {/* footer */}
                <div className="comment-icons dark:border-b-zinc-50 border-b-1 border-b-black pb-2 flex justify-between items-center ">
                    <FiHeart size={24} className='  cursor-pointer' />
                    <div onClick={() => setShowCommentForm(prev => !prev)} className='flex gap-2 items-center cursor-pointer'>
                        <span>
                            {post?.comments?.length}
                        </span>
                        <FaRegComment size={24} />
                    </div>
                    <Link to={`/post-details/${post?.id}`}>
                        <PiShareFatBold size={24} className='cursor-pointer' />
                    </Link>
                </div>
                {showCommentForm && <AddComment id={post?.id} />}

                {/* comments */}
                <div className="mt-4">
                    {post?.comments && post?.comments.length > 0 &&
                        (isHome
                            ? <Comments comment={post?.comments?.[post.comments.length - 1]} />
                            : post.comments.map(comment => (
                                <Comments key={comment._id} comment={comment} />
                            ))
                        )
                    }
                </div>
            </Card>
        </>
    )
}
