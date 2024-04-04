'use client'

import { useParams } from "next/navigation";

export default function ArticleDetail() {
    const params = useParams();    
    return ( 
        <>
            <h1>게시판 상세 {params.id}번</h1>
        </>
    );
}
