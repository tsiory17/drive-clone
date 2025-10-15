"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/constant";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function SideBar() {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <Link href="/">
        <Image
          src="/assets/icons/logo-full-brand.svg"
          alt="logo"
          width={160}
          height={50}
          className="hidden h-auto lg:block"
        />
        <Image
          src="/assets/icons/logo-brand.svg"
          alt="logout"
          width={52}
          height={52}
          className="lg:hidden"
        />
      </Link>

      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => {
            const active = pathname === url;
            return (
              <Link href={url} key={name} className="lg:w-full">
                <li
                  className={
                    active ? "sidebar-nav-item shad-active" : "sidebar-nav-item"
                  }
                >
                  {/* <li */}
                  {/*  className={cn( */}
                  {/*    "sidebar-nav-item", */}
                  {/*    pathname === url && "shad-active", */}
                  {/*  )} */}
                  {/* > */}
                  <Image src={icon} alt={name} height={24} width={24} />
                  <p>{name}</p>
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;
