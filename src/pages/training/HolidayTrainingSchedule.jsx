import { useState } from "react";
import SubLayout from "@/components/layout/SubLayout";
import { fetchRegions } from "@/api/services/finder";
import { fetchHolidayTrainings, fetchTrainingTypes } from "@/api/services/training";
import useApi from "@/hooks/useApi";

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const EMPTY_FORM = { sido: "", month: "", type: "", keyword: "", onlyScheduled: false };

// "2026-09-05" -> "09/5", matching the legacy page
const toMMDD = (date) => `${date.slice(5, 7)}/${Number(date.slice(8, 10))}`;

const formatSchedule = ({ start, end }) => `[${toMMDD(start)}${start === end ? "" : `~${toMMDD(end)}`}]`;

export default function HolidayTrainingSchedule() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [criteria, setCriteria] = useState(null);

  const regions = useApi((opts) => fetchRegions(opts), []);
  const types = useApi((opts) => fetchTrainingTypes(opts), []);
  const result = useApi((opts) => fetchHolidayTrainings(criteria, opts), [criteria], { enabled: !!criteria });

  const set = (key) => (e) =>
    setForm({ ...form, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const search = () => {
    if (!form.sido) {
      window.alert("지역을 선택 후 조회해주시기 바랍니다.");
      return;
    }
    setCriteria({ ...form, keyword: form.keyword.trim() });
  };

  const reset = () => {
    if (!window.confirm("조회 조건을 초기화하시겠습니까?")) return;
    setForm(EMPTY_FORM);
    setCriteria(null);
  };

  return (
    <SubLayout title="휴일예비군 훈련일정 조회">
      <section>
        <table className="tbl">
          <caption>휴일예비군 훈련일정 검색조건</caption>
          <colgroup>
            <col style={{ width: 100 }} />
            <col />
            <col style={{ width: 100 }} />
            <col />
            <col style={{ width: 100 }} />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                <label htmlFor="amnAddId">
                  지역<span className="txt-red">*</span>
                </label>
              </th>
              <td>
                <select id="amnAddId" className="sel-box" value={form.sido} onChange={set("sido")}>
                  <option value="">선택하세요</option>
                  {regions.data?.map((r) => (
                    <option key={r.code} value={r.code}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </td>
              <th scope="row" className="bl">
                <label htmlFor="month">월</label>
              </th>
              <td>
                <select id="month" className="sel-box" value={form.month} onChange={set("month")}>
                  <option value="">전체</option>
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>
                      {m}월
                    </option>
                  ))}
                </select>
              </td>
              <th scope="row" className="bl">
                <label htmlFor="traTypeCd">훈련 유형</label>
              </th>
              <td>
                <select id="traTypeCd" className="sel-box" value={form.type} onChange={set("type")}>
                  <option value="">전체</option>
                  {types.data?.map((t) => (
                    <option key={t.code} value={t.code}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <label htmlFor="traCenterNm">훈련장 이름</label>
              </th>
              <td colSpan={5}>
                <input
                  id="traCenterNm"
                  className="inp-box wd220"
                  type="text"
                  maxLength={35}
                  value={form.keyword}
                  onChange={set("keyword")}
                  onKeyDown={(e) => e.key === "Enter" && search()}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt10">
          <input type="checkbox" id="cb_filterTraExists" checked={form.onlyScheduled} onChange={set("onlyScheduled")} />{" "}
          <label htmlFor="cb_filterTraExists">훈련 정보가 있는 훈련장만 조회</label>
        </div>
        <div className="btn-box" style={{ margin: "30px 0" }}>
          <button type="button" className="btn-gradient big blue" onClick={search}>
            조회
          </button>{" "}
          <button type="button" className="btn-gradient big blue" style={{ fontSize: 12 }} onClick={reset}>
            검색조건
            <br />
            초기화
          </button>
        </div>
      </section>
      <section>
        <h4 className="cont-tit-h4">휴일예비군 훈련일정</h4>
        <div className="m_comm">※ 훈련일정이 있는 경우 훈련장 이름이 파란색으로 표시됩니다.</div>
        {result.data && <div className="table-info">총 {result.data.length} 건이 조회되었습니다.</div>}
        <div className={result.data ? "holiday-scroll" : undefined}>
          <table className="holidayTraScheduleType">
            <caption>휴일예비군 훈련일정</caption>
            <thead>
              <tr>
                <th scope="col">훈련장 이름 / 훈련장 주소 / 훈련 일정</th>
              </tr>
            </thead>
            <tbody>
              {result.data?.length === 0 && (
                <tr>
                  <td className="empty">해당 지역에는 등록된 훈련 일정이 존재하지 않습니다.</td>
                </tr>
              )}
              {result.data?.map((t) => (
                <tr key={t.id}>
                  <td>
                    <span className={t.schedules.length ? "txt-blue" : undefined}>
                      <b>{t.centerName}</b>
                    </span>
                    <br />
                    <span className="center-addr">{t.address}</span>
                    <br />
                    {t.schedules.length === 0 ? (
                      <div className="no-schedule">훈련 정보가 존재하지 않습니다.</div>
                    ) : (
                      <div className="schedule">
                        <b> • {t.trainingTypeName}: </b>
                        {t.schedules.map(formatSchedule).join(", ")}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h4 className="cont-tit-h4 txt-blue">유의사항</h4>
        <ul className="txt-list bl_hyphen">
          <li>훈련장 여건에 따라 향후 훈련 일정이 변경될 수 있는 점 참고 바랍니다.</li>
        </ul>
      </section>
    </SubLayout>
  );
}
