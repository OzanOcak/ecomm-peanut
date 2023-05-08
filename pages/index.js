import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "../components/Nav";

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="bg-blue-400 h-screen w-screen flex gap-2 ">
        <div className="w-1/6 bg-white">
          <Nav />
        </div>
        <div className="w-5/6 flex items-start justify-between m-2 gap-4">
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
      </div>
    );
  }
  return (
    <div className="bg-blue-500 min-h-screen w-screen flex justify-center items-center ">
      <button
        onClick={() => signIn("google")}
        className="bg-white px-4 py-1 rounded-md hover:bg-gray-100 font-bold text-blue-700"
      >
        Login with Google
      </button>
    </div>
  );
}
