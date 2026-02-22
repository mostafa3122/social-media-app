import React from 'react'
import AddPost from '../../../components/posts/AddPost'
import PostsList from '../../../components/posts/PostsList'
import ProfileCard from '../../../components/Profile/ProfileCard'

export default function Profile() {

    return (
        <>

            <section className='max-w-xl mx-auto py-12'  >
                <div className='flex flex-col gap-4'>
                    <ProfileCard />
                    <AddPost />
                    <PostsList isProfile={true} />
                </div>
            </section>

        </>
    )
}
