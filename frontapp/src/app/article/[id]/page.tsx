'use client'

import api from '@/utils/api'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function ArticleDetail() {
    const params = useParams()

    const getArticle = async () => {
        return await api.get(`/articles/${params.id}`)
        .then((response) => response.data.data.article)
    }

    const {isLoading, error, data} = useQuery({
        queryKey: ['article'],
        queryFn: getArticle
    });

    if (error) {
        console.log(error)
    }

    if (isLoading) <>Loading...</>

    if (data) {
        return (
            <>
                <h1>게시판 상세 {params.id}번</h1>
                <div>{data.subject}</div>
                <div>{data.content}</div>
                <div>{data.createdDate}</div>
                <div>{data.modifiedDate}</div>
                <Link href={`/article/${params.id}/edit`}>수정하기</Link>
            </>
        )
    }
}
