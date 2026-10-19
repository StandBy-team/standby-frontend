import SubLayout from "@/components/layout/SubLayout";

export default function StaffSelection() {
  return (
    <SubLayout title="예비전력관리 업무담당자 선발">
      <section>
        <h4 className="cont-tit-h4">개요</h4>
        <ul className="txt-list bl_dot mb45">
          <li>예비전력관리 군무원 및 직장예비군지휘관의 선발</li>
        </ul>
      </section>{" "}
      <section className="section-box">
        <h4 className="cont-tit-h4 mt0">관련근거</h4>
        <ul className="txt-list bl_dot">
          <li>예비전력관리 업무담당자 선발 규칙</li>
          <li>예비전력관리 업무담당자 인사관리 훈령</li>
        </ul>
      </section>{" "}
      <section className="section-box">
        <h4 className="cont-tit-h4 mt0">선발시기</h4>
        <ul className="txt-list bl_dot">
          <li>연 2회(전반기, 후반기)</li>
        </ul>
      </section>{" "}
      <section className="section-box">
        <h4 className="cont-tit-h4 mt0">시험일정 등 세부사항</h4>
        <ul className="txt-list bl_dot">
          <li>
            육군
            <a href="https://isrs.army.mil.kr" target="_blank" rel="noopener noreferrer">
              (https://isrs.army.mil.kr)
            </a>
            {"//"}해군({" "}
            <a href="http://www.navy.mil.kr" target="_blank" rel="noopener noreferrer">
              http://www.navy.mil.kr
            </a>
            ) 공지사항 참고
          </li>
          <li>문의처: 수임군부대 또는 육군본부(☎042-550-5534)/해군본부(☎042-553-3522)</li>
        </ul>
      </section>
    </SubLayout>
  );
}
