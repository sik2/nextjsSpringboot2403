'use client'

import { useEffect, useState } from "react";

export default function Article () {
    const [articles, setArticles] = useState([])
    useEffect(() => {
        getData()
    }, [])


    const getData = async() => {
        const result = await fetch("http://localhost:8090/api/v1/articles").then(row => row.json());
        setArticles(result.data.articles)
        console.log(result.data.articles)
    }

    return (
        <>  
            <ul>
                {articles.map(article => <li>{article.id}/{article.subject}</li>)}
            </ul>
        </>
    )
}