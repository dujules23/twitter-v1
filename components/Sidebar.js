import Image from "next/image";
import SidebarMenuItem from "./SidebarMenuItem";

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
      <div>
        <SidebarMenuItem />
      </div>
      {/* Button */}

      {/* Mini Profile */}
    </div>
  );
}
