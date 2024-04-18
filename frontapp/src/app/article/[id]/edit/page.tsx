'use client'

import api from '@/app/utils/api'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ArticleEdit() {
    const params = useParams()

    const [isLoding, setIsLoding] = useState(false)
    const [article, setArticle] = useState({ subject: '', content: '' })

    const router = useRouter()

    useEffect(() => {
        fetchArticle()
    }, [])

    const fetchArticle = async () => {
        await api
            .get('/members/me')
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
                router.push('/member/login')
            })

        await api
            .get(`/articles/${params.id}`)
            .then((response) => {
                setArticle(response.data.data.article)
                setIsLoding(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await api
            .patch(`/articles/${params.id}`, article)
            .then(function (response) {
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
            {isLoding ? (
                <>
                    <h1>수정페이지</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="subject"
                            value={article.subject}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="content"
                            value={article.content}
                            onChange={handleChange}
                        />
                        <button type="submit">수정</button>
                    </form>
                </>
            ) : (
                <></>
            )}
        </>
    )
}
