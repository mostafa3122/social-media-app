import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import Loading from '../Loading/Loading';


export default function PostsList() {
    useEffect(() => {
        getPosts()
    }, [])
    let { data, isLoading, error } = useQuery({
        queryKey: ["posts"],
        queryFn: getPosts,
        select: data => data.data
    })
    console.log("postsss", data);
    async function getPosts() {
        return await axios.get(`${import.meta.env.VITE_BASE_URL}posts?limit=50&sort=-createdAt`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
    }
    if (isLoading) {
        return (
            <Loading />
        )
    }
    return (
        <>
            <div className="flex flex-col gap-4">
                {
                    data?.posts?.map(post => (
                        <PostItem key={post._id} post={post} isHome={true} />
                    ))
                }
            </div>
        </>
    )
}

