'use client'

import { useEffect, useState } from 'react'
import api from '../utils/api'

export default function About() {
    const [member, setMember] = useState({})

    useEffect(() => {
        api.get('/members/me').then((response) =>
            setMember(response.data.data.member)
        )
    }, [])

    return (
        <>
            <h1>소개 페이지</h1>
            <ul>
                <li>id : {member.id}</li>
                <li>username : {member.username}</li>
            </ul>
        </>
    )
}
