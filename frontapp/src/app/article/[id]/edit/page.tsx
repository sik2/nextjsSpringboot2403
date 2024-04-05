'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ArticleEdit () {
    const params = useParams();
    const [article, setArticle] = useState({subject: '', content: ''});

    useEffect(() => {
        fetchArticle()
    }, [])

    const fetchArticle = () => {
        fetch(`http://localhost:8090/api/v1/articles/${params.id}`)
        .then(result => result.json())
        .then(result => setArticle(result.data.article))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch(`http://localhost:8090/api/v1/articles/${params.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(article)
        })

        if (response.ok) {
            alert("update ok")
        } else {
            alert("update fail")
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setArticle({...article, [name]: value})
        console.log({...article, [name]: value})
    }


    return (
        <>
            <h1>수정페이지</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="subject" value={article.subject} onChange={handleChange} />
                <input type="text" name="content" value={article.content} onChange={handleChange} />
                <button type="submit">수정</button>
            </form>
        </>
    );
}

