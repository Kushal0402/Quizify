"use client";

import Image from "next/image";
import logo from "@/public/logo.png";
import AuthProviders from "./AuthProviders";
import Link from "next/link";
import ProfileSection from "./ProfileSection";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  
  return (
    <nav className="flex p-4 justify-between items-center gap-4 bg-dark-blue relative top-0 left-0 right-0 shadow-2xl z-10">
      <Link href="/">
        <div className="normal_container">
          <Image
            src={logo}
            className="w-[50px] h-[50px]"
            alt="Logo"
          />
          <h1 className="mx-4 hidden sm:block md:text-2xl font-semibold">
            Quizify
          </h1>
        </div>
      </Link>

      <div className="normal_container">
        {session?.user ? (
          <div className="flex items-center gap-2">
            <Link href="/quiz">
              <p className="button text-sm md:text-base">Take A Quiz</p>
            </Link>
            <ProfileSection user={session?.user} />
          </div>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
