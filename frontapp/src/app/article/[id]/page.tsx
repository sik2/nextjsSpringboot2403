'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ArticleDetail() {
    const params = useParams();  
    const [article, setArticle] = useState({});


    useEffect(() => {
        fetch(`http://localhost:8090/api/v1/articles/${params.id}`)
        .then(result => result.json())
        .then(result => setArticle(result.data.article))
    }, [])

    return ( 
        <>
            <h1>게시판 상세 {params.id}번</h1>
            <div>{article.subject}</div>
            <div>{article.content}</div>
            <div>{article.createdDate}</div>
            <div>{article.modifiedDate}</div>
        </>
    );
}
