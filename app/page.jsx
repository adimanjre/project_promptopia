import React from 'react'
import Feed from '@components/feed'

const home = () => {
  return (
   <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
        Discover & Share
        <br className='max-md:hidder'/>
        <span className='orange_gradient text-center'>AI-powered prompts</span>
    </h1>
    <p className='desc text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem nostrum temporibus quasi voluptas soluta ullam sunt officiis culpa totam iusto distinctio dolorum vel, eos quo. Facere in velit inventore molestias.</p>

    <Feed/>
   </section>
  )
}

export default home