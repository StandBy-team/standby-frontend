import { useLocation, useNavigate, useParams } from "react-router-dom";
import SubLayout from "@/components/layout/SubLayout";
import Attachments from "@/components/common/Attachments";
import ListButton from "@/components/common/ListButton";
import PageState from "@/components/common/PageState";
import PostArticle from "@/components/my/PostArticle";
import { fetchUnitPost, unitFileUrl } from "@/api/services/unit";
import useApi from "@/hooks/useApi";
import { UNIT_BOARDS } from "./unitBoards";

export default function UnitPostDetail({ board }) {
  const config = UNIT_BOARDS[board];
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { data, error } = useApi((opts) => fetchUnitPost(board, id, opts), [board, id]);

  const backToList = () => navigate(config.list + (location.state?.listSearch ?? ""));

  return (
    <SubLayout title={config.name}>
      {data ? (
        <PostArticle
          title={data.title}
          meta={[
            ["작성일자", data.createdAt],
            ["조회수", data.views],
          ]}
          attachments={
            data.attachments.length > 0 ? (
              <Attachments files={data.attachments} urlOf={(file) => unitFileUrl(board, id, file.fileSn)} />
            ) : (
              <p className="post-files-empty">첨부파일이 없습니다.</p>
            )
          }
          body={data.body}
        />
      ) : (
        <PageState error={error && { message: "게시글을 찾을 수 없습니다." }} />
      )}
      <div className="btn-box">
        <ListButton onClick={backToList} />
      </div>
    </SubLayout>
  );
}
