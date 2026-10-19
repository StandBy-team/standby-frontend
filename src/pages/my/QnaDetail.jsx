import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SubLayout from "@/components/layout/SubLayout";
import ListButton from "@/components/common/ListButton";
import PageState from "@/components/common/PageState";
import PostArticle from "@/components/my/PostArticle";
import QnaComments from "@/components/my/QnaComments";
import QnaStatusBadge from "@/components/my/QnaStatusBadge";
import Rating from "@/components/my/Rating";
import { deleteQuestion, fetchQuestion } from "@/api/services/unit";
import ROUTES, { detailPath } from "@/constants/routes";
import useApi from "@/hooks/useApi";
import { useConfirm, useToast } from "@/hooks/useFeedback";

export default function QnaDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { data, error } = useApi((opts) => fetchQuestion(id, opts), [id]);
  const toast = useToast();
  const confirm = useConfirm();
  const [updated, setUpdated] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const question = updated?.id === id ? updated : data;
  const listSearch = location.state?.listSearch ?? "";

  const backToList = () => navigate(ROUTES.MY_QNA + listSearch);

  const remove = async () => {
    if (!(await confirm("게시글을 삭제하시겠습니까?"))) return;
    setDeleting(true);
    try {
      await deleteQuestion(id);
      toast("삭제되었습니다.", { tone: "success" });
      navigate(ROUTES.MY_QNA + listSearch, { replace: true });
    } catch (err) {
      toast(err.message, { tone: "error" });
      setDeleting(false);
    }
  };

  return (
    <SubLayout title="나의 질의응답">
      {question ? (
        <PostArticle
          title={question.title}
          badge={<QnaStatusBadge status={question.status} />}
          meta={[
            ["성명", question.writer],
            ["연락처", question.phone],
            ["E-mail", question.email],
            ["공개여부", question.public ? "공개" : "비공개"],
            ["작성일자", question.createdAt],
            ["조회수", question.views],
          ]}
          body={question.body}
        >
          {question.summary && (
            <section className="qna-summary" aria-labelledby="qna-summary-tit">
              <div className="qna-summary-head">
                <h5 id="qna-summary-tit" className="qna-summary-tit">
                  <span className="ui-badge is-ai">AI</span>
                  답변 요약
                </h5>
                <span className="qna-summary-time">{question.summary.updatedAt} 기준</span>
              </div>
              <p className="qna-summary-body">{question.summary.body}</p>
              <div className="qna-summary-foot">
                <p className="qna-summary-note">
                  게시글과 댓글 내용을 바탕으로 자동 정리한 내용입니다. 자세한 내용은 아래 댓글을 확인해 주세요.
                </p>
                <p className="post-rating">
                  <span>만족도</span>
                  <Rating value={question.rating} />
                </p>
              </div>
            </section>
          )}
          <QnaComments question={question} onChange={setUpdated} />
        </PostArticle>
      ) : (
        <PageState error={error && { message: error.status === 403 ? error.message : "게시글을 찾을 수 없습니다." }} />
      )}
      <div className="btn-box">
        <ListButton onClick={backToList} />
        {question?.canEdit && (
          <>
            <button
              type="button"
              className="btn-gradient big blue"
              onClick={() => navigate(detailPath(ROUTES.MY_QNA_EDIT, id), { state: { listSearch } })}
            >
              수정
            </button>
            <button type="button" className="btn-gradient big white" disabled={deleting} onClick={remove}>
              삭제
            </button>
          </>
        )}
      </div>
    </SubLayout>
  );
}
