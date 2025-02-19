import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <Link href="/" className="text-xl font-bold">Quiz App</Link>
      <div className="space-x-4 flex gap-9">
        <button className=" text-sm">
          <Link href="/" className="hover:underline">Home</Link>
        </button>
        <button className=" text-sm">
          <Link href="/history" className="hover:underline">History</Link>
        </button>
      </div>
    </nav>
  );
}
