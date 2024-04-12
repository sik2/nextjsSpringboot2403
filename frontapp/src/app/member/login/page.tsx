'use client'

import { useState } from "react";

export default function Login () {

    const [user, setUser] = useState({username: '', password: ''});


    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8090/api/v1/members/login", {
            method: 'POST',
            credentials: 'include', // 핵심 변경점
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(user)
        })


        if (response.ok) {
            alert("ok")
        } else {
            alert("fail")
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value})
        console.log({...user, [name]: value})
    }

    const handleLogout = async () => {
        const response = await fetch("http://localhost:8090/api/v1/members/logout", {
            method: 'POST',
            credentials: 'include', // 핵심 변경점
        })

        if (response.ok) {
            alert("ok")
        } else {
            alert("fail")
        }
    }

    return (
        <>
            <h3>로그인 폼</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" onChange={handleChange} />
                <input type="password" name="password" onChange={handleChange} />
                <button type="submit">등록</button>
            </form>
            <button onClick={handleLogout}>로그아웃</button>
        </>
    )
 }