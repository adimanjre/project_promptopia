'use client'

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter,useSearchParams } from "next/navigation"

import Form from '@components/form'

const EditPrompt = () => {
    const router = useRouter();

    const{data:session} = useSession()
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    useEffect(()=>{
      const getPromptDetails = async ()=>{
        const response = await fetch(`/api/prompt/${promptId}`)
        const data = await response.json();
        console.log(data)
        setPost({
          prompt:data.prompt,
          tag:data.tag
        })
      }
      if(promptId){
        getPromptDetails()
      }
    },[promptId])

    const UpdatePrompt = async(e)=>{
        e.preventDefault();
        setSubmitting(true);
        if(!promptId) return alert('no prompt id found')
        try {
            const res = await fetch(`/api/prompt/${promptId}`,{
                method:'PATCH',
                body:JSON.stringify({
                    prompt:post.prompt,
                    userId:session?.user.id,
                    tag:post.tag
                })
            })
            if(res.ok){
                router.push('/');
            }
        } catch (error) {
            console.log(err)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={UpdatePrompt}
        />
    )
}

export default EditPrompt