// Do not use "use client" here
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "../../styles/globals.css"; // Import global styles
import DashboardSidebar from "@/component/DashboardSidebar";
import DashboardHeader from "@/component/DashboardHeader";

export const metadata = {
  title: "NextRoom",
  description:
    "NextRoom - Your ultimate platform for finding and renting rooms with ease.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
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
};

export default RootLayout;
