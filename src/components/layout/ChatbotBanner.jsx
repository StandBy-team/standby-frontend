import { useState } from "react";
import { Link } from "react-router-dom";
import ROUTES from "@/constants/routes";
import { CHATBOT_LINK } from "@/constants/menu";
import Icon from "@/components/common/Icon";
import useAuth from "@/hooks/useAuth";
import { getSessionItem, setSessionItem } from "@/utils/storage";

const STATE_KEY = "blinker_banner_state";

export default function ChatbotBanner() {
  const { user } = useAuth();
  const [minimized, setMinimized] = useState(() => getSessionItem(STATE_KEY) === "min");

  const toggle = () => {
    const next = !minimized;
    setMinimized(next);
    setSessionItem(STATE_KEY, next ? "min" : "open");
  };

  return (
    <div className={`chatbot-fab${minimized ? " is-min" : ""}`}>
      {!minimized && (
        <div className={`chatbot-fab-bar${user ? " is-wide" : ""}`}>
          <a href={CHATBOT_LINK} target="_blank" rel="noopener noreferrer" className="chatbot-fab-link" title="챗봇 (새 창)">
            <Icon name="chat" size={24} />
            <span>챗봇 상담</span>
          </a>
          {user && (
            <Link to={ROUTES.MY_QNA} className="chatbot-fab-link chatbot-fab-qna">
              <span>질의응답</span>
              <Icon name="arrowRight" size={18} />
            </Link>
          )}
        </div>
      )}
      <button
        type="button"
        className="chatbot-fab-toggle"
        onClick={toggle}
        aria-label={minimized ? "챗봇 버튼 펼치기" : "챗봇 버튼 접기"}
      >
        <Icon name={minimized ? "chat" : "close"} size={minimized ? 22 : 14} />
      </button>
    </div>
  );
}
