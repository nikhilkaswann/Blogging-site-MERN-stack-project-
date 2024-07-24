import React from 'react'
import { useTagsQuery } from '../hooks'

function PopularTags() {

    const  {
        isTagsLoading,
        tags,
        tagsError,
      } = useTagsQuery();

    function content(){
        return tags?.tags?.map((tag) => (
            <span className='tag-pill tag-default'>
                {tag}
            </span>
        ))
    }
  return (
    <div className='sidebar'>
        <p>Popular Tags</p>
        <div className='tag-list'>{content()}</div>
    </div>
  )
}

export default PopularTags