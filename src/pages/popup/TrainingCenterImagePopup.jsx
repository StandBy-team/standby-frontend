import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchTrainingCenter } from "@/api/services/finder";
import useApi from "@/hooks/useApi";

export default function TrainingCenterImagePopup() {
  const { id } = useParams();
  const { data, error } = useApi((opts) => fetchTrainingCenter(id, opts), [id]);

  useEffect(() => {
    document.title = "예비군훈련장안내";
  }, []);

  return (
    <div className="win-pop-wrap">
      <div className="pop-inner">
        <div className="pop-article">
          <div className="pop-article-inner tc-image">
            {data?.image && <img src={data.image} alt={data.name} />}
            {(error || (data && !data.image)) && <p>등록된 훈련장 이미지가 없습니다.</p>}
          </div>
        </div>
      </div>
      <button type="button" className="btn-pop-close" onClick={() => window.close()}>
        <img src="/images/btn/btn-pop-close.svg" alt="Close" />
      </button>
    </div>
  );
}
