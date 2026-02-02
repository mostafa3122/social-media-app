import { Card } from 'flowbite-react'
import React, { useContext } from 'react'
import PostsList from '../../components/posts/PostsList'
import AddPost from '../../components/posts/AddPost'


function Posts() {

    // const {token} = useContext(UserContext)
    // console.log(token);
   
    return (
        <>
            <section className='max-w-xl mx-auto py-12'  >
               <div className='flex flex-col gap-4'>
                 {/* Psta Form */}
                 <AddPost />
                {/* Psta List */}
                <PostsList />
               </div>
            </section>
        </>
    )
}

export default Posts
