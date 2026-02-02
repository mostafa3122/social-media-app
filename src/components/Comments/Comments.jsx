import { Avatar } from 'flowbite-react'
import React from 'react'

function Comments({ comment }) {

    return (
        <section>
            <header >
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
            </header>
            {/*  body */}
            <h3 className="ps-12 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {comment?.content}
            </h3>
        </section>
    )
}

export default Comments
