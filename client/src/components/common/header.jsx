import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";
import { Database } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const Header = () => {
  return (
    <aside className="z-50 mb-10 tracking-tight border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="lg:sticky lg:top-20">
        <nav
          className="relative flex flex-row items-center px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative h-14"
          id="nav"
        >
          <div className="flex items-center justify-between w-full px-2 space-x-0">
            <Link
              href="/"
              className="relative flex items-center px-2 py-1 align-middle transition-all"
            >
              <Database className="w-6 h-6 mr-2" />
              <span className="hidden text-xl font-bold sm:inline-block">
                NextData
              </span>
            </Link>
            <div className="flex items-center gap-x-2">
              <Link
                href={"https://github.com/shaikahmadnawaz/next-data"}
                target="blank"
                className="relative flex px-2 py-1 align-middle transition-all"
              >
                <GitHubLogoIcon className="w-6 h-6" />
              </Link>

              <ModeToggle />
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Header;
