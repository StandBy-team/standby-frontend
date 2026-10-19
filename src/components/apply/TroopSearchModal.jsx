import { useState } from "react";
import Modal from "@/components/common/Modal";
import { fetchTroop, fetchTroops, fetchTroopSido, fetchTroopSigungu } from "@/api/services/finder";
import useApi from "@/hooks/useApi";

/** Picks the reserve unit that handles the application; `onSelect(troop)` receives { id, name, address, phone }. */
export default function TroopSearchModal({ onSelect, onClose }) {
  const [sido, setSido] = useState("");
  const [sigungu, setSigungu] = useState("");
  const [troopId, setTroopId] = useState("");

  const sidoList = useApi((opts) => fetchTroopSido(opts), []);
  const sigunguList = useApi((opts) => fetchTroopSigungu(sido, opts), [sido], { enabled: !!sido });
  const troopList = useApi((opts) => fetchTroops(sigungu, opts), [sigungu], { enabled: !!sigungu });
  const troop = useApi((opts) => fetchTroop(troopId, opts), [troopId], { enabled: !!troopId });

  const choose = () => {
    if (!troop.data) {
      window.alert("예비군부대를 선택하세요.");
      return;
    }
    onSelect(troop.data);
  };

  return (
    <Modal
      title="훈련신청 예비군부대 찾기"
      width={640}
      onClose={onClose}
      footer={
        <div className="btn-box">
          <button type="button" className="btn-gradient big blue" onClick={choose}>
            선택
          </button>{" "}
          <button type="button" className="btn-gradient big gray" onClick={onClose}>
            닫기
          </button>
        </div>
      }
    >
      <table className="tbl">
        <caption>예비군부대 검색조건</caption>
        <colgroup>
          <col style={{ width: 110 }} />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">
              <label htmlFor="pop_sido">시/도</label>
            </th>
            <td>
              <select
                id="pop_sido"
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
          </tr>
          <tr>
            <th scope="row">
              <label htmlFor="pop_sigungu">구/군</label>
            </th>
            <td>
              <select
                id="pop_sigungu"
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
          </tr>
          <tr>
            <th scope="row">
              <label htmlFor="pop_troop">예비군 부대</label>
            </th>
            <td>
              <select id="pop_troop" className="sel-box wd250" value={troopId} onChange={(e) => setTroopId(e.target.value)}>
                <option value="">부대 선택하세요</option>
                {troopList.data?.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          {troop.data && (
            <tr>
              <th scope="row">주소 / 전화번호</th>
              <td>
                {troop.data.address} / {troop.data.phone}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Modal>
  );
}
