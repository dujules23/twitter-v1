import Image from "next/image";
import SidebarMenuItem from "./SidebarMenuItem";
import { iconData } from "@/utils/iconData";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

export default function Sidebar() {
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full">
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
      <div className="mt-4 mb-2.5 xl:item-start">
        {iconData.map((item, idx) => {
          const { text, Icon } = item;
          return <SidebarMenuItem key={idx} text={text} Icon={Icon} active />;
        })}
      </div>
      {/* Button */}

      <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
        Post
      </button>

      {/* Mini Profile */}

      <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
        <img
          className="h-10 w-10 rounded-full xl:mr-2"
          src="https://durrell-portfolio.vercel.app/portrait.jpg"
          alt="profile-image"
        />
        <div className="leading-5 hidden xl:inline">
          <h4 className="font-bold">Durrell Jules</h4>
          <p className="text-gray-500">@PercivalWright</p>
          <EllipsisHorizontalIcon className="h-7 xl:ml-8" />
        </div>
      </div>
    </div>
  );
}
