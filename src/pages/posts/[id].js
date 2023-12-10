import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import Widgets from "@/components/Widgets";
import CommentModal from "@/components/CommentModal";

const inter = Inter({ subsets: ["latin"] });

export default function Post({ newsResults, randomUsersResults }) {
  return (
    <div>
      <Head>
        <title>Post Page</title>
      </Head>

      <main className="flex min-h-screen mx-auto">
        {/* Side Bar */}
        <Sidebar />

        <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
          <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold cursor-pointer">
              Home
            </h2>
          </div>
        </div>

        {/* Widgets */}
        <Widgets
          newsResults={newsResults.articles}
          randomUsersResults={randomUsersResults.results}
        />
        {/* Modal */}
        <CommentModal />
      </main>
    </div>
  );
}

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