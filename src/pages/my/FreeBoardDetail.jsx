import { useLocation, useNavigate, useParams } from "react-router-dom";
import SubLayout from "@/components/layout/SubLayout";
import ListButton from "@/components/common/ListButton";
import PageState from "@/components/common/PageState";
import PostArticle from "@/components/my/PostArticle";
import { fetchFreePost } from "@/api/services/unit";
import ROUTES from "@/constants/routes";
import useApi from "@/hooks/useApi";

export default function FreeBoardDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { data, error } = useApi((opts) => fetchFreePost(id, opts), [id]);

  const backToList = () => navigate(ROUTES.MY_FREE_BOARD + (location.state?.listSearch ?? ""));

  return (
    <SubLayout title="자유게시판">
      {data ? (
        <PostArticle
          title={data.title}
          meta={[
            ["게시자", data.writer],
            ["공개여부", data.public ? "공개" : "비공개"],
            ["게시일자", data.createdAt],
            ["조회수", data.views],
          ]}
          body={data.body}
        />
      ) : (
        <PageState error={error && { message: error.status === 403 ? error.message : "게시글을 찾을 수 없습니다." }} />
      )}
      <div className="btn-box">
        <ListButton onClick={backToList} />
      </div>
    </SubLayout>
  );
}
