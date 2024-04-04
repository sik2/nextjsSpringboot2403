'use client'

import Link from "next/link";
import { useEffect, useState } from "react"

export default function Article () {


    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8090/api/v1/articles")
        .then(result => result.json())
        .then(result => setArticles(result.data.articles))
    }, [])

    return (
        <>  
           <ul>
                번호 / 제목 / 생성일
                {articles.map(row => <li key={row.id}>{row.id} / <Link href={`/article/${row.id}`}>{row.subject}</Link> / {row.createdDate}</li>)}
           </ul>
        </>
    )
}