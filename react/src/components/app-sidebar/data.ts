type SidebarGroup = {
  title: string;
  url?: string;
  items?: {
    title: string;
    url: string;
    isActive?: boolean;
  }[];
};

export const links: SidebarGroup[] = [
  {
    title: "React Hooks",
    items: [
      {
        title: "useDeferredValue",
        url: "/react-hooks/use-deferred-value",
      },
      {
        title: "useImperativeHandle",
        url: "/react-hooks/use-imperative-handle",
      },
    ],
  },
  {
    title: "Custom Hooks",
    items: [
      {
        title: "useOnMount",
        url: "/custom-hooks/use-on-mount",
      },
      {
        title: "usePrev",
        url: "/custom-hooks/use-prev",
      },
    ],
  },
  {
    title: "dev",
    url: "/dev",
  },
];
