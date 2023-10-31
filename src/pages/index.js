import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "@/components/Widgets";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ newsResults, randomUsersResults }) {
  return (
    <div>
      <Head>
        <title>Twitter Clone</title>
      </Head>

      <main className="flex min-h-screen mx-auto">
        {/* Side Bar */}
        <Sidebar />
        {/* Feed */}
        <Feed />
        {/* Widgets */}
        <Widgets
          newsResults={newsResults.articles}
          randomUsersResults={randomUsersResults.results}
        />
        {/* Modal */}
      </main>
    </div>
  );
}

// https://saurav.tech/NewsAPI/top-headlines/category/business/us.json

export async function getServerSideProps() {
  const newsResults = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/entertainment/us.json"
  ).then((res) => res.json());

  // Who to follow section

  const randomUsersResults = await fetch(
    "https://randomuser.me/api/?results=30&inc=name,login,picture"
  ).then((res) => res.json());

  return {
    props: {
      newsResults,
      randomUsersResults,
    },
  };
}
