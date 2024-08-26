"use client";

import Loader from '@/app/components/Loader';
import PostCard from '@/app/components/PostCard';
import { useUser } from '@clerk/nextjs'

import React, { useEffect } from 'react'
import { useState } from 'react'

const SavedPosts = () => {
  const { user, isLoaded } = useUser()

  const [loading, setLoading] = useState(true)

  const [userData, setUserData] = useState({})

  const getUser = async () => {
    const response = await fetch(`/api/user/${user.id}`)
    const data = await response.json()
    setUserData(data)
    setLoading(false)
  }

  useEffect(() => {
    if (user) {
      getUser()
    }
  }, [user])

  return loading || !isLoaded ? <Loader /> : (
    <div className='flex flex-col gap-9'>
      {userData?.savedPosts?.map((post) => (
        <PostCard key={post?._id} post={post} creator={post?.creator} loggedInUser={user} update={getUser} />
      ))}
    </div>
  )
}

export default SavedPosts