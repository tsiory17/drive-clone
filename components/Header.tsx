import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import FileUploader from "@/components/FileUploader";
import Search from "@/components/Search";

function Header() {
  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <FileUploader />
        <form>
          <Button className="sign-out-button" type="submit">
            <Image
              src="/assets/icons/logout.svg"
              alt="logout"
              width={24}
              height={24}
              // className="w-6"
            />
          </Button>
        </form>
      </div>
    </header>
  );
}

export default Header;
