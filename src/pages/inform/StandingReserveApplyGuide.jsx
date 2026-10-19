import SubLayout from "@/components/layout/SubLayout";
import ROUTES from "@/constants/routes";
import { LinkList } from "./SelectionGuide";

// The application form itself requires login on the real site.
const ENTRIES = [
  {
    item: { label: "상비예비군 지원접수", path: ROUTES.LOGIN },
    description: "- 상비예비군 지원접수로 이동합니다.",
  },
];

export default function StandingReserveApplyGuide() {
  return (
    <SubLayout title="상비예비군 지원접수">
      <LinkList entries={ENTRIES} />
    </SubLayout>
  );
}
