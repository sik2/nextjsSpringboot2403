'use client'
export default async function Article () {

    await fetch("http://localhost:8090/api/v1/articles");
        

    return (
        <>  
            <div>

            </div>
        </>
    )
}