import ROUTES from "@/constants/routes";

/** Sends the opener window (or this one, if there is no opener) to the login page. */
function goToLogin() {
  if (window.opener && !window.opener.closed) {
    window.opener.location.href = ROUTES.LOGIN;
    window.close();
  } else {
    window.location.href = ROUTES.LOGIN;
  }
}

/**
 * Top tabs of the application popups. Only the first (introduction) tab is public;
 * the others require login on the real site.
 */
export default function PopupTabs({ tabs }) {
  return (
    <ul className="tab_btn">
      {tabs.map((label, i) => (
        <li key={label} className={i === 0 ? "on" : undefined}>
          <button type="button" aria-current={i === 0 ? "page" : undefined} onClick={i === 0 ? undefined : goToLogin}>
            {label}
          </button>
        </li>
      ))}
    </ul>
  );
}
