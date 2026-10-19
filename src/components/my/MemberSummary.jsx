/** Greeting line and the "소속" table shared by the 나의 훈련정보 pages. */
export default function MemberSummary({ member, year, children }) {
  return (
    <>
      <p className="my-greeting">
        <strong>{member.name}</strong>님은 {year}년 현재{" "}
        <strong>예비군 {member.yearsOfService}년차</strong>입니다.
        {children}
      </p>
      <h4 className="cont-tit-h4">소속</h4>
      <table className="tbl type2">
        <caption>소속</caption>
        <colgroup>
          <col style={{ width: "15%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">예비군부대</th>
            <th scope="col">소속</th>
            <th scope="col">계급</th>
            <th scope="col">군번</th>
            <th scope="col">성명</th>
            <th scope="col">군별</th>
            <th scope="col">연차</th>
            <th scope="col">동원구분</th>
            <th scope="col">비고</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {member.unit.name}
              <br />
              <strong>({member.unit.phone})</strong>
            </td>
            <td>{member.unit.platoon}</td>
            <td>{member.rank}</td>
            <td>{member.serviceNo}</td>
            <td>{member.name}</td>
            <td>{member.branch}</td>
            <td>{member.yearsOfService}</td>
            <td>{member.mobilization}</td>
            <td />
          </tr>
        </tbody>
      </table>
    </>
  );
}
