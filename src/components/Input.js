import {
  PhotoIcon,
  FaceSmileIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef } from "react";
import { db, storage } from "../../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadString } from "firebase/storage";

export default function Input() {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef(null);

  const sendPost = async () => {
    // checks to see if loading already, if true just return
    if (loading) return;
    // begins the post process by setting loading to true
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      text: input,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
      name: session.user.name,
      username: session.user.username,
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setInput("");
    setSelectedFile(null);
    setLoading(false);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <>
      {session && (
        <div className="flex border-b border-gray-200 p-3 space-x-3">
          <img
            onClick={signOut}
            src={session.user.image}
            alt="user-image"
            className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
          />
          <div className="w-full divide-y divide-gray-200">
            <div className="">
              <textarea
                className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
                rows="2"
                placeholder="What's happening?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
            </div>
            {/* shows image preview before posting */}
            {selectedFile && (
              <div className="relative">
                <XMarkIcon
                  onClick={() => setSelectedFile(null)}
                  className="border h-7 text-black absolute cursor-pointer shadow-md border-white rounded-full m-1"
                />
                <img
                  src={selectedFile}
                  className={`${loading && "animate-pulse"}`}
                />
              </div>
            )}
            <div className="flex items-center justify-between pt-2.5">
              {!loading && (
                <>
                  <div className="flex">
                    <div
                      className=""
                      onClick={() => filePickerRef.current.click()}
                    >
                      <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                      <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      />
                    </div>
                    <FaceSmileIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                  </div>
                  <button
                    onClick={sendPost}
                    disabled={!input.trim()}
                    className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                  >
                    Post
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
