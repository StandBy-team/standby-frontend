import { useState } from "react";
import SubLayout from "@/components/layout/SubLayout";
import { fetchTroop, fetchTroops, fetchTroopSido, fetchTroopSigungu } from "@/api/services/finder";
import useApi from "@/hooks/useApi";

export default function TroopFinder() {
  const [sido, setSido] = useState("");
  const [sigungu, setSigungu] = useState("");
  const [troopId, setTroopId] = useState("");

  const sidoList = useApi((opts) => fetchTroopSido(opts), []);
  const sigunguList = useApi((opts) => fetchTroopSigungu(sido, opts), [sido], { enabled: !!sido });
  const troopList = useApi((opts) => fetchTroops(sigungu, opts), [sigungu], { enabled: !!sigungu });
  const troop = useApi((opts) => fetchTroop(troopId, opts), [troopId], { enabled: !!troopId });

  return (
    <SubLayout title="예비군부대 찾기">
      <section>
        <table className="tbl troop-search">
          <caption>나의 예비군소속부대를 찾아보세요.</caption>
          <colgroup>
            <col style={{ width: 60 }} />
            <col />
            <col style={{ width: 60 }} />
            <col />
            <col style={{ width: 90 }} />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                <label htmlFor="p_adminSiDo">시/도</label>
              </th>
              <td>
                <select
                  id="p_adminSiDo"
                  className="sel-box"
                  value={sido}
                  onChange={(e) => {
                    setSido(e.target.value);
                    setSigungu("");
                    setTroopId("");
                  }}
                >
                  <option value="">시/도 선택하세요</option>
                  {sidoList.data?.map((s) => (
                    <option key={s.code} value={s.code}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </td>
              <th className="bl" scope="row">
                <label htmlFor="q_AdminGunGu">구/군</label>
              </th>
              <td>
                <select
                  id="q_AdminGunGu"
                  className="sel-box"
                  value={sigungu}
                  onChange={(e) => {
                    setSigungu(e.target.value);
                    setTroopId("");
                  }}
                >
                  <option value="">구/군 선택하세요</option>
                  {sigunguList.data?.map((s) => (
                    <option key={s.code} value={s.code}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </td>
              <th className="bl" scope="row">
                <label htmlFor="q_RfTroop">예비군 부대</label>
              </th>
              <td>
                <select
                  id="q_RfTroop"
                  className="sel-box"
                  style={{ width: 190 }}
                  value={troopId}
                  onChange={(e) => setTroopId(e.target.value)}
                >
                  <option value="">부대 선택하세요</option>
                  {troopList.data?.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <h4 className="cont-tit-h4">검색결과</h4>
      <table className="tbl type2">
        <caption>검색결과</caption>
        <colgroup>
          <col style={{ width: "33%" }} />
          <col style={{ width: "34%" }} />
          <col style={{ width: "33%" }} />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">소속부대명</th>
            <th scope="col">주소</th>
            <th scope="col">전화번호</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{troop.data?.name}</td>
            <td>{troop.data?.address}</td>
            <td>{troop.data?.phone}</td>
          </tr>
        </tbody>
      </table>
    </SubLayout>
  );
}
