import { Link } from "react-router-dom";
import ROUTES from "@/constants/routes";
import { MAIN_SIMPLE_AUTH_ICONS } from "@/constants/menu";
import Icon from "@/components/common/Icon";
import { fetchMyTraining } from "@/api/services/my";
import useApi from "@/hooks/useApi";
import useAuth from "@/hooks/useAuth";
import { today } from "@/utils/date";

// Training dates look like "2026.11.18" or "2026.04.07~2026.04.09"; compare by start date.
const startDate = (training) => training.date.slice(0, 10).replaceAll(".", "-");

const nextTraining = (trainings) =>
  trainings
    .filter((t) => startDate(t) >= today())
    .sort((a, b) => startDate(a).localeCompare(startDate(b)))[0];

function LoginCard() {
  return (
    <aside className="home-card home-login" aria-labelledby="home-login-tit">
      <p className="home-card-kicker">예비군 개인 서비스</p>
      <h2 id="home-login-tit" className="home-login-tit">
        로그인하고
        <br />
        나의 훈련정보를 확인하세요
      </h2>
      <ul className="home-login-icons" aria-label="간편인증 제공기관">
        {MAIN_SIMPLE_AUTH_ICONS.map((icon) => (
          <li key={icon.name}>
            <img src={icon.image} alt={icon.name} />
          </li>
        ))}
      </ul>
      <Link to={ROUTES.LOGIN} className="ui-btn ui-btn-primary ui-btn-block">
        간편인증 로그인
      </Link>
      <p className="home-login-alt">
        <Link to={ROUTES.LOGIN}>휴대폰 본인인증</Link>
        <Link to={ROUTES.LOGIN}>아이핀</Link>
      </p>
    </aside>
  );
}

function MemberCard({ user }) {
  const { data, error } = useApi((opts) => fetchMyTraining(opts), [user.name]);
  const upcoming = data && nextTraining(data.trainings);

  return (
    <aside className="home-card home-me" aria-labelledby="home-me-tit">
      <p className="home-card-kicker">{user.unit.name}</p>
      <h2 id="home-me-tit" className="home-me-hello">
        <strong>{user.name}</strong> 님
      </h2>
      <div className="home-me-next">
        <p className="home-me-label">
          <Icon name="calendar" size={16} />
          다가오는 훈련
        </p>
        {error && <p className="home-me-empty">훈련정보를 불러오지 못했습니다.</p>}
        {!data && !error && <div className="home-skeleton" role="status" aria-busy="true" aria-label="불러오는 중"><span /><span /></div>}
        {data &&
          (upcoming ? (
            <>
              <p className="home-me-type">
                {upcoming.typeName} {upcoming.round}
              </p>
              <p className="home-me-date">{upcoming.date}</p>
              <p className="home-me-center">{upcoming.center}</p>
            </>
          ) : (
            <p className="home-me-empty">예정된 훈련이 없습니다.</p>
          ))}
      </div>
      <ul className="home-me-links">
        <li>
          <Link to={ROUTES.MY_TRAINING}>
            나의 훈련정보
            <Icon name="chevronRight" size={16} />
          </Link>
        </li>
        <li>
          <Link to={ROUTES.MY_UNIT_NOTICES}>
            소속부대 공지사항
            <Icon name="chevronRight" size={16} />
          </Link>
        </li>
        <li>
          <Link to={ROUTES.MY_QNA}>
            나의 질의응답
            <Icon name="chevronRight" size={16} />
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default function PersonalCard() {
  const { user } = useAuth();
  return user ? <MemberCard user={user} /> : <LoginCard />;
}
