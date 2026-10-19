import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SubLayout from "@/components/layout/SubLayout";
import Pagination from "@/components/common/Pagination";
import { fetchRegions, fetchTrainingCenters, trainingCenterPlanUrl } from "@/api/services/finder";
import { MMA_LINK } from "@/constants/menu";
import ROUTES from "@/constants/routes";
import useApi from "@/hooks/useApi";
import { openPopup } from "@/utils/popup";

/** Number of following rows sharing the same key, for rowSpan merging (0 = merged into the row above). */
function spans(rows, keyOf) {
  return rows.map((row, i) => {
    if (i > 0 && keyOf(rows[i - 1]) === keyOf(row)) return 0;
    let n = 1;
    while (i + n < rows.length && keyOf(rows[i + n]) === keyOf(row)) n += 1;
    return n;
  });
}

function openMap(center) {
  if (!center.location) {
    window.alert("서비스불가\n등록되지 않은 예비군훈련장입니다.");
    return;
  }
  const name = center.name.replaceAll(",", "");
  const [lat, lng] = center.location;
  window.open(`https://map.kakao.com/link/map/${name},${lat},${lng}`, "KakaoMap", "width=1400,height=700");
}

function openImage(center) {
  openPopup({
    path: ROUTES.POPUP_TRAINING_CENTER_IMAGE.replace(":id", center.id),
    name: "TrainingCenterImage",
    width: 1400,
    height: 850,
  });
}

function openPlan(center) {
  if (!center.hasPlan) {
    window.alert("등록된 훈련장 계획이 없습니다.");
    return;
  }
  window.open(trainingCenterPlanUrl(center.id), "ucplan");
}

export default function TrainingCenterFinder() {
  const [params, setParams] = useSearchParams();
  const sido = params.get("sido") || "";
  const keyword = params.get("keyword") || "";
  const page = Number(params.get("page")) || 1;

  const [form, setForm] = useState({ sido, keyword });
  const [synced, setSynced] = useState({ sido, keyword });
  if (synced.sido !== sido || synced.keyword !== keyword) {
    setSynced({ sido, keyword });
    setForm({ sido, keyword });
  }

  const regions = useApi((opts) => fetchRegions(opts), []);
  const list = useApi((opts) => fetchTrainingCenters({ sido, keyword, page }, opts), [sido, keyword, page]);

  const apply = (next) => {
    const search = new URLSearchParams();
    Object.entries(next).forEach(([k, v]) => v && search.set(k, v));
    setParams(search);
  };

  const rows = list.data?.items ?? [];
  const sidoSpans = spans(rows, (r) => r.sidoName);
  const zoneSpans = spans(rows, (r) => `${r.sidoName}/${r.zone}`);

  return (
    <SubLayout title="예비군 훈련장 찾기">
      <div className="map-wrap">
        <p className="tit">훈련 희망 지역을 목록에서 선택하시기 바랍니다.</p>
        <div className="map_box">
          <div className="m_wrap">
            <div className="m_left">시/도 선택</div>
            <div className="m_list">
              <ul className="sel_list">
                {regions.data?.map((r) => (
                  <li key={r.code}>
                    <button type="button" onClick={() => apply({ sido: r.code })}>
                      {r.shortName}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="m_comm">
              ※ 동원훈련장(2박3일) 조회는 병무청 웹사이트를 참조하세요.&nbsp;&nbsp;&nbsp;
              <a href={MMA_LINK} target="_blank" rel="noopener noreferrer">
                <img src="/images/btn/btn-mmago.svg" alt="병무청 바로가기" />
              </a>
            </div>
          </div>
        </div>
        <form
          className="search-box"
          onSubmit={(e) => {
            e.preventDefault();
            apply({ sido: form.sido, keyword: form.keyword.trim() });
          }}
        >
          <label htmlFor="p_amnAddId">시/도</label>{" "}
          <select
            id="p_amnAddId"
            className="sel-box"
            style={{ width: 120 }}
            value={form.sido}
            onChange={(e) => setForm({ ...form, sido: e.target.value })}
          >
            <option value="">선택하세요</option>
            {regions.data?.map((r) => (
              <option key={r.code} value={r.code}>
                {r.name}
              </option>
            ))}
          </select>{" "}
          <label htmlFor="searchKeyword">훈련장명</label>{" "}
          <input
            id="searchKeyword"
            className="inp-box wd220"
            type="text"
            maxLength={35}
            value={form.keyword}
            onChange={(e) => setForm({ ...form, keyword: e.target.value })}
          />{" "}
          <button type="button" className="btn-gradient normal gray" onClick={() => apply({})}>
            초기화
          </button>{" "}
          <button type="submit" className="btn-gradient normal blue">
            검색
          </button>
        </form>
      </div>
      <br />
      <div className="m_comm">※ 훈련계획이 등록된 경우 파란색으로 표시됩니다.</div>
      <table className="dtable cell-border training-centers">
        <caption>훈련장 목록으로 시/도, 구/군, 훈련장, 주소 정보를 제공</caption>
        <colgroup>
          <col style={{ width: "11%" }} />
          <col style={{ width: "11%" }} />
          <col style={{ width: "36%" }} />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">시/도</th>
            <th scope="col">구/군</th>
            <th scope="col">훈련장</th>
            <th scope="col">주소</th>
          </tr>
        </thead>
        <tbody>
          {list.data && rows.length === 0 && (
            <tr>
              <td colSpan={4} className="empty">
                검색 결과가 없습니다.
              </td>
            </tr>
          )}
          {rows.map((center, i) => (
            <tr key={center.id}>
              {sidoSpans[i] > 0 && (
                <td rowSpan={sidoSpans[i]} className="bln">
                  {center.sidoName}
                </td>
              )}
              {zoneSpans[i] > 0 && <td rowSpan={zoneSpans[i]}>{center.zone}</td>}
              <td>
                <p className="centeronly">{center.name}</p>
                <button type="button" className="btn-gradient small gray" onClick={() => openMap(center)}>
                  지도보기
                </button>{" "}
                <button type="button" className="btn-gradient small gray" onClick={() => openImage(center)}>
                  이미지보기
                </button>{" "}
                <button
                  type="button"
                  className={`btn-gradient small ${center.hasPlan ? "blue" : "gray"}`}
                  onClick={() => openPlan(center)}
                >
                  훈련계획
                </button>
              </td>
              <td>{center.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {list.data && (
        <Pagination
          page={list.data.page}
          size={list.data.size}
          total={list.data.total}
          onChange={(p) => apply({ sido, keyword, page: String(p) })}
        />
      )}
    </SubLayout>
  );
}
