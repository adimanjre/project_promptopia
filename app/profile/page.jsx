"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Profile from '@components/profile'

const Myprofile = () => {
    const { data: session } = useSession();
    const [post,setPost] = useState([])
    const Router = useRouter()
    useEffect(() => {
        const fetchPost = async () => {
            console.log(session.user.id)
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setPost(data)
        }
        fetchPost();
    }, [])

    const handleEdit = (post) => {
        Router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("are you sure want to delete this prompt?");
        if(hasConfirmed){
            try {
                const response = await fetch(`/api/prompt/${post._id.toString()}`,{
                    method:'DELETE'
                })
                const myPost = await response.json()
                console.log(myPost)
                // const filteredPost = post.filter((p)=> p._id !== post._id)
                // setPost(filteredPost)
                const allPost = await fetch(`/api/users/${session?.user.id}/posts`);
                const data = await allPost.json();
                setPost(data)
                
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={post}
            handleEdit={(post)=>handleEdit(post)}
            handleDelete={(post)=>handleDelete(post)}
        />
    )
}

export default Myprofile