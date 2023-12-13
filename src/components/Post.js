import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  TrashIcon,
  HeartIcon,
  ShareIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";
import Moment from "react-moment";
import {
  setDoc,
  doc,
  collection,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { deleteObject, ref } from "firebase/storage";
import { modalState, postIdState } from "../../atom/modalAtom";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";

export default function Post({ post, id }) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState("");
  const [hasLiked, setHasLiked] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const router = useRouter();

  // creates likes collection for the database
  const likePost = async () => {
    if (session) {
      if (hasLiked) {
        await deleteDoc(doc(db, "posts", id, "likes", session?.user.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
          username: session.user.username,
        });
      }
    } else {
      signIn();
    }
  };

  const composeComment = () => {
    if (!session) {
      signIn();
    } else {
      setPostId(post.id);
      setOpen(!open);
    }
  };

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      // deletes posts
      deleteDoc(doc(db, "posts", id));
      if (post.data().image) {
        // deletes photos from the firebase storage
        deleteObject(ref(storage, `posts/${post.id}/image`));
      }
      router.push("/");
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "comments"),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [comments]);

  useEffect(() => {
    // checks to see if the logged in user has liked, -1 implies the user has not liked the post
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes]);

  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      {/*  User image */}
      <img
        className="h-11 w-11 rounded-full mr-4"
        src={post?.data()?.userImg}
        about="user-image"
      />

      {/* right side */}

      <div className="flex-1">
        {/* Header */}

        <div className="flex items-center justify-between">
          {/* post user Info */}
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post?.data()?.name}
            </h4>
            <span className="text-sm sm:text-[15px]">
              @{post?.data()?.username} -{" "}
            </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
            </span>
          </div>
          {/* dot icon */}
          <EllipsisHorizontalIcon className="h-10 w-10 hoverEffect hover:bg-sky-100 hover:text-sky-500 p-2" />
        </div>

        {/* post text */}

        <p className="text-gray-800 text-[15px sm:text-[16px] mb-2]">
          {post?.data()?.text}
        </p>

        {/* post image */}
        {post?.data()?.image && (
          <img
            className="rounded-2xl mr-2"
            src={post?.data()?.image}
            alt="post image"
          />
        )}
        {/* post icons */}

        <div className="flex justify-between text-gray-500 p-2">
          <div className="flex items-center select-none">
            <ChatBubbleOvalLeftEllipsisIcon
              onClick={() => composeComment()}
              className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100  "
            />
            {comments.length > 0 && (
              <span className="text-sm">{comments.length}</span>
            )}
          </div>
          {session?.user.uid === post?.data()?.id && (
            <TrashIcon
              onClick={deletePost}
              className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
            />
          )}
          <div className="flex items-center">
            {hasLiked ? (
              <HeartIconFilled
                className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"
                onClick={likePost}
              />
            ) : (
              <HeartIcon
                className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
                onClick={likePost}
              />
            )}
            {likes.length > 0 && (
              <span
                className={`${hasLiked && "text-red-600"} text-sm select-none`}
              >
                {likes.length}
              </span>
            )}
          </div>
          <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
}
