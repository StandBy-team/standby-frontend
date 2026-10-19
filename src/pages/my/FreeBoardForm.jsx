import { useNavigate } from "react-router-dom";
import SubLayout from "@/components/layout/SubLayout";
import ListButton from "@/components/common/ListButton";
import BoardComments from "@/components/my/BoardComments";
import PostForm from "@/components/my/PostForm";
import { createFreePost } from "@/api/services/unit";
import ROUTES from "@/constants/routes";
import { useToast } from "@/hooks/useFeedback";

// No reference page for this form; it follows the Q&A form (MyQuestAnsForm).
export default function FreeBoardForm() {
  const navigate = useNavigate();
  const toast = useToast();

  const submit = async (post) => {
    await createFreePost(post);
    toast("저장되었습니다.", { tone: "success" });
    navigate(ROUTES.MY_FREE_BOARD);
  };

  return (
    <SubLayout title="자유게시판">
      <section>
        <BoardComments />
        <PostForm
          bodyLabel="내용"
          onSubmit={submit}
          footer={<ListButton onClick={() => navigate(ROUTES.MY_FREE_BOARD)} />}
        />
      </section>
    </SubLayout>
  );
}
