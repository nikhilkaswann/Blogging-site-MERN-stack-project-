import React from 'react'
import { isEmpty, isNil } from 'lodash-es'
import { useArticlesQuery } from '../hooks'
import ArticlePreview from './ArticlePreview'



function ArticleList() {
  const { articles } = useArticlesQuery()

  console.log('ArticleList',{articles})



  if (isEmpty(articles)) return <p className="article-preview">No articles are here... yet.</p>

  return (
    <>
      {articles.map((article) => (
        <ArticlePreview key={article.slug} article={article} />
      ))}
     
    </>
  )
}

export default ArticleList
