import { config } from "@/config";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import LoadingPage from "../loading";

const GlobalLayout = lazy(() => import("../layout"));
const HomePage = lazy(() => import("../home"));
const NotFoundPage = lazy(() => import("../not-found"));
const DevPage = lazy(() => import("../dev"));
const UserOnMountPage = lazy(() => import("../custom-hooks/use-on-mount"));
const UsePrevPage = lazy(() => import("../custom-hooks/use-prev"));

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route element={<GlobalLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/custom-hooks">
              <Route path="use-on-mount" element={<UserOnMountPage />} />
              <Route path="use-prev" element={<UsePrevPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
            {config.environment === "development" && (
              <Route path="/dev" element={<DevPage />} />
            )}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
