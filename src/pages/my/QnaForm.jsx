import { useLocation, useNavigate, useParams } from "react-router-dom";
import SubLayout from "@/components/layout/SubLayout";
import ListButton from "@/components/common/ListButton";
import PageState from "@/components/common/PageState";
import BoardComments from "@/components/my/BoardComments";
import PostForm from "@/components/my/PostForm";
import { createQuestion, fetchQuestionForEdit, updateQuestion } from "@/api/services/unit";
import ROUTES, { detailPath } from "@/constants/routes";
import useApi from "@/hooks/useApi";
import { useToast } from "@/hooks/useFeedback";

/** New question, or editing one at `:id`. */
export default function QnaForm() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const editing = useApi((opts) => fetchQuestionForEdit(id, opts), [id], { enabled: Boolean(id) });
  const listSearch = location.state?.listSearch ?? "";

  const submit = async (question) => {
    if (id) {
      await updateQuestion(id, question);
      toast("수정되었습니다.", { tone: "success" });
      navigate(detailPath(ROUTES.MY_QNA_DETAIL, id), { replace: true, state: { listSearch } });
    } else {
      await createQuestion(question);
      toast("저장되었습니다.", { tone: "success" });
      navigate(ROUTES.MY_QNA);
    }
  };

  return (
    <SubLayout title="나의 질의응답">
      <section>
        <BoardComments />
        {id && !editing.data ? (
          <PageState error={editing.error && { message: editing.error.status === 403 ? editing.error.message : "게시글을 찾을 수 없습니다." }} />
        ) : (
          <PostForm
            key={id ?? "new"}
            bodyLabel="질의내용"
            withEmail
            initial={editing.data ?? undefined}
            onSubmit={submit}
            footer={<ListButton onClick={() => navigate(ROUTES.MY_QNA + listSearch)} />}
          />
        )}
      </section>
    </SubLayout>
  );
}
