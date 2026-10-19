import { useLocation, useNavigate, useParams } from "react-router-dom";
import SubLayout from "@/components/layout/SubLayout";
import { fetchArticle } from "@/api/services/board";
import { API_BASE } from "@/config";
import { boardPath } from "@/constants/routes";
import useApi from "@/hooks/useApi";

const formatBytes = (n) => (n == null ? "" : `[${n.toLocaleString("en-US").replace(/,/g, "")} byte]`);

// Article bodies are HTML authored in the backend editor.
const Body = ({ html }) => <div className="article-body" dangerouslySetInnerHTML={{ __html: html }} />;

function Attachments({ board, article }) {
  return article.attachments.map((file) => (
    <div key={file.fileSn} className="attach-row">
      <a
        className="file-down"
        href={`${API_BASE}/boards/${board}/articles/${article.nttId}/files/${file.fileSn}`}
        download={file.name}
      >
        {file.name}&nbsp;{formatBytes(file.size)}
      </a>
    </div>
  ));
}

function NoticeView({ board, article }) {
  return (
    <>
      <div className="pos-rel mt45">
        <h4 className="cont-tit-h4">내용</h4>
      </div>
      <table className="tbl fixed th-c">
        <caption>상세내용</caption>
        <tbody>
          <tr>
            <th scope="row">제목</th>
            <td colSpan={5}>{article.title}</td>
          </tr>
          <tr>
            <th scope="row">작성자</th>
            <td colSpan={5}>{article.writer}</td>
          </tr>
          <tr>
            <th scope="row">작성일</th>
            <td>{article.createdAt}</td>
            <th className="bl" scope="row">
              수정일
            </th>
            <td>{article.updatedAt}</td>
            <th className="bl" scope="row">
              조회수
            </th>
            <td>{article.views}</td>
          </tr>
          <tr>
            <th scope="row">첨부파일</th>
            <td colSpan={5}>
              <Attachments board={board} article={article} />
            </td>
          </tr>
          <tr>
            <th scope="row">내용</th>
            <td colSpan={5} className="article-content">
              <Body html={article.body} />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

function CardNewsView({ article }) {
  return (
    <>
      <div className="pos-rel mt45">
        <h4 className="cont-tit-h4">카드뉴스</h4>
      </div>
      <table className="tbl fixed">
        <caption>카드뉴스</caption>
        <tbody>
          <tr>
            <th scope="row">제목</th>
            <td colSpan={3}>{article.title}</td>
          </tr>
          <tr>
            <th scope="row">작성일</th>
            <td>{article.createdAt}</td>
            <th scope="row" className="bl">
              조회수
            </th>
            <td>{article.views}</td>
          </tr>
          <tr>
            <th scope="row">내용</th>
            <td colSpan={3} className="article-content">
              <Body html={article.body} />
              {article.images.map((src) => (
                <img key={src} className="article-image" src={src} alt="해당파일이미지" />
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

function VideoLink({ href, children }) {
  return href ? (
    <a title="새 탭으로 영상 열기" href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    children
  );
}

function VideoView({ article }) {
  return (
    <>
      <div className="pos-rel mt45">
        <h4 className="cont-tit-h4">국방영상</h4>
      </div>
      <table className="tbl th-c">
        <caption>국방영상</caption>
        <tbody>
          <tr>
            <th scope="row">제목</th>
            <td>{article.title}</td>
            <th className="bl" scope="row">
              작성일
            </th>
            <td>{article.createdAt}</td>
          </tr>
          <tr>
            <th scope="row">영상 링크 주소</th>
            <td colSpan={3}>
              <VideoLink href={article.videoUrl}>{article.videoUrl}</VideoLink>
            </td>
          </tr>
          <tr>
            <th scope="row">썸네일</th>
            <td colSpan={3}>
              {article.thumbnail && (
                <VideoLink href={article.videoUrl}>
                  <img src={article.thumbnail} style={{ maxWidth: 400 }} alt="해당파일이미지" />
                </VideoLink>
              )}
            </td>
          </tr>
          <tr>
            <th scope="row">내용</th>
            <td colSpan={3} className="article-content">
              <Body html={article.body} />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default function BoardDetail() {
  const { board, nttId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { data, error } = useApi((opts) => fetchArticle(board, nttId, opts), [board, nttId]);

  const backToList = () => navigate(boardPath(board) + (location.state?.listSearch ?? ""));

  if (error) {
    return (
      <SubLayout title="게시글">
        <p className="mt30">게시글을 찾을 수 없습니다.</p>
      </SubLayout>
    );
  }
  if (!data) return <SubLayout />;

  const { article } = data;

  return (
    <SubLayout title={data.board.name} subText={data.board.description}>
      {board === "cardnews" && <CardNewsView article={article} />}
      {board === "video" && <VideoView article={article} />}
      {board !== "cardnews" && board !== "video" && <NoticeView board={board} article={article} />}
      <div className="btn-box">
        <button type="button" onClick={backToList}>
          <img src="/images/btn/btn-list2.svg" alt="목록" />
        </button>
      </div>
    </SubLayout>
  );
}
