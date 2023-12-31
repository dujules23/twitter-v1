import { useState, useEffect } from "react";
import Image from "next/image";
import SidebarMenuItem from "./SidebarMenuItem";
import { iconData } from "@/utils/iconData";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Sidebar() {
  // todo: find a way to make the menu items bold only when selected, since they are mapped there is currently an issue.

  const { data: session } = useSession();
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24">
      {/* Twitter Logo */}
      <div className="hoverEffect p-0 xl:px-1">
        <Image
          className="rounded-full"
          alt="twitter-logo"
          src="https://www.basicthinking.com/wp-content/uploads/2023/07/twitter-logo-x.jpg"
          width="50"
          height="50"
        ></Image>
      </div>

      {/* Menu */}
      {session ? (
        <>
          <div className="mt-4 mb-2.5 xl:item-start">
            {iconData.map((item, idx) => {
              const { text, Icon } = item;
              return (
                <SidebarMenuItem key={idx} text={text} Icon={Icon} active />
              );
            })}
          </div>
          {/* Button */}

          <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
            Post
          </button>

          {/* Mini Profile */}

          <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
            <img
              onClick={signOut}
              className="h-10 w-10 rounded-full xl:mr-2"
              src={session.user.image}
              alt="profile-image"
            />
            <div className="leading-5 hidden xl:inline">
              <h4 className="font-bold">{session.user.name}</h4>
              <p className="text-gray-500">@{session.user.username}</p>
            </div>
            <EllipsisHorizontalIcon className="h-7 xl:ml-8" />
          </div>
        </>
      ) : (
        <button
          onClick={signIn}
          className="mt-12 bg-blue-400 text-white rounded-full w-36 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline"
        >
          Sign in
        </button>
      )}
    </div>
  );
}
