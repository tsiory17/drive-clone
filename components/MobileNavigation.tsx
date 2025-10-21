"use client";
import React, { useState } from "react";
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
import { avatarPlaceholderUrl } from "@/constant";

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
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetContent>
      </Sheet>
    </header>
  );
}

export default MobileNavigation;
