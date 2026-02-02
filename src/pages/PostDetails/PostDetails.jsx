import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom'
import PostItem from '../../components/posts/PostItem';
import { Spinner } from 'flowbite-react';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';

export default function PostDetails() {
    let { id: post_id } = useParams()
    console.log("id", post_id);
    let { data, isLoading, error } = useQuery({
        queryKey: ["post", post_id],
        queryFn: getPosts,
        select: data => data.data.post,
        onSuccess: data => console.log("successss", data),
        onError: error => console.log(error),

    })
    console.log("post_id pd", post_id);

    async function getPosts() {
        return await axios.get(`${import.meta.env.VITE_BASE_URL}posts/${post_id}`, {
            headers: {
                token: localStorage.getItem("token")
            }

        })
        
    }
    if (isLoading) {
        return (
            <section className='max-w-xl mx-auto py-12'  >
                <div className='flex flex-col gap-4'>
                <Loading/>
                </div>
            </section>
        )
    }
    if (error) {
        console.log("QUERY ERROR:", error.response?.data || error.message);
        return <p>Error loading post</p>;
      }
      
    console.log("FINAL DATA:", data);
    console.log("POST SENT TO ITEM:", data);
    return (

        <section className='max-w-xl mx-auto py-12'  >
            <div className='flex flex-col gap-4'>
                <PostItem post={data} isHome={false} />
            </div>
        </section>
    )
}
