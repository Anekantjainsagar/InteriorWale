"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { RiDashboardLine } from "react-icons/ri";
import { CiLogout, CiUser } from "react-icons/ci";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import { FaBlogger, FaCircleNotch, FaUsers } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { MdOutlineContactPhone } from "react-icons/md";
import { FaQuestion } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { CiMapPin } from "react-icons/ci";
import { BiSupport } from "react-icons/bi";
import { AiFillProduct } from "react-icons/ai";

const Sidebar = () => {
  const { logout } = useAuth();
  const pathname = usePathname();
  const history = useRouter();
  const data = [
    {
      name: "Dashboard",
      icon: <RiDashboardLine size={20} className="mr-2 pb-0.5" />,
      route: "/admin",
    },
    {
      name: "Blogs",
      icon: <FaBlogger size={20} className="mr-2 pb-0.5" />,
      sub: [
        {
          name: "All Blogs",
          route: "/admin/blogs",
        },
        {
          name: "Add New Blog",
          route: "/admin/blogs/add",
        },
      ],
    },
    {
      name: "Products",
      icon: <AiFillProduct size={20} className="mr-2 pb-0.5" />,
      sub: [
        {
          name: "Products",
          route: "/admin/product",
        },
        {
          name: "Product Categories",
          route: "/admin/product/categories",
        },
      ],
    },
    {
      name: "Gallery",
      icon: <GrGallery size={20} className="mr-2 pb-0.5" />,
      route: "/admin/gallery",
    },
    {
      name: "Map Coordinates",
      icon: <CiMapPin size={20} className="mr-2 pb-0.5" />,
      route: "/admin/map-coords",
    },
    {
      name: "Support Logos",
      icon: <BiSupport size={20} className="mr-2 pb-0.5" />,
      route: "/admin/support-logos",
    },
    {
      name: "Subscribers",
      icon: <MdMarkEmailUnread size={20} className="mr-2 pb-0.5" />,
      route: "/admin/subscribers",
    },
    {
      name: "Queries",
      icon: <FaQuestion size={20} className="mr-2 pb-0.5" />,
      route: "/admin/queries",
    },
    {
      name: "Additional Details",
      icon: <MdOutlineContactPhone size={20} className="mr-2 pb-0.5" />,
      route: "/admin/contact-us",
    },
  ];

  return (
    pathname != "/admin/login" && (
      <div className="w-[15vw] h-[100vh] bg-[#141423] flex flex-col items-center px-2 py-6">
        <Image
          src={"/logo-text.svg"}
          width={10000}
          height={1000}
          alt={"Logo"}
          className="w-6/12"
        />
        <div className="w-full mt-6">
          {data?.map((e, i) => {
            return <NavItem e={e} key={i} />;
          })}
          <div
            onClick={() => {
              logout();
              history.push("/");
            }}
            className={`font-medium hover:text-white transition-all py-2 hover:bg-gray-700 rounded-lg px-2 mb-0.5 cursor-pointer flex justify-between items-center ${
              pathname == "/logout" ? "text-white bg-gray-700" : "text-gray-400"
            }`}
          >
            <div className="items-center flex">
              <CiLogout size={20} className="mr-2 pb-0.5" />
              Logout
            </div>
          </div>
        </div>
      </div>
    )
  );
};

const NavItem = ({ e }) => {
  const history = useRouter();
  const pathname = usePathname();
  const [showBottom, setShowBottom] = useState(false);

  return (
    <>
      <div
        onClick={(event) => {
          if (e?.route) {
            history.push(e?.route);
          }
          setShowBottom(!showBottom);
        }}
        className={`font-medium hover:text-white transition-all py-2 hover:bg-gray-700 rounded-lg px-2 mb-0.5 cursor-pointer flex justify-between items-center ${
          pathname == e?.route ? "text-white bg-gray-700" : "text-gray-400"
        }`}
      >
        <div className="items-center flex">
          {e?.icon}
          {e?.name}
        </div>
        {e?.sub?.length > 0 && !showBottom && (
          <div className="">
            <AiOutlineRight />
          </div>
        )}
        {e?.sub?.length > 0 && showBottom && (
          <div className="">
            <AiOutlineDown />
          </div>
        )}
      </div>
      {e?.sub?.length > 0 &&
        showBottom &&
        e?.sub?.map((e, i) => {
          return <SubNavItem data={e} key={i} />;
        })}
    </>
  );
};

const SubNavItem = ({ data }) => {
  const pathname = usePathname();
  const history = useRouter();

  return (
    <div
      onClick={(e) => {
        if (data?.route) {
          history.push(data?.route);
        }
      }}
      className={`text-gray-400 font-bold hover:text-white transition-all py-2 hover:bg-gray-700 rounded-lg px-4 mb-0.5 cursor-pointer flex justify-between items-center pl-8 ${
        pathname == data?.route ? "text-white bg-gray-700" : "text-gray-400"
      }`}
    >
      <div className="items-center flex">
        <FaCircleNotch size={10} className="mr-2" />
        {data?.name}
      </div>
    </div>
  );
};

export default Sidebar;
