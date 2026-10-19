import LoginContent from "./LoginContent";

export default function Login() {
  return (
    <LoginContent
      intro={
        <>
          <span className="txt-blue">나의 훈련정보, 훈련신청, 훈련 연기신청, 소집보류 및 해소 신청</span>
          <br />
        </>
      }
    />
  );
}
