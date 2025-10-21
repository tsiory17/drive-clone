import React from "react";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="hidden bg-brand p-10 lg:block">
        <div>
          <Image
            src="/favicon.ico"
            alt="logo"
            width={16}
            height={16}
            className="h-auto"
          />

          <div className="space-y-5 text-white">
            <h1 className="text-3xl font-bold leading-none">
              {" "}
              STORAGE MANAGER
            </h1>
            {/* <p className="body-1">Place you can store your docs</p> */}
          </div>
        </div>
      </section>
      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-1 lg:hidden">
          <Image
            src="/assets/icons/logo-brand.svg"
            alt="logo"
            width={214}
            height={72}
            className="h-auto w-[200px] lg:w-[200px]"
          />
        </div>
        {children}
      </section>
    </div>
  );
};
export default Layout;
