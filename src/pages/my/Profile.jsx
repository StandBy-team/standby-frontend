import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubLayout from "@/components/layout/SubLayout";
import DateInput from "@/components/common/DateInput";
import FormField from "@/components/common/FormField";
import Icon from "@/components/common/Icon";
import PageState from "@/components/common/PageState";
import PhoneField from "@/components/common/PhoneField";
import { fetchCodes } from "@/api/services/codes";
import { fetchProfile, updateProfile } from "@/api/services/my";
import ROUTES from "@/constants/routes";
import useApi from "@/hooks/useApi";
import { useConfirm, useToast } from "@/hooks/useFeedback";

const EMAIL_PATTERN = /^[\w.+-]+@[\w-]+(\.[\w-]+)+$/;

const toForm = (profile) => {
  const [emailId = "", emailDomain = ""] = profile.email.split("@");
  return { ...profile, emailId, emailDomain };
};

const joinEmail = (form) => (form.emailId || form.emailDomain ? `${form.emailId}@${form.emailDomain}` : "");

const validate = (form) => {
  const errors = {};
  const email = joinEmail(form);
  if (email && !EMAIL_PATTERN.test(email)) errors.email = "E-mail 형식이 올바르지 않습니다.";
  if (form.outingStart && form.outingEnd && form.outingStart > form.outingEnd) {
    errors.outing = "출타 종료일자가 시작일자보다 빠를 수 없습니다.";
  }
  return errors;
};

function CodeOptions({ codes }) {
  return codes?.map((c) => (
    <option key={c.code} value={c.code}>
      {c.name}
    </option>
  ));
}

