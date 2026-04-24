import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      // Block anyone whose Google Workspace domain is not precog.com.
      // The `hd` claim is set by Google for Workspace accounts only.
      return (
        account?.provider === "google" &&
        (profile as { hd?: string })?.hd === "precog.com"
      )
    },
    authorized({ auth: session }) {
      // Used by middleware: allow the request only when a session exists.
      return !!session?.user
    },
  },
})
