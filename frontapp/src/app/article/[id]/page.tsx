'use client'

import api from '@/app/utils/api'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ArticleDetail() {
    const params = useParams()
    const [article, setArticle] = useState({})

    useEffect(() => {
        api.get(`/articles/${params.id}`)
            .then((response) => setArticle(response.data.data.article))
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <h1>게시판 상세 {params.id}번</h1>
            <div>{article.subject}</div>
            <div>{article.content}</div>
            <div>{article.createdDate}</div>
            <div>{article.modifiedDate}</div>
            <Link href={`/article/${params.id}/edit`}>수정하기</Link>
        </>
    )
}
