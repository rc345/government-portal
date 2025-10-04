import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Demo authentication - replace with real authentication
    if (email === "admin@ablakwa.gov.gh" && password === "admin123") {
      const response = NextResponse.json({
        success: true,
                  user: {
            name: "Admin User",
            email: "admin@ablakwa.gov.gh",
            role: "Super Administrator",
          },
      })

      // Set HTTP-only cookie for security
      response.cookies.set("admin_token", "demo_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      return response
    }

    return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete("admin_token")
  return response
}
