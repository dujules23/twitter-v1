import Image from "next/image";
import SidebarMenuItem from "./SidebarMenuItem";
import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/react/20/solid";

const iconData = [
  {
    text: "Home",
    Icon: HomeIcon,
  },
  {
    text: "Explore",
    Icon: HashtagIcon,
  },
  {
    text: "Notifications",
    Icon: BellIcon,
  },
  {
    text: "Messages",
    Icon: InboxIcon,
  },
  {
    text: "Bookmarks",
    Icon: BookmarkIcon,
  },
  {
    text: "Lists",
    Icon: ClipboardIcon,
  },
  {
    text: "Profile",
    Icon: UserIcon,
  },
  {
    text: "More",
    Icon: EllipsisHorizontalCircleIcon,
  },
];

export default function Sidebar() {
  return (
    <div>
      {/* Twitter Logo */}
      <div className="">
        <Image
          alt="twitter-logo"
          src="https://www.basicthinking.com/wp-content/uploads/2023/07/twitter-logo-x.jpg"
          width="50"
          height="50"
        ></Image>
      </div>

      {/* Menu */}
      <div className="">
        {iconData.map((icon, id) => {
          <SidebarMenuItem text={icon[id]} Icon={icon[id]} />;
        })}
        {/* <SidebarMenuItem text="Home" Icon={HomeIcon} />
        <SidebarMenuItem text="Home" Icon={HomeIcon} />
        <SidebarMenuItem text="Home" Icon={HomeIcon} />
        <SidebarMenuItem text="Home" Icon={HomeIcon} />
        <SidebarMenuItem text="Home" Icon={HomeIcon} />
        <SidebarMenuItem text="Home" Icon={HomeIcon} />
        <SidebarMenuItem text="Home" Icon={HomeIcon} />
        <SidebarMenuItem text="Home" Icon={HomeIcon} /> */}
      </div>
      {/* Button */}

      {/* Mini Profile */}
    </div>
  );
}
