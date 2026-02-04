import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import PostItem from './PostItem';
import Loading from '../Loading/Loading';
import { UserContext } from '../context/UserContext/UserContext';


export default function PostsList({ isProfile }) {
    let { userData } = useContext(UserContext)
    const [post, setPost] = useState([]);
    useEffect(() => {
        getPosts()
    }, [])
    let { data, isLoading, error } = useQuery({
        queryKey: isProfile ? ["user", userData?._id] : ["posts"],
        queryFn: getPosts,
        select: data => data.data
    })
    console.log("postsss", data);
    async function getPosts() {

        let apiUrl = isProfile ?
            `${import.meta.env.VITE_BASE_URL}users/${userData?._id}/posts`
            :
            `${import.meta.env.VITE_BASE_URL}posts?limit=50&sort=-createdAt`


        return await axios.get(apiUrl, {
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

