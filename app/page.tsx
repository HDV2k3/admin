"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import HomePage from "./home/page";

const RootPage: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAdminRole = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://user-cicd-env.eba-wjfksigh.ap-southeast-2.elasticbeanstalk.com/user/users/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const userData = response.data.data;
        const userRoles = userData.roles || [];
        const isAdmin = userRoles.some(
          (role: { name: string }) => role.name === "ADMIN"
        );

        if (isAdmin) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
          router.push("/unauthorized");
        }
      } catch (error) {
        console.error("Authorization failed:", error);
        setIsAuthorized(false);
        router.push("/login");
      }
    };

    checkAdminRole();
  }, [router]);

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? <HomePage /> : <div>Unauthorized</div>;
};

export default RootPage;
