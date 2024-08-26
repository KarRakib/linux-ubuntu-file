"use client"

import Loader from "@/app/components/Loader";
import ProfileCard from "@/app/components/ProfileCard";
import UserCard from "@/app/components/UserCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Followers = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({});

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

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-9">
      <ProfileCard userData={userData} activeTab="Followers" />

      <div className="flex flex-col gap-9">
        {userData?.followers?.map((person) => (
          <UserCard key={person?._id} userData={person} update={getUser}/>
        ))}
      </div>
    </div>
  );
};

export default Followers;
