'use client'

import Link from "next/link";
import { useEffect, useState } from "react"

export default function Article () {


    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchArticles()
    }, [])


    const fetchArticles = () => {
        fetch("http://localhost:8090/api/v1/articles")
        .then(result => result.json())
        .then(result => setArticles(result.data.articles))
    }

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:8090/api/v1/articles/${id}`, {
            method: 'DELETE'
        })

        if (response.ok) {
            alert("ok")
            fetchArticles()
        } else {
            alert("fail")
        }
    }

    return (
        <>  
           <ArticleForm fetchArticles={fetchArticles} />
           <ul>
                번호 / 제목 / 생성일 / 삭제
                {articles.map(row => 
                    <li key={row.id}>
                        {row.id} / <Link href={`/article/${row.id}`}>{row.subject}</Link> / {row.createdDate}
                        <button onClick={() => handleDelete(row.id)}>삭제</button>
                    </li>          
                )}
           </ul>
        </>
    )
}

function ArticleForm ({fetchArticles}) {

    const [article, setArticle] = useState({subject: '', content: ''});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8090/api/v1/articles", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(article)
        })

        if (response.ok) {
            alert("ok")
            fetchArticles()
        } else {
            alert("fail")
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setArticle({...article, [name]: value})
        // console.log({...article, [name]: value})
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