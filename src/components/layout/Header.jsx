import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ROUTES from "@/constants/routes";
import { SECTIONS, findMenuTrail } from "@/constants/menu";
import Icon from "@/components/common/Icon";
import MenuLink from "@/components/common/MenuLink";
import SessionTimer from "./SessionTimer";
import NoticeBell from "./NoticeBell";
import FullMenu from "./FullMenu";
import useAuth from "@/hooks/useAuth";
import useDismiss from "@/hooks/useDismiss";

function UserMenu({ user }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useDismiss(open, () => setOpen(false));

  const onLogout = async () => {
    if (!window.confirm("로그 아웃하시겠습니까?")) return;
    await logout();
    navigate(ROUTES.MAIN, { replace: true });
  };

  return (
    <div className="hd-user" ref={ref}>
      <button
        type="button"
        className="hd-user-btn"
        aria-expanded={open}
        aria-controls="hd-user-menu"
        onClick={() => setOpen((o) => !o)}
      >
        <strong>{user.name}</strong> 님 환영합니다.
        <Icon name="chevronDown" size={14} />
      </button>
      {open && (
        <div id="hd-user-menu" className="hd-dropdown hd-user-menu">
          <dl className="hd-user-unit">
            <dt>소속부대</dt>
            <dd>{user.unit.name}</dd>
            <dt>연락처</dt>
            <dd>{user.unit.phone}</dd>
          </dl>
          <ul onClick={(e) => e.target.closest("a") && setOpen(false)}>
            <li>
              <Link to={ROUTES.MY_TRAINING}>나의 훈련정보</Link>
            </li>
            <li>
              <Link to={ROUTES.MY_PROFILE}>개인정보수정</Link>
            </li>
            <li>
              <button type="button" onClick={onLogout}>
                로그아웃
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

function UtilityBar() {
  const { user, extend } = useAuth();

  return (
    <div className="hd-util">
      <div className="wide hd-util-inner">
        <p className="hd-egov">
          <img src="/images/common/eg_logo.svg" alt="(전자정부)eg" />이 누리집은 대한민국 공식 전자정부 누리집입니다.
        </p>
        <ul className="hd-util-menu">
          {user ? (
            <>
              <li className="hd-session">
                <Icon name="clock" size={14} />
                <SessionTimer expiresAt={user.expiresAt} />
                <button type="button" className="hd-extend" onClick={extend}>
                  로그인 연장
                </button>
              </li>
              <li>
                <UserMenu user={user} />
              </li>
            </>
          ) : (
            <li>
              <Link to={ROUTES.LOGIN}>로그인</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

function MegaPanel({ section, current, onNavigate }) {
  return (
    <div className="hd-mega">
      <div className="wide hd-mega-inner">
        <p className="hd-mega-tit">{section.label}</p>
        <ul className="hd-mega-list">
          {section.items.map((item) => (
            <li key={item.label} className={current?.trail.includes(item) ? "active" : undefined}>
              <MenuLink item={item} className="hd-mega-link" onClick={onNavigate}>
                {item.gnbLabel ?? item.label}
              </MenuLink>
              {item.children && (
                <ul className="hd-mega-sub">
                  {item.children.map((child) => (
                    <li key={child.label} className={current?.trail.includes(child) ? "active" : undefined}>
                      <MenuLink item={child} onClick={onNavigate}>
                        {child.label}
                      </MenuLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Header() {
  const { pathname } = useLocation();
  const [openKey, setOpenKey] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const current = findMenuTrail(pathname);
  const close = () => setOpenKey(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenKey(null);
    setMenuOpen(false);
  }

  return (
    <>
      <div className="skip">
        <a href="#contents">본문 바로가기</a>
      </div>
      <header id="header">
        <UtilityBar />
        <nav
          className={`hd-gnb${scrolled ? " is-scrolled" : ""}${openKey ? " is-open" : ""}`}
          aria-label="주 메뉴"
          onMouseLeave={close}
          onKeyDown={(e) => e.key === "Escape" && close()}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) close();
          }}
        >
          <div className="wide hd-gnb-inner">
            <Link to={ROUTES.MAIN} className="hd-logo" onMouseEnter={close}>
              <img src="/images/login/login-img1.svg" alt="" />
              <strong className="hd-logo-name">
                <span className="sr-only">예비군</span>
                <span aria-hidden="true">예</span>
                <span aria-hidden="true">비</span>
                <span aria-hidden="true">군</span>
              </strong>
              <span className="hd-logo-sub" lang="en">
                REPUBLIC OF KOREA RESERVED FORCES
              </span>
            </Link>
            <ul className="hd-gnb-menu">
              {SECTIONS.map((section) => {
                const classes = [
                  current?.section.key === section.key && "active",
                  openKey === section.key && "open",
                ].filter(Boolean);
                return (
                  <li
                    key={section.key}
                    className={classes.join(" ") || undefined}
                    onMouseEnter={() => setOpenKey(section.key)}
                  >
                    <MenuLink
                      item={section.link ?? section.items[0]}
                      className="hd-gnb-link"
                      onFocus={() => setOpenKey(section.key)}
                      onClick={close}
                    >
                      {section.label}
                    </MenuLink>
                    {openKey === section.key && <MegaPanel section={section} current={current} onNavigate={close} />}
                  </li>
                );
              })}
            </ul>
            <div className="hd-actions" onMouseEnter={close}>
              <NoticeBell />
              <button
                type="button"
                className="hd-icon-btn"
                aria-label="전체메뉴 열기"
                aria-haspopup="dialog"
                onClick={() => setMenuOpen(true)}
              >
                <Icon name="menu" size={24} />
              </button>
            </div>
          </div>
        </nav>
      </header>
      <FullMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
