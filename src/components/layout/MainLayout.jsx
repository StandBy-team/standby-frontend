import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ROUTES from "@/constants/routes";
import Header from "./Header";
import Footer from "./Footer";
import ChatbotBanner from "./ChatbotBanner";

export default function MainLayout() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return (
    <div id="wrap">
      <Header />
      <div id="contents" tabIndex={-1} className={pathname === ROUTES.MAIN ? "is-home" : undefined}>
        <Outlet />
      </div>
      <Footer />
      <ChatbotBanner />
    </div>
  );
}
