/** Cautions shown above the unit Q&A and free board. */
export default function BoardComments() {
  return (
    <ul className="tbl-comments my-cautions" aria-label="작성 시 유의사항">
      <li>
        게시판에 글을 작성하실 때에는 <em>주민번호, 금융정보, 전화번호</em> 등의 개인정보는 유출위험이 있으니,{" "}
        <em>절대로 입력하지 마십시오.</em>
      </li>
      <li>
        질의응답 게시판의 신뢰성을 위해 담당자 또는 AI의{" "}
        <em>답변이 등록된 경우 작성하신 글은 수정/삭제하실 수 없으니</em> 주의 바랍니다.
      </li>
    </ul>
  );
}
