import { useRef, useState } from "react";
import Icon from "@/components/common/Icon";
import Modal from "@/components/common/Modal";
import PageState from "@/components/common/PageState";
import { fetchTrainingDocument } from "@/api/services/my";
import useApi from "@/hooks/useApi";

const TITLES = { certificate: "교육필증", "call-up-notice": "소집통지서" };

function Consent({ showError, agreed, onChange }) {
  return (
    <div className="doc-consent">
      <p className="doc-consent-tit">소집통지서 출력 동의서</p>
      <p>
        동의하실 경우, 본 훈련 소집통지서는 귀하에게 전달된 것으로 간주하며, 공인전자문서(네이버,카카오)를 통해 별도로
        통지되지 않습니다. 소집통지서를 확인하시려면 아래 &quot;동의&quot;란에 체크하신 후, &quot;동의&quot; 버튼을 눌러
        주시기 바랍니다.
      </p>
      <label className="doc-consent-check" htmlFor="cb_agree">
        <input
          type="checkbox"
          id="cb_agree"
          checked={agreed}
          aria-invalid={showError || undefined}
          aria-describedby={showError ? "cb_agree_error" : undefined}
          onChange={(e) => onChange(e.target.checked)}
        />
        본인은 본 훈련 소집통지서를 열람하는 것에 대해 동의합니다.
      </label>
      {showError && (
        <p id="cb_agree_error" className="field-error" role="alert">
          <Icon name="alert" size={14} />
          동의란에 체크하신 후 진행해 주시기 바랍니다.
        </p>
      )}
      <p className="txt-blue">※ 동의하지 않는 경우에는 소집통지서 출력이 불가능합니다.</p>
    </div>
  );
}

/** Shows a training document from the API in a printable frame; the call-up notice asks for consent first. */
export default function DocumentDialog({ training, kind, onClose }) {
  const needsConsent = kind === "call-up-notice";
  const [consented, setConsented] = useState(!needsConsent);
  const [agreed, setAgreed] = useState(false);
  const [showError, setShowError] = useState(false);
  const frame = useRef(null);
  const { data, error } = useApi((opts) => fetchTrainingDocument(training.id, kind, opts), [training.id, kind], {
    enabled: consented,
  });

  const title = consented ? `${TITLES[kind]} · ${training.typeName} ${training.round}`.trim() : "소집통지서 출력 안내";

  const footer = consented ? (
    <div className="btn-box">
      <button type="button" className="btn-gradient big white" onClick={onClose}>
        닫기
      </button>
      <button
        type="button"
        className="btn-gradient big blue"
        disabled={!data}
        onClick={() => frame.current?.contentWindow?.print()}
      >
        <Icon name="print" size={16} />
        인쇄
      </button>
    </div>
  ) : (
    <div className="btn-box">
      <button type="button" className="btn-gradient big gray" onClick={onClose}>
        동의하지 않음
      </button>
      <button
        type="button"
        className="btn-gradient big blue"
        onClick={() => (agreed ? setConsented(true) : setShowError(true))}
      >
        동의
      </button>
    </div>
  );

  return (
    <Modal title={title} width={consented ? 780 : 520} onClose={onClose} footer={footer} className="doc-dialog">
      {!consented && (
        <Consent
          showError={showError && !agreed}
          agreed={agreed}
          onChange={(checked) => {
            setAgreed(checked);
            if (checked) setShowError(false);
          }}
        />
      )}
      {consented &&
        (data ? (
          <iframe ref={frame} className="doc-frame" title={TITLES[kind]} sandbox="allow-same-origin allow-modals" srcDoc={data} />
        ) : (
          <PageState error={error} lines={6} />
        ))}
    </Modal>
  );
}
