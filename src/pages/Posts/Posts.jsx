import { Card } from 'flowbite-react'
import React, { useContext } from 'react'
import PostsList from '../../components/posts/PostsList'
import AddPost from '../../components/posts/AddPost'


function Posts() {

  
    return (
        <>
            <section className='max-w-xl mx-auto py-12'  >
               <div className='flex flex-col gap-4'>
                 {/* Psta Form */}
                 <AddPost />
                {/* Psta List */}
                <PostsList isProfile={false}/>
               </div>
            </section>
        </>
    )
}

export default Posts
