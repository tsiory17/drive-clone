"use client";
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import SideBar from "@/components/SideBar";
import { usePathname } from "next/navigation";
import { avatarPlaceholderUrl, navItems } from "@/constant";
import Link from "next/link";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { signOutUser } from "@/lib/actions/user.actions";

interface Props {
  ownerId: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}

function MobileNavigation({
  ownerId,
  accountId,
  fullName,
  avatar,
  email,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="mobile-header">
      <Image
        src="/assets/icons/logo-full-brand.svg"
        alt="logo"
        width={120}
        height={152}
        className="h-auto"
      />

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          {" "}
          <Image
            src="/assets/icons/menu.svg"
            alt="search"
            width={34}
            height={34}
          />
          <div className="sm:hidden lg:block">
            <p className="subtitle-2 capitalize">{fullName}</p>
            <p className="caption">{email}</p>
          </div>
        </SheetTrigger>

        <SheetContent className="shad-sheet h-screen px-3">
          <SheetTitle>
            <div className="header-user">
              <Image
                src={avatarPlaceholderUrl}
                alt="avatar"
                width={44}
                height={44}
                className="header-user-avatar"
              />
            </div>
            <Separator className="mb-4 bg-light-200/20" />
          </SheetTitle>
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navItems.map(({ url, name, icon }) => {
                const active = pathname === url;
                return (
                  <Link href={url} key={name} className="lg:w-full">
                    <li
                      className={
                        active
                          ? "mobile-nav-item shad-active"
                          : "mobile-nav-item"
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
          <Separator className="mb-4 bg-light-200/20" />

          <div className="justify-between-gap-5 flex flex-col pb-5">
            <FileUploader />
            <Button
              className="sign-out-button"
              type="submit"
              onClick={async () => signOutUser()}
            >
              <Image
                src="/assets/icons/logout.svg"
                alt="logout"
                width={24}
                height={24}
                // className="w-6"
              />
              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}

export default MobileNavigation;
