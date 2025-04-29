import { Link, Outlet, useLocation } from "react-router";
import { Toaster } from "sonner";
import { links } from "@/components/app-sidebar/data";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function useActiveLink() {
  const { pathname } = useLocation();
  const link = links.find(
    (link) =>
      link.url === pathname ||
      link.items?.some((item) => item.url === pathname),
  );

  const subLink = link?.items?.find((item) => item.url === pathname);

  return {
    link,
    subLink,
  };
}

import React from "react";
import { twMerge } from "tailwind-merge";

interface SideBarProps extends React.HTMLAttributes<HTMLElement> {
  ref?: React.RefObject<HTMLDivElement | null>;
}

export function SideBar({ className, ...props }: SideBarProps) {
  const [search, setSearch] = React.useState("");
  let filteredLinks = links.filter((item) => {
    if (item.items?.length) {
      const filteredItems = item.items.filter((subItem) =>
        subItem.title.toLowerCase().includes(search.toLowerCase()),
      );
      return filteredItems.length > 0;
    }
    return item.title.toLowerCase().includes(search.toLowerCase());
  });

  filteredLinks = filteredLinks.map((item) => {
    if (item.items?.length) {
      const filteredItems = item.items.filter((subItem) =>
        subItem.title.toLowerCase().includes(search.toLowerCase()),
      );
      return { ...item, items: filteredItems };
    }
    return item;
  });

  return (
    <nav
      {...props}
      className={twMerge(
        "bg-card fixed top-0 left-0 h-full w-[var(--sidebar-width)] p-4",
        className,
      )}
    >
      <Input
        placeholder="Search"
        className="mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredLinks.map((item) => {
        if (item.items?.length)
          return (
            <div className="flex flex-col">
              <span>{item.title}</span>
              {item.items.map((item) => (
                <Link
                  to={item.url}
                  className="hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-md p-2"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          );
        if (item.url)
          return (
            <Link
              to={item.url}
              className="hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-md p-2"
            >
              {item.title}
            </Link>
          );
      })}
    </nav>
  );
}

export default function Page() {
  const { link, subLink } = useActiveLink();
  return (
    <>
      <main
        className={cn(
          "[--sidebar-width:14rem] [--up-bar-height:4rem]",
          "[&>*:nth-child(3)]:p-6 [&>*:nth-child(3)]:pt-[calc(var(--up-bar-height)+1rem)] [&>*:nth-child(3)]:pl-[calc(var(--sidebar-width)+1rem)]",
        )}
      >
        <SideBar className="z-10" />
        <div className="fixed top-0 right-0 z-10 flex h-[var(--up-bar-height)] w-[calc(100%-var(--sidebar-width))] items-center border-b px-4">
          <div className="flex items-center gap-2">
            <span>{link?.title}</span>
            {subLink && (
              <>
                <span>/</span>
                <span>{subLink.title}</span>
              </>
            )}
          </div>
        </div>
        <Outlet />
      </main>
      <Toaster />
    </>
  );
}
