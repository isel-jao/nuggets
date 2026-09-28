import { NavLink, Outlet } from "react-router";

const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
];

export function Layout() {
  return (
    <main className="flex flex-col">
      <nav className="bg-card px-4 py-2 flex gap-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className="px-4 py-2 rounded bg-foreground/5 text-muted-foreground"
          >
            {({ isActive }) => {
              return (
                <span className={isActive ? "font-bold text-foreground" : ""}>
                  {link.name}
                </span>
              );
            }}
          </NavLink>
        ))}
      </nav>

      <Outlet />
    </main>
  );
}
