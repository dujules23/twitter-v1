import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Head>
        <title>Twitter Clone</title>
      </Head>

      <main className="flex min-h-screen max-w-7xl mx-auto">
        {/* Side Bar */}
        <Sidebar />
        {/* Feed */}
        <Feed />
        {/* Widgets */}

        {/* Modal */}
      </main>
    </div>
  );
}
