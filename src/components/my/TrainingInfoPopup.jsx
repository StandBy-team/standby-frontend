import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "@/components/common/Modal";
import { fetchMyTraining } from "@/api/services/my";
import ROUTES from "@/constants/routes";
import { TRAINING_INFO_POPUP_KEY } from "@/constants/storage";
import useApi from "@/hooks/useApi";
import useAuth from "@/hooks/useAuth";
import { getSessionItem, removeSessionItem } from "@/utils/storage";

/** "나의 훈련정보" summary shown once on the main page right after login. */
export default function TrainingInfoPopup() {
  const { user } = useAuth();
  const [open, setOpen] = useState(() => getSessionItem(TRAINING_INFO_POPUP_KEY) === true);
  const show = open && !!user;
  const { data } = useApi((opts) => fetchMyTraining(opts), [], { enabled: show });

  if (!show || !data) return null;

  const close = () => {
    removeSessionItem(TRAINING_INFO_POPUP_KEY);
    setOpen(false);
  };

  return (
    <Modal title="나의 훈련정보" width={480} onClose={close}>
      <table className="tbl type2">
        <caption>훈련내용</caption>
        <colgroup>
          <col style={{ width: "50%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">구분</th>
            <th scope="col">훈련일자</th>
            <th scope="col">계획시간</th>
            <th scope="col">훈련결과</th>
          </tr>
        </thead>
        <tbody>
          {data.trainings.length === 0 && (
            <tr>
              <td colSpan={4}>훈련내용이 없습니다.</td>
            </tr>
          )}
          {data.trainings.map((t) => (
            <tr key={t.id}>
              <td>
                {t.typeName} {t.round}
              </td>
              <td>{t.date}</td>
              <td>{t.plannedHours}</td>
              <td>{t.resultType === "defer" ? <span className="defer">{t.result}</span> : t.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="tar mt10">
        <Link to={ROUTES.MY_TRAINING} onClick={close}>
          나의 훈련정보 바로가기 &gt;
        </Link>
      </p>
    </Modal>
  );
}
