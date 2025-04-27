import NotFoundImage from "@/assets/images/not-found.svg?react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <NotFoundImage className="h-fit w-[min(90vw,30rem)]" />
      <h1 className="flex items-center gap-2">
        <span className="text-4xl font-bold">404</span>
        <span className="text-secondary-foreground text-2xl font-bold">
          Not Found
        </span>
      </h1>
      <p className="text-secondary-foreground">
        The page you are looking for does not exist.
      </p>
      <p className="text-secondary-foreground">
        Please check the URL or return to the home page.
      </p>
      <Link to="/">
        <Button variant="link">
          <span className="text-primary">Go to Home</span>
        </Button>
      </Link>
    </main>
  );
}
