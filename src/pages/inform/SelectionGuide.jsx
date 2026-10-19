import SubLayout from "@/components/layout/SubLayout";
import MenuLink from "@/components/common/MenuLink";
import ROUTES from "@/constants/routes";
import { POPUPS } from "@/constants/menu";

const ENTRIES = [
  {
    item: { label: "예비역 간부 진급 및 임용 신청", popup: POPUPS.officerPromotion },
    description: "-예비역 간부 진급 및 임용 신청 팝업을 호출합니다.",
  },
  {
    item: { label: "상비예비군 지원접수", path: ROUTES.LOGIN },
    description: "-상비예비군 지원접수 안내 페이지로 이동합니다.",
  },
  {
    item: { label: "주요직위자 신청", path: ROUTES.LOGIN },
    description: "-주요직위자 신청 페이지로 이동합니다.",
  },
  {
    item: { label: "예비전력관리 업무담당자 선발", path: ROUTES.SELECTION_STAFF },
    description: "-예비전력관리 업무담당자 선발 안내 페이지로 이동합니다.",
  },
  {
    item: { label: "군병과 경력인증 범위", href: "http://www.q-net.or.kr/crf006.do?id=crf00641&gSite=Q&gId=" },
    description: "-군병과 경력인증 범위 페이지로 이동합니다.",
  },
  {
    item: { label: "예비전력 첨단기술 전문가 신청", popup: POPUPS.techExpert },
    description: "-예비전력 첨단기술 전문가 신청 페이지로 이동합니다.",
  },
];

export function LinkList({ entries }) {
  return (
    <div className="blog-webtune-wrap">
      <ul>
        {entries.map(({ item, description }) => (
          <li key={item.label}>
            <dl>
              <dt>
                <MenuLink item={item} />
              </dt>
              <dd>
                <MenuLink item={item}>{description}</MenuLink>
              </dd>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SelectionGuide() {
  return (
    <SubLayout title="선발 안내 및 신청" crumbs={[]}>
      <LinkList entries={ENTRIES} />
    </SubLayout>
  );
}
