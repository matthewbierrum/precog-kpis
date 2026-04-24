export { auth as middleware } from "@/auth"

export const config = {
  // Protect everything except the Auth.js API routes and Next.js internals.
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
}
