import React from 'react'
import AddPost from '../../../components/posts/AddPost'
import PostsList from '../../../components/posts/PostsList'

export default function Profile() {

    return (
        <>

            <section className='max-w-xl mx-auto py-12'  >
                <div className='flex flex-col gap-4'>
                    <AddPost />
                    <PostsList isProfile={true} />
                </div>
            </section>

        </>
    )
}
