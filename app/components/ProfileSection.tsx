"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BiExit } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

type props = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

const ProfileSection = ({ user }: { user: props }) => {
  const router = useRouter();
  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  const [isShowing, setIsShowing] = useState(false);

  return (
    <div className="flex flex-col relative z-20">
      <Menu as="div">
        <Menu.Button
          className="flex justify-center items-center"
          onClick={() => setIsShowing((isShowing) => !isShowing)}
        >
          <Image
            src={user?.image!}
            width={40}
            height={40}
            className="rounded-full w-[25px] h-[25px] md:w-[40px] md:h-[40px] mx-2"
            alt="Profile"
          />
        </Menu.Button>

        <Transition
          show={isShowing}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="profile_section">
            <Menu.Item>
              <div className="button">
                <Link
                  href="/profile"
                  className=" flex items-center justify-around gap-1"
                >
                  <p>Profile</p>
                  <CgProfile />
                </Link>
              </div>
            </Menu.Item>

            <Menu.Item>
              <div className="button flex items-center justify-around gap-1">
                <button onClick={handleSignOut}>Sign Out</button> <BiExit />
              </div>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ProfileSection;
