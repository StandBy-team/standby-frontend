const RESULT_TONES = { attend: "is-green", defer: "is-orange" };

/**
 * Training rows of the 나의 훈련정보 pages.
 * `scheduleState` colors the planned hours: 1 finished, 2 changeable, 3 not changeable.
 * `renderAction` fills the last column (certificate / call-up notice buttons).
 */
export default function TrainingTable({ id, rows, total, empty, actionLabel = "비고", renderAction }) {
  return (
    <table id={id} className="tbl type2">
      <caption>훈련내용</caption>
      <colgroup>
        <col />
        <col style={{ width: 80 }} />
        <col style={{ width: 60 }} />
        <col style={{ width: 60 }} />
        <col style={{ width: 60 }} />
        <col style={{ width: 60 }} />
        <col />
        <col style={{ width: 115 }} />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">구분</th>
          <th scope="col">훈련일자</th>
          <th scope="col">계획시간</th>
          <th scope="col">실시시간</th>
          <th scope="col">잔여시간</th>
          <th scope="col">훈련결과</th>
          <th scope="col">훈련장</th>
          <th scope="col">{actionLabel}</th>
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 && (
          <tr>
            <td colSpan={8}>{empty}</td>
          </tr>
        )}
        {total && rows.length > 0 && (
          <tr className="row-total">
            <td className="tal">총계</td>
            <td />
            <td>{rows.reduce((sum, r) => sum + r.plannedHours, 0)}</td>
            <td>{rows.reduce((sum, r) => sum + r.doneHours, 0)}</td>
            <td />
            <td />
            <td />
            <td />
          </tr>
        )}
        {rows.map((row) => (
          <tr key={row.id}>
            <td>
              {row.typeName} {row.round}
            </td>
            <td>{row.date}</td>
            <td>
              <span className={`state${row.scheduleState}`}>{row.plannedHours}</span>
            </td>
            <td>{row.doneHours}</td>
            <td>{row.remainingHours}</td>
            <td>{row.result && <span className={`ui-badge ${RESULT_TONES[row.resultType] ?? ""}`}>{row.result}</span>}</td>
            <td>{row.center}</td>
            <td>{renderAction?.(row)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
