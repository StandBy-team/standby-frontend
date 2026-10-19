import Icon from "@/components/common/Icon";

const formatBytes = (n) => {
  if (n == null) return "";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
};

/** File links of a post; `urlOf(file)` builds the download URL. */
export default function Attachments({ files, urlOf }) {
  return (
    <ul className="attach-list">
      {files.map((file) => (
        <li key={file.fileSn} className="attach-row">
          <a className="file-down" href={urlOf(file)} download={file.name}>
            <Icon name="paperclip" size={16} />
            <span className="file-name">{file.name}</span>
            {file.size != null && <span className="file-size">{formatBytes(file.size)}</span>}
            <Icon name="download" size={16} className="file-icon-down" />
          </a>
        </li>
      ))}
    </ul>
  );
}
