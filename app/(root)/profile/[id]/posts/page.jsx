"use client";

import Loader from "@/app/components/Loader";
import PostCard from "@/app/components/PostCard";
import ProfileCard from "@/app/components/ProfileCard";
import { useUser } from "@clerk/nextjs";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfilePosts = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({});
  console.log('user data post', userData);
  const getUser = async () => {
    const response = await fetch(`/api/user/profile/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setUserData(data);
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, [id]);

  const { user, isLoaded } = useUser();

  console.log(userData)

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-9">
      <ProfileCard userData={userData} activeTab="Posts" />

      <div className="flex flex-col gap-9">
        {userData?.posts?.map((post) => (
          <PostCard key={post?._id} post={post} creator={post?.creator} loggedInUser={user} update={getUser}/>
        ))}
      </div>
    </div>
  );
};

export default ProfilePosts;
