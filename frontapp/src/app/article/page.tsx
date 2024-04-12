'use client'

import Link from "next/link";
import { useEffect, useState } from "react"
import api from "../utils/api";

export default function Article () {


    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchArticles()
    }, [])


    const fetchArticles = () => {
        api.get("/articles")
        .then(
            response => setArticles(response.data.data.articles)
        )
        .catch (err => {
            console.log(err)
        })
    }

    const handleDelete = async (id) => {
        await api.delete(`/articles/${id}`)
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


        await api.post("/articles", article)
        .then(function (response) {
            fetchArticles();
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setArticle({...article, [name]: value})
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