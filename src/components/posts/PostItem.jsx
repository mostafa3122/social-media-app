
import { Avatar, Card } from 'flowbite-react'
import React from 'react'
import Comments from '../Comments/Comments'
import { FaComment, FaHeart, FaShare } from 'react-icons/fa6'
import { Link } from 'react-router-dom'


export default function PostItem({ post, isHome }) {
    // console.log("posssstttsss" ,post.id);
    return (
        <>
            <Card >
                {/*  post header */}
                <header >
                    <div className='flex items-center gap-2'>
                        <Avatar className="cursor-pointer" alt="User settings" img={post?.user?.photo} rounded />
                        <div>
                            <h2 className='text-lg m-0'>{post?.user?.name}</h2>
                            <span>{new Date(post?.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </header>
                {/* post body */}
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {post?.body}
                </h3>
                <img src={post?.image} alt={post?.name} />
                {/* footer */}
                <div className="comment-icons dark:border-b-zinc-50 border-b-1 border-b-black pb-2 flex justify-between items-center ">
                    <FaHeart className='cursor-pointer' />
                    <div className='flex gap-2 items-center cursor-pointer'>
                        <span>
                            {post?.comments?.length}
                        </span>
                        <FaComment />
                    </div>
                    <Link to={`/post-details/${post?.id}`}><FaShare className='cursor-pointer' /></Link>
                </div>
                {/* comments */}
                <div className="mt-4">
                    {post?.comments && post.comments.length > 0 &&
                        (isHome
                            ? <Comments comment={post.comments[0]} />
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
