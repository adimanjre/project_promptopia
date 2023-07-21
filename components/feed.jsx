"use client"

import React, { useEffect, useState } from 'react'
import PromptCard from './promptCard'

const PromptCardList = ({data,handleTagClick})=>{
  return(
    <div className='mt-16 prompt_layout'>
      {data.map(post=>{
        return(
          <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
        />
        )
      })}
    </div>
  )
}

const feed = () => {
const[searchText,setSearchText] = useState('');
const [post,setPost] = useState([]);

const handleSearchChange = e=>{

}

useEffect(()=>{
  const fetchPost = async ()=> {
    const response = await fetch('/api/prompt');
    const data = await response.json();
    setPost(data)
  }
  fetchPost();
},[])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type="text" placeholder='search for tag or username' value ={searchText} onChange={handleSearchChange} required className='search_input peer' />
      </form>
      {console.log(post)} 
      <PromptCardList
        data={post}
        handleTagClick={()=>{}}
      />
    </section>
  )
}

export default feed