import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="bg-blue-500 h-screen w-screen flex flex-col gap-2 justify-center items-center">
        <span className="text-white">
          Signed in as {session.user.email} <br />
        </span>
        <button
          className="bg-white px-4 py-1 rounded-md hover:bg-gray-100 font-bold text-blue-700"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className="bg-blue-500 h-screen w-screen flex justify-center items-center">
      <button
        onClick={() => signIn("google")}
        className="bg-white px-4 py-1 rounded-md hover:bg-gray-100 font-bold text-blue-700"
      >
        Login with Google
      </button>
    </div>
  );
}
