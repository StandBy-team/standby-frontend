import { Link } from "react-router-dom";
import ROUTES from "@/constants/routes";
import useAuth from "@/hooks/useAuth";
import { openPopup } from "@/utils/popup";

/** Renders a menu item from constants/menu.js as a router link, external link or popup opener. */
export default function MenuLink({ item, children, className, onClick, ...rest }) {
  const { user } = useAuth();
  const content = children ?? item.label;

  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
        {content}
      </a>
    );
  }

  if (item.popup) {
    return (
      <a
        href={item.popup.path}
        className={className}
        onClick={(e) => {
          e.preventDefault();
          onClick?.(e);
          openPopup(item.popup);
        }}
        {...rest}
      >
        {content}
      </a>
    );
  }

  // Login-only pages go through the login page, which returns here afterwards.
  const loginFirst = item.auth && !item.locked && !user;

  return (
    <Link
      to={loginFirst ? ROUTES.LOGIN : item.path}
      state={loginFirst ? { from: { pathname: item.path } } : undefined}
      className={className}
      onClick={onClick}
      {...rest}
    >
      {content}
    </Link>
  );
}
