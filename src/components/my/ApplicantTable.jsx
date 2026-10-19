/** "본인 / 병역사항" block shown on the deferral and hold application pages. */
export default function ApplicantTable({ profile }) {
  return (
    <table className="tbl th-c">
      <caption>신청인 정보</caption>
      <colgroup>
        <col style={{ width: 70 }} />
        <col style={{ width: 110 }} />
        <col />
        <col style={{ width: 110 }} />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <th scope="row" rowSpan={4}>
            본인
          </th>
          <th scope="row" className="bl">
            성명
          </th>
          <td>{profile.name}</td>
          <th scope="row" className="bl">
            생년월일
          </th>
          <td>{profile.birthDate}</td>
        </tr>
        <tr>
          <th scope="row" className="bl">
            주소
          </th>
          <td colSpan={3}>{profile.address}</td>
        </tr>
        <tr>
          <th scope="row" className="bl">
            휴대전화
          </th>
          <td>{profile.cellPhone}</td>
          <th scope="row" className="bl">
            세대주(관계)
          </th>
          <td>{profile.familyMaster}</td>
        </tr>
        <tr>
          <th scope="row" className="bl">
            직장 전화번호
          </th>
          <td>{profile.companyPhone}</td>
          <th scope="row" className="bl">
            집 전화번호
          </th>
          <td>{profile.homePhone}</td>
        </tr>
        <tr>
          <th scope="row" rowSpan={3}>
            병역
            <br />
            사항
          </th>
          <th scope="row" className="bl">
            군별
          </th>
          <td>{profile.branch}</td>
          <th scope="row" className="bl">
            역종
          </th>
          <td>{profile.serviceType}</td>
        </tr>
        <tr>
          <th scope="row" className="bl">
            계급
          </th>
          <td>{profile.rank}</td>
          <th scope="row" className="bl">
            군번
          </th>
          <td>{profile.serviceNo}</td>
        </tr>
        <tr>
          <th scope="row" className="bl">
            소속 및 직책
          </th>
          <td colSpan={3}>
            {profile.unit.platoon} / {profile.position}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
