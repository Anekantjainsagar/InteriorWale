"use client";
import Image from "next/image";
import React, { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { GrGallery } from "react-icons/gr";
import { FaQuestion } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { RiDashboardLine } from "react-icons/ri";
import { useAuth } from "../../Context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { FaBlogger, FaCircleNotch } from "react-icons/fa";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";

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
      name: "Queries",
      icon: <FaQuestion size={20} className="mr-2 pb-0.5" />,
      route: "/admin/queries",
    },
  ];

  return (
    pathname != "/admin/login" && (
      <div className="w-[15vw] h-[100vh] bg-white border-r flex flex-col items-center px-2 py-6">
        <Image
          src={"/images/img_header_logo.png"}
          width={10000}
          height={1000}
          alt={"Logo"}
          className="w-9/12"
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
            className="font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all py-2 rounded-lg px-2 mb-0.5 cursor-pointer flex justify-between items-center"
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
        className={`font-medium transition-all py-2 rounded-lg px-2 mb-0.5 cursor-pointer flex justify-between items-center ${
          pathname == e?.route
            ? "text-blue-600 bg-blue-50"
            : "text-gray-700 hover:bg-gray-100"
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
      className={`font-medium transition-all py-2 rounded-lg px-4 mb-0.5 cursor-pointer flex justify-between items-center pl-8 ${
        pathname == data?.route
          ? "text-blue-600 bg-blue-50"
          : "text-gray-600 hover:bg-gray-100"
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
