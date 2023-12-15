import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import Widgets from "@/components/Widgets";
import Post from "@/components/Post";
import CommentModal from "@/components/CommentModal";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import {
  onSnapshot,
  doc,
  query,
  collection,
  orderBy,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import Comment from "@/components/Comment";

const inter = Inter({ subsets: ["latin"] });

export default function PostPage({ newsResults, randomUsersResults }) {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);

  // grabs the Post data
  useEffect(() => {
    onSnapshot(doc(db, "posts", id), (snapshot) => setPost(snapshot));
  }, [db, id]);

  // grabs the comments
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db, id]);

  return (
    <div>
      <Head>
        <title>Post Page</title>
      </Head>

      <main className="flex min-h-screen mx-auto">
        {/* Side Bar */}
        <Sidebar />

        {/* Feed */}

        <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
          <div className="flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
            <div className="hoverEffect" onClick={() => router.push("/")}>
              <ArrowLeftIcon className="h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold cursor-pointer">
              Post
            </h2>
          </div>

          <Post id={id} post={post} />

          {comments.length > 0 && (
            <div className="">
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  commentId={comment.id}
                  originalPostId={id}
                  comment={comment.data()}
                />
              ))}
            </div>
          )}
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
