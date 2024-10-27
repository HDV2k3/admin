import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

// Danh sách các trang cần kiểm tra quyền truy cập
const protectedRoutes = ["/", "/home"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  // Nếu không có token, chuyển hướng đến trang đăng nhập
  if (!token) {
    if (request.nextUrl.pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // Nếu có token, xác thực và kiểm tra vai trò
  try {
    const response = await axios.get(
      "http://user-cicd-env.eba-wjfksigh.ap-southeast-2.elasticbeanstalk.com/user/users/me",
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    const userData = response.data;
    const userRoles = userData?.data?.roles || [];
    const isAdmin = userRoles.some(
      (role: { name: string }) => role.name === "ADMIN"
    );

    // Nếu không phải admin và đang cố gắng vào các trang bảo mật
    if (!isAdmin && protectedRoutes.includes(request.nextUrl.pathname)) {
      // Nếu đang ở trang unauthorized, không chuyển hướng thêm nữa
      if (request.nextUrl.pathname !== "/unauthorized") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
      return NextResponse.next();
    }

    // Nếu là admin, cho phép truy cập
    return NextResponse.next();
  } catch (error) {
    console.error("Authorization middleware error:", error);
    // Nếu có lỗi trong việc xác thực, chuyển hướng đến trang đăng nhập
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Áp dụng middleware cho tất cả các route
export const config = {
  matcher: ["/", "/home", "/unauthorized", "/login"],
};
