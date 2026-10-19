import { useState } from "react";
import { Link } from "react-router-dom";
import { FOOTER_TEXT_LINKS, FOOTER_ORG_LINKS, FOOTER_APP_LINKS, POPUPS } from "@/constants/menu";
import Icon from "@/components/common/Icon";
import MenuLink from "@/components/common/MenuLink";
import { fetchSiteInfo } from "@/api/services/site";
import useApi from "@/hooks/useApi";

const ExternalImageLink = ({ link }) => (
  <a href={link.href} target="_blank" rel="noopener noreferrer">
    <img src={link.image} alt={link.alt} />
  </a>
);

function RelatedSites({ group, index }) {
  const [href, setHref] = useState("");
  const id = `ft-related-${index}`;

  return (
    <form
      className="ft-related"
      onSubmit={(e) => {
        e.preventDefault();
        if (href) window.open(href, "_blank", "noopener,noreferrer");
      }}
    >
      <label htmlFor={id} className="sr-only">
        {group.group}
      </label>
      <select id={id} value={href} onChange={(e) => setHref(e.target.value)}>
        <option value="">{group.group}</option>
        {group.items.map((site) => (
          <option key={site.href} value={site.href}>
            {site.label}
          </option>
        ))}
      </select>
      <button type="submit" disabled={!href} title={`${group.group} 새 창으로 이동`}>
        이동
      </button>
    </form>
  );
}

export default function Footer() {
  const { data: info } = useApi((opts) => fetchSiteInfo(opts), []);

  return (
    <footer id="footer" className="ft">
      <div className="ft-top">
        <div className="wide ft-top-inner">
          <ul className="ft-links">
            <li>
              <MenuLink item={{ label: "개인정보처리방침", popup: POPUPS.privacy }} className="ft-privacy" />
            </li>
            {FOOTER_TEXT_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
          {info && (
            <div className="ft-related-list">
              {info.relatedSites.map((group, i) => (
                <RelatedSites key={group.group} group={group} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="wide ft-main">
        <div className="ft-info">
          {info && (
            <address>
              <span>
                ({info.postcode}) {info.address}
              </span>
              <span>{info.owner}</span>
              <span>대표전화 {info.phone}</span>
            </address>
          )}
          <p className="ft-warning">
            부당한 방법으로 전산망에 접속하거나 정보를 삭제/변경/유출하는 자는 관계법령에 따라 처벌 받게 됩니다.
          </p>
          <p className="ft-copy">Copyright © 국방부 예비전력정책관실 All rights Reserved</p>
        </div>
        {info && (
          <ul className="ft-sns" aria-label="국방부 공식 SNS">
            {info.sns.map((sns) => (
              <li key={sns.key}>
                <a href={sns.href} target="_blank" rel="noopener noreferrer" title={`${sns.label} (새 창)`}>
                  <Icon name={sns.key} size={20} label={sns.label} />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="ft-bottom">
        <div className="wide ft-bottom-inner">
          <ul className="ft-orgs">
            {FOOTER_ORG_LINKS.map((link) => (
              <li key={link.href}>
                <ExternalImageLink link={link} />
              </li>
            ))}
          </ul>
          <div className="ft-apps">
            <span>모바일 앱 다운로드</span>
            <ul>
              {FOOTER_APP_LINKS.map((link) => (
                <li key={link.href}>
                  <ExternalImageLink link={link} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
