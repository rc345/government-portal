import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Additional middleware logic can go here if needed
    return
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to login page without token
        if (req.nextUrl.pathname === "/admin/login") {
          return true
        }
        
        // For admin routes, require valid token
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return !!token
        }
        
        // Allow all other routes
        return true
      },
    },
  }
)

export const config = {
  matcher: "/admin/:path*",
}
