"use client"

import { useSession, signIn } from "next-auth/react"
import { useState, useEffect } from 'react'
import { Avatar } from "@mantine/core"

export default function MSProfilePicture() {
    const { data: session } = useSession()

    const [image, setImage] = useState<string | null>(null)
    useEffect(() => {
        fetch("https://graph.microsoft.com/v1.0/me/photo/$value", {
            method: "GET",
            headers: {
                "Content-Type": "image/jpg",
                'Authorization': session?.user.accessToken
            }
        })
        .then((res) => res.blob())
        .then((data) => {
            setImage(URL.createObjectURL(data))
        })
    }, [session])

    return (
        <div>
            {image && <Avatar src={image} alt="Sign In" onClick={() => signIn("azure-ad")}></Avatar>}
        </div>
    )
}