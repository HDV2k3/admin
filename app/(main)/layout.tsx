import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "../../styles/globals.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardSidebar from "@/component/DashboardSidebar";
import DashboardHeader from "@/component/DashboardHeader";

export const metadata = {
  title: "NextRoom",
  description:
    "NextRoom - Your ultimate platform for finding and renting rooms with ease.",
};

async function getUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(
      "http://ec2-3-106-252-213.ap-southeast-2.compute.amazonaws.com:8080/user/users/me",
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-screen">
        <AntdRegistry>
          <DashboardSidebar />
          <main className="flex-grow pt-0 bg-gray-100">
            <DashboardHeader />
            {children}
          </main>
        </AntdRegistry>
      </body>
    </html>
  );
}
