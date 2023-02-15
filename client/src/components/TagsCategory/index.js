import React from 'react'

import './TagsCategory.scss'

const TagsCategory = (props) => {
  const value = props.tags
  return (
    <>
    <h4>探索</h4>
    <ul className='blog-aside-tags'>
      {/* TODO key 重新定義、增加 <Link> */}
      {value.map((v, i) => {
        return (
          <li key={i}>{v}</li>
        )
      })}
    </ul>
    </>
  )
}

export default TagsCategory
