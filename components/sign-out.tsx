import { signOut } from "@/auth"

export function SignOutForm() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({ redirectTo: "/" })
      }}
    >
      <button
        type="submit"
        className="text-sm text-gray-600 hover:text-gray-900 underline cursor-pointer"
      >
        Sign out
      </button>
    </form>
  )
}