function Card({ title, children }) {
  return (
    <section className="form-card">
      <h4 className="form-card-tit">{title}</h4>
      <div className="form-grid">{children}</div>
    </section>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const toast = useToast();
  const confirm = useConfirm();
  const profile = useApi((opts) => fetchProfile(opts), []);
  const banks = useApi((opts) => fetchCodes("banks", opts), []);
  const relations = useApi((opts) => fetchCodes("familyRelations", opts), []);
  const domains = useApi((opts) => fetchCodes("emailDomains", opts), []);
  const mailOptOuts = useApi((opts) => fetchCodes("mailOptOuts", opts), []);
  const [form, setForm] = useState(null);
  const [source, setSource] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  if (profile.data && profile.data !== source) {
    setSource(profile.data);
    setForm(toForm(profile.data));
  }

  if (!form) {
    return (
      <SubLayout title="개인정보수정">
        <PageState error={profile.error} lines={8} />
      </SubLayout>
    );
  }

  const update = (patch) => {
    const next = { ...form, ...patch };
    setForm(next);
    // Re-check only the errors already shown, so they clear as soon as the input is fixed.
    if (Object.keys(errors).length) setErrors(Object.fromEntries(Object.entries(validate(next)).filter(([k]) => errors[k])));
  };
  const set = (key) => (e) => update({ [key]: e.target.value });
  const setValue = (key) => (value) => update({ [key]: value });
  const knownDomain = domains.data?.some((d) => d.code === form.emailDomain);

  const toggleOptOut = (code) => (e) =>
    update({ mailOptOut: e.target.checked ? [...form.mailOptOut, code] : form.mailOptOut.filter((c) => c !== code) });

  const save = async (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(found.email ? "emailId" : "outingStart")?.focus();
      return;
    }
    if (!(await confirm("저장하시겠습니까?"))) return;
    setSaving(true);
    try {
      const payload = { ...form, email: joinEmail(form) };
      delete payload.emailId;
      delete payload.emailDomain;
      const saved = await updateProfile(payload);
      setSource(saved);
      setForm(toForm(saved));
      toast("저장되었습니다.", { tone: "success" });
    } catch (error) {
      toast(error.message, { tone: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <SubLayout title="개인정보수정">
      <form className="my-form" onSubmit={save} noValidate>
        <Card title="기본정보">
          <FormField label="성명">
            <p className="form-static">{form.name}</p>
          </FormField>
          <FormField label="세대주(관계)" htmlFor="familyMaster">
            <input id="familyMaster" type="text" className="inp-box" value={form.familyMaster} onChange={set("familyMaster")} />
            <span className="form-sep">의</span>
            <label htmlFor="familyMasterRelation" className="hid">
              세대주와의 관계
            </label>
            <select
              id="familyMasterRelation"
              className="sel-box"
              value={form.familyMasterRelation}
              onChange={set("familyMasterRelation")}
            >
              <option value="">선택하세요</option>
              <CodeOptions codes={relations.data} />
            </select>
          </FormField>
        </Card>

        <Card title="연락처">
          <FormField label="휴대폰" htmlFor="cellPhone">
            <PhoneField id="cellPhone" className="inp-box" value={form.cellPhone} onChange={setValue("cellPhone")} />
          </FormField>
          <FormField label="전화번호(집)" htmlFor="homePhone">
            <PhoneField id="homePhone" className="inp-box" value={form.homePhone} onChange={setValue("homePhone")} />
          </FormField>
          <FormField label="전화번호(직장)" htmlFor="companyPhone">
            <PhoneField id="companyPhone" className="inp-box" value={form.companyPhone} onChange={setValue("companyPhone")} />
          </FormField>
          <FormField
            label="E-mail"
            htmlFor="emailId"
            hint={<span className="txt-red">*해외이메일 지양</span>}
            error={errors.email}
            errorId="email-error"
            wide
          >
            <input
              id="emailId"
              type="text"
              className="inp-box"
              title="이메일 아이디"
              autoComplete="off"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "email-error" : undefined}
              value={form.emailId}
              onChange={set("emailId")}
            />
            <span className="form-sep">@</span>
            <select
              className="sel-box"
              title="이메일 주소 선택"
              value={knownDomain ? form.emailDomain : ""}
              onChange={(e) => update({ emailDomain: e.target.value })}
            >
              <option value="">직접입력</option>
              <CodeOptions codes={domains.data} />
            </select>
            <input
              type="text"
              className="inp-box"
              title="이메일 주소"
              aria-invalid={errors.email ? true : undefined}
              value={form.emailDomain}
              readOnly={knownDomain}
              onChange={set("emailDomain")}
            />
          </FormField>
        </Card>

        <Card title="급여계좌">
          <FormField label="은행" htmlFor="bnk">
            <select id="bnk" className="sel-box" value={form.bank} onChange={set("bank")}>
              <option value="">선택하세요</option>
              <CodeOptions codes={banks.data} />
            </select>
          </FormField>
          <FormField label="계좌번호" htmlFor="account" hint="숫자와 '-'만 입력할 수 있습니다.">
            <input
              id="account"
              type="text"
              inputMode="numeric"
              className="inp-box"
              value={form.account}
              onChange={(e) => update({ account: e.target.value.replace(/[^\d-]/g, "") })}
            />
          </FormField>
        </Card>

        <Card title="이메일·수신 설정">
          <FormField label="소집통지서 수신 방법" htmlFor="notice_way">
            <select id="notice_way" className="sel-box" value={form.noticeWay} onChange={set("noticeWay")}>
              <option value="Y">이메일</option>
              <option value="N">이메일 + 우편</option>
            </select>
          </FormField>
          <FormField label="생일문자 수신 거부">
            <label className="form-check" htmlFor="birth_yn">
              <input
                type="checkbox"
                id="birth_yn"
                checked={form.birthdaySmsOptOut}
                onChange={(e) => update({ birthdaySmsOptOut: e.target.checked })}
              />
              생일 축하 문자를 받지 않습니다.
            </label>
          </FormField>
          <FormField label="이메일 수신 거부" wide>
            <ul className="form-check-grid">
              {mailOptOuts.data?.map((c) => (
                <li key={c.code}>
                  <label className="form-check" htmlFor={`mail_${c.code}`}>
                    <input
                      type="checkbox"
                      id={`mail_${c.code}`}
                      checked={form.mailOptOut.includes(c.code)}
                      onChange={toggleOptOut(c.code)}
                    />
                    {c.name}
                  </label>
                </li>
              ))}
            </ul>
          </FormField>
        </Card>

        <Card title="출타 정보">
          <div className="form-note is-wide">
            <Icon name="alert" size={16} />
            <p>
              여행 또는 7일 이상 장기 출타 시 입력하세요. 저장 후 출타 정보를 삭제하려면 동대의 확인이 필요합니다. 소속동대로
              문의 바랍니다.
            </p>
          </div>
          <FormField label="출타 지역" htmlFor="outingArea">
            <input id="outingArea" type="text" className="inp-box" value={form.outingArea} onChange={set("outingArea")} />
          </FormField>
          <FormField label="출타 기간" htmlFor="outingStart" error={errors.outing} errorId="outing-error">
            <DateInput
              id="outingStart"
              className="inp-box date"
              title="출타기간시작일자"
              value={form.outingStart}
              onChange={setValue("outingStart")}
            />
            <span className="form-sep">~</span>
            <DateInput
              id="outingEnd"
              className="inp-box date"
              title="출타기간종료일자"
              value={form.outingEnd}
              onChange={setValue("outingEnd")}
            />
          </FormField>
          <FormField label="출타 목적" htmlFor="outingPurpose">
            <input id="outingPurpose" type="text" className="inp-box" value={form.outingPurpose} onChange={set("outingPurpose")} />
          </FormField>
          <FormField label="출타 연락처" htmlFor="phone">
            <PhoneField id="phone" className="inp-box" value={form.outingPhone} onChange={setValue("outingPhone")} />
          </FormField>
        </Card>

        <Card title="대리 수령인">
          <FormField label="대리 수령인" htmlFor="orderReceiptPsn">
            <input id="orderReceiptPsn" type="text" className="inp-box" value={form.proxyName} onChange={set("proxyName")} />
          </FormField>
          <FormField label="대리 수령인 연락처" htmlFor="orderReceiptPsnPhone">
            <PhoneField
              id="orderReceiptPsnPhone"
              className="inp-box"
              value={form.proxyPhone}
              onChange={setValue("proxyPhone")}
            />
          </FormField>
        </Card>

        <div className="form-actions">
          <button type="button" className="btn-gradient big white" onClick={() => navigate(ROUTES.MY_TRAINING)}>
            나가기
          </button>
          <button type="submit" className="btn-gradient big blue" disabled={saving}>
            {saving ? "저장 중…" : "저장"}
          </button>
        </div>
      </form>
    </SubLayout>
  );
}
