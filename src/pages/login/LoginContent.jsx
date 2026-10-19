import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SubLayout from "@/components/layout/SubLayout";
import { MAIN_SIMPLE_AUTH_ICONS } from "@/constants/menu";
import ROUTES from "@/constants/routes";
import { TRAINING_INFO_POPUP_KEY } from "@/constants/storage";
import useAuth from "@/hooks/useAuth";
import { setSessionItem } from "@/utils/storage";

/**
 * Login page. Each button runs one identity verification method; the real verification
 * (third-party windows) happens behind POST /auth/login on the backend.
 */
export default function LoginContent({ intro }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [pending, setPending] = useState(false);

  const signIn = (method) => async () => {
    setPending(true);
    try {
      await login(method);
      setSessionItem(TRAINING_INFO_POPUP_KEY, true);
      const from = location.state?.from;
      navigate(from ? `${from.pathname}${from.search ?? ""}` : ROUTES.MAIN, { replace: true });
    } catch (error) {
      window.alert(error.message);
      setPending(false);
    }
  };

  return (
    <SubLayout title="로그인" subText="간편인증, 휴대폰 본인인증, 아이핀 인증을 통해 로그인 해주십시오.">
      <section>
        <div className="login-cont-box">
          <span className="img">
            <img src="/images/login/login-img1.svg" alt="예비군 마크" />
          </span>
          <div className="txt">
            <p>
              {intro} 메뉴를 이용하시려면 본인 확인이 필요하며 간편인증, 휴대폰 본인인증, 아이핀을 통해 로그인 하셔야
              합니다.
            </p>
          </div>
        </div>
        <div className="login-box4">
          <div className="box">
            <div className="title">간편인증(카카오,KB국민은행,통신사패스,삼성패스,네이버,신한은행)</div>
            <hr className="mt-mb-10" />
            <div className="content tac">
              <div className="text">
                카카오톡, KB국민은행, 통신사패스, 삼성패스, 네이버, 신한은행을 <br /> 이용하여 로그인 하실 수 있습니다.
              </div>
              <div className="auth-icons">
                {MAIN_SIMPLE_AUTH_ICONS.map((icon) => (
                  <img key={icon.name} src={icon.image} alt={icon.name} />
                ))}
              </div>
              <button type="button" className="login-btn theme-blue" disabled={pending} onClick={signIn("simple")}>
                간편인증 로그인
              </button>
            </div>
          </div>
          <div className="box">
            <div className="title">휴대폰 본인인증</div>
            <hr className="mt-mb-10" />
            <div className="content">
              <div className="text">
                * 본인 명의의 휴대폰을 이용하여 본인 확인 후 로그인하여 주십시오. <br /> * 통신사에서 본인확인 시스템
                유지보수를 진행할 경우 본인인증이 정상적으로 이루어지지 않을 수 있으며, 이 경우 간편인증 등 대체 수단을
                활용하여 로그인하시기 바랍니다.
              </div>
              <div className="text tac mt20">
                <b>이용문의 : </b> 1644-1863
              </div>
            </div>
            <div className="tac">
              <button type="button" className="login-btn theme-blue" disabled={pending} onClick={signIn("phone")}>
                휴대폰 본인인증 로그인
              </button>
            </div>
          </div>
          <div className="box">
            <div className="title">아이핀</div>
            <hr className="mt-mb-10" />
            <div className="content">
              <div className="text">* 아이핀을 이용하실 분들은 발급받은 아이핀으로 로그인하여 주십시오.</div>
              <div className="text tac mt20">
                <b>이용문의 : </b> 1644-1863
              </div>
            </div>
            <div className="tac">
              <button type="button" className="login-btn theme-blue" disabled={pending} onClick={signIn("ipin")}>
                아이핀(i-PIN) 인증 로그인
              </button>
            </div>
          </div>
        </div>
        <table className="tbl type2 mt20">
          <caption>플러그인 프로그램 목록으로 프로그램명, 기능, 사용여부 정보를 제공</caption>
          <thead>
            <tr>
              <th scope="col">프로그램명</th>
              <th className="bl" scope="col">
                기능
              </th>
              <th className="bl" scope="col">
                설치 및 사용
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                키보드 보안
                <br />
                (nProtect Online Security)
              </td>
              <td className="bl">키보드보안 프로그램</td>
              <td className="bl">
                <button type="button" className="key-security-btn theme-blue">
                  사용
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="ref-txt">※ 해킹 등 보안상 키보드보안이 필요한 경우 &apos;사용&apos; 버튼을 클릭하십시오.</div>
      </section>
    </SubLayout>
  );
}
