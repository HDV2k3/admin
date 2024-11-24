import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

// Định nghĩa các route cần bảo vệ và route công khai
const protectedRoutes = ["/", "/home", "/dashboard"];
const publicRoutes = ["/login", "/unauthorized", "/register"];
const API_URL =
  "http://ec2-3-106-252-213.ap-southeast-2.compute.amazonaws.com:8080";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bỏ qua các static files và API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes("/assets") ||
    pathname.includes(".") // images, favicon, etc
  ) {
    return NextResponse.next();
  }

  // Lấy token từ cookies
  const token = request.cookies.get("token")?.value;

  console.log("Current path:", pathname);
  console.log("Token exists:", !!token);

  // Xử lý public routes
  if (publicRoutes.includes(pathname)) {
    // Nếu đã có token và đang ở trang login, chuyển về home
    if (token && pathname === "/login") {
      return NextResponse.redirect(new URL("/home", request.url));
    }
    return NextResponse.next();
  }

  // Nếu không có token và đang ở protected route, chuyển về login
  if (
    !token &&
    (protectedRoutes.includes(pathname) || pathname.startsWith("/protected"))
  ) {
    console.log("No token, redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Nếu có token, xác thực token
  if (token) {
    try {
      const response = await axios.get(`${API_URL}/user/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data;
      const userRoles = userData?.data?.roles || [];
      const isAdmin = userRoles.some(
        (role: { name: string }) => role.name === "ADMIN"
      );

      // Nếu không phải admin và đang truy cập protected route
      if (!isAdmin && protectedRoutes.includes(pathname)) {
        console.log("Not admin, redirecting to unauthorized");
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.error("Auth error:", error);
      // Xóa token không hợp lệ và chuyển về login
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token");
      return response;
    }
  }

  // Mặc định chuyển về login nếu không match các điều kiện trên
  return NextResponse.redirect(new URL("/login", request.url));
}

// Cấu hình middleware để chạy trên mọi route
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /assets
     * 4. all root files inside public (e.g. /favicon.ico)
     */
    "/((?!api|_next|assets|[\\w-]+\\.\\w+).*)",
  ],
};
