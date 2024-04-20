'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import api from '../../utils/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export default function Article() {

    const getArticles = async () => {
        return await api.get('/articles')
            .then((response) => response.data.data.articles)
    }

    const {isLoading, error, data} = useQuery({
        queryKey: ['articles'],
        queryFn: getArticles
    });


    const deleteArticle = async (id) => {
        await api.delete(`/articles/${id}`)
    }

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: deleteArticle,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['articles']})
        }
    })

    if (error) {
        console.log(error)
    }

    if (isLoading) <>Loading...</>

    if (data) {
        return (
            <>
                <ArticleForm />
                <ul>
                    번호 / 제목 / 작성자 / 생성일 / 삭제
                    {data.map((row) => (
                        <li key={row.id}>
                            {row.id} /{' '}
                            <Link href={`/article/${row.id}`}>{row.subject}</Link> /{' '}
                            {row.author} / {row.createdDate}
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

function ArticleForm({ fetchArticles }) {
    const [article, setArticle] = useState({ subject: '', content: '' })

    const handleSubmit = async (e) => {
        e.preventDefault()

        await api
            .post('/articles', article)
            .then(function (response) {
                fetchArticles()
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setArticle({ ...article, [name]: value })
    }

    return (
        <>
            <h3>등록폼</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" name="subject" onChange={handleChange} />
                <input type="text" name="content" onChange={handleChange} />
                <button type="submit">등록</button>
            </form>
        </>
    )
}
