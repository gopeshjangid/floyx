"use client";

import { ArticleDetailsArgs, useGetArticleDetailsQuery } from '@/lib/redux/slices/articleDetails';
import LikesComments from "./likesComments";

export default function ArticleLikeCommnent({ userName, articlePuclicUrl }: ArticleDetailsArgs) {
  const { data: articleDetails } = useGetArticleDetailsQuery({ userName, articlePuclicUrl });
  const articleId = articleDetails?.article?.id;
  return (
    <>
      {articleId && (<LikesComments
        likesCommentsDetails={articleDetails?.article}
        itemId={articleId}
        showComments={true}
        articleId={articleId}
        isArticle
      />)}
    </>
  )
}