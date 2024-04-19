'use client'

import Link from 'next/link'
import { useState } from 'react'
import api from '../../util/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export default function Article() {
    const fetchArticles = async () => {
        return await api
            .get('/articles')
            .then((response) => response.data.data.articles)
    }

    const deleteArticle = async (id) => {
        await api.delete(`/articles/${id}`)
    }

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: deleteArticle,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['articles'] })
        },
    })

    const { isLoading, error, data } = useQuery({
        queryKey: ['articles'],
        queryFn: fetchArticles,
    })

    if (isLoading) <>Loading...</>

    if (data) {
        console.log(data)
        return (
            <>
                <ArticleForm />
                <ul>
                    번호 / 제목 / 작성자 / 생성일 / 삭제
                    {data.map((row) => (
                        <li key={row.id}>
                            {row.id} /
                            <Link href={`/article/${row.id}`}>
                                {row.subject}
                            </Link>
                            / {row.author} / {row.createdDate}
                            <button onClick={() => mutation.mutate(row.id)}>
                                삭제
                            </button>
                        </li>
                    ))}
                </ul>
            </>
        )
    }
}

function ArticleForm() {
    const [article, setArticle] = useState({ subject: '', content: '' })

    const handleSubmit = async (e) => {
        e.preventDefault()

        await api.post('/articles', article)
        queryClient.invalidateQueries('articles')
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setArticle({ ...article, [name]: value })
    }

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: handleSubmit,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['articles'] })
        },
    })

    return (
        <>
            <h3>등록폼</h3>
            <form onSubmit={mutation.mutate}>
                <input type="text" name="subject" onChange={handleChange} />
                <input type="text" name="content" onChange={handleChange} />
                <button type="submit">등록</button>
            </form>
        </>
    )
}
