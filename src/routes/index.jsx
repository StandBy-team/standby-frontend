import { Navigate, Route, Routes } from "react-router-dom";
import ROUTES, { boardPath } from "@/constants/routes";

import MainLayout from "@/components/layout/MainLayout";
import SubLayout from "@/components/layout/SubLayout";
import RequireAuth from "@/components/common/RequireAuth";

import MainPage from "@/pages/main/MainPage";
import Login from "@/pages/login/Login";
import GuestLogin from "@/pages/login/GuestLogin";
import Sitemap from "@/pages/sitemap/Sitemap";
import ErrorInquiry from "@/pages/support/ErrorInquiry";
import SettingsGuide from "@/pages/support/SettingsGuide";
import ReinstallGuide from "@/pages/support/ReinstallGuide";
import InstallFiles from "@/pages/support/InstallFiles";

import TrainingInfo from "@/pages/my/TrainingInfo";
import StandingReserveInfo from "@/pages/my/StandingReserveInfo";
import UnitPostList from "@/pages/my/UnitPostList";
import UnitPostDetail from "@/pages/my/UnitPostDetail";
import QnaList from "@/pages/my/QnaList";
import QnaForm from "@/pages/my/QnaForm";
import QnaDetail from "@/pages/my/QnaDetail";
import FreeBoardList from "@/pages/my/FreeBoardList";
import FreeBoardForm from "@/pages/my/FreeBoardForm";
import FreeBoardDetail from "@/pages/my/FreeBoardDetail";
import Profile from "@/pages/my/Profile";
import Awards from "@/pages/my/Awards";

import TrainingSelfSelectGuide from "@/pages/training/TrainingSelfSelectGuide";
import NationwideTrainingGuide from "@/pages/training/NationwideTrainingGuide";
import HolidayTrainingSchedule from "@/pages/training/HolidayTrainingSchedule";
import TrainingApplyForm from "@/pages/training/TrainingApplyForm";
import TrainingResults from "@/pages/training/TrainingResults";
import TrainingResultDetail from "@/pages/training/TrainingResultDetail";
import DelayGuide from "@/pages/delay/DelayGuide";
import DelayApply from "@/pages/delay/DelayApply";
import DelayResults from "@/pages/delay/DelayResults";
import DelayResultDetail from "@/pages/delay/DelayResultDetail";
import HoldGuide from "@/pages/hold/HoldGuide";
import HoldReleaseGuide from "@/pages/hold/HoldReleaseGuide";
import HoldResults from "@/pages/hold/HoldResults";
import HoldResultDetail from "@/pages/hold/HoldResultDetail";

import History from "@/pages/info/History";
import Mission from "@/pages/info/Mission";
import Mark from "@/pages/info/Mark";
import Song from "@/pages/info/Song";
import StandingReserve from "@/pages/info/StandingReserve";
import Promotion from "@/pages/info/Promotion";
import Treatment from "@/pages/info/Treatment";
import ReserveForcesLaw from "@/pages/law/ReserveForcesLaw";
import EmergencyPreparednessLaw from "@/pages/law/EmergencyPreparednessLaw";
import RequisitionLaw from "@/pages/law/RequisitionLaw";
import EtcRegulations from "@/pages/law/EtcRegulations";
import PenaltyRegulations from "@/pages/law/PenaltyRegulations";

import BoardList from "@/pages/board/BoardList";
import BoardDetail from "@/pages/board/BoardDetail";
import Faq from "@/pages/inform/Faq";
import SelectionGuide from "@/pages/inform/SelectionGuide";
import StandingReserveApplyGuide from "@/pages/inform/StandingReserveApplyGuide";
import StaffSelection from "@/pages/inform/StaffSelection";

import TrainingCenterFinder from "@/pages/find/TrainingCenterFinder";
import TroopFinder from "@/pages/find/TroopFinder";

import OfficerPromotionPopup from "@/pages/popup/OfficerPromotionPopup";
import TechExpertPopup from "@/pages/popup/TechExpertPopup";
import PrivacyPopup from "@/pages/popup/PrivacyPopup";
import TrainingCenterImagePopup from "@/pages/popup/TrainingCenterImagePopup";

const PAGES = [
  [ROUTES.LOGIN, Login],
  [ROUTES.LOGIN_GUEST, GuestLogin],
  [ROUTES.SITEMAP, Sitemap],
  [ROUTES.ERROR_INQUIRY, ErrorInquiry],
  [ROUTES.SUPPORT_SETTINGS, SettingsGuide],
  [ROUTES.SUPPORT_REINSTALL, ReinstallGuide],
  [ROUTES.SUPPORT_INSTALL_FILES, InstallFiles],
  [ROUTES.TRAINING_SELF_SELECT, TrainingSelfSelectGuide],
  [ROUTES.TRAINING_NATIONWIDE, NationwideTrainingGuide],
  [ROUTES.TRAINING_HOLIDAY_SCHEDULE, HolidayTrainingSchedule],
  [ROUTES.DELAY_GUIDE, DelayGuide],
  [ROUTES.HOLD_GUIDE, HoldGuide],
  [ROUTES.HOLD_RELEASE_GUIDE, HoldReleaseGuide],
  [ROUTES.INFO_HISTORY, History],
  [ROUTES.INFO_MISSION, Mission],
  [ROUTES.INFO_MARK, Mark],
  [ROUTES.INFO_SONG, Song],
  [ROUTES.INFO_STANDING_RESERVE, StandingReserve],
  [ROUTES.INFO_PROMOTION, Promotion],
  [ROUTES.INFO_TREATMENT, Treatment],
  [ROUTES.LAW_RESERVE_FORCES, ReserveForcesLaw],
  [ROUTES.LAW_EMERGENCY, EmergencyPreparednessLaw],
  [ROUTES.LAW_REQUISITION, RequisitionLaw],
  [ROUTES.LAW_ETC, EtcRegulations],
  [ROUTES.LAW_PENALTY, PenaltyRegulations],
  [ROUTES.BOARD, BoardList],
  [ROUTES.BOARD_DETAIL, BoardDetail],
  [ROUTES.FAQ, Faq],
  [ROUTES.SELECTION, SelectionGuide],
  [ROUTES.SELECTION_STANDING_RESERVE, StandingReserveApplyGuide],
  [ROUTES.SELECTION_STAFF, StaffSelection],
  [ROUTES.FIND_TRAINING_CENTER, TrainingCenterFinder],
  [ROUTES.FIND_TROOP, TroopFinder],
];

// Login-only pages: [path, Page, props?]
const AUTH_PAGES = [
  [ROUTES.MY_TRAINING, TrainingInfo],
  [ROUTES.MY_STANDING_RESERVE, StandingReserveInfo],
  [ROUTES.MY_UNIT_NOTICES, UnitPostList, { board: "notices" }],
  [ROUTES.MY_UNIT_NOTICE_DETAIL, UnitPostDetail, { board: "notices" }],
  [ROUTES.MY_TRAINING_NOTICES, UnitPostList, { board: "training-notices" }],
  [ROUTES.MY_TRAINING_NOTICE_DETAIL, UnitPostDetail, { board: "training-notices" }],
  [ROUTES.MY_QNA, QnaList],
  [ROUTES.MY_QNA_NEW, QnaForm],
  [ROUTES.MY_QNA_DETAIL, QnaDetail],
  [ROUTES.MY_QNA_EDIT, QnaForm],
  [ROUTES.MY_FREE_BOARD, FreeBoardList],
  [ROUTES.MY_FREE_BOARD_NEW, FreeBoardForm],
  [ROUTES.MY_FREE_BOARD_DETAIL, FreeBoardDetail],
  [ROUTES.MY_PROFILE, Profile],
  [ROUTES.MY_AWARDS, Awards],
  [ROUTES.TRAINING_NATIONWIDE_APPLY, TrainingApplyForm, { kind: "nationwide" }],
  [ROUTES.TRAINING_HOLIDAY_APPLY, TrainingApplyForm, { kind: "holiday" }],
  [ROUTES.TRAINING_RESULTS, TrainingResults],
  [ROUTES.TRAINING_RESULT_DETAIL, TrainingResultDetail],
  [ROUTES.DELAY_APPLY, DelayApply],
  [ROUTES.DELAY_RESULTS, DelayResults],
  [ROUTES.DELAY_RESULT_DETAIL, DelayResultDetail],
  [ROUTES.HOLD_RESULTS, HoldResults],
  [ROUTES.HOLD_RESULT_DETAIL, HoldResultDetail],
];

const POPUP_PAGES = [
  [ROUTES.POPUP_OFFICER_PROMOTION, OfficerPromotionPopup],
  [ROUTES.POPUP_TECH_EXPERT, TechExpertPopup],
  [ROUTES.POPUP_PRIVACY, PrivacyPopup],
  [ROUTES.POPUP_TRAINING_CENTER_IMAGE, TrainingCenterImagePopup],
];

function NotFound() {
  return (
    <SubLayout>
      <div className="not-found">
        <h3>요청하신 페이지를 찾을 수 없습니다.</h3>
      </div>
    </SubLayout>
  );
}

export default function RootRoutes() {
  return (
    <Routes>
      {POPUP_PAGES.map(([path, Page]) => (
        <Route key={path} path={path} element={<Page />} />
      ))}
      <Route element={<MainLayout />}>
        <Route path={ROUTES.MAIN} element={<MainPage />} />
        <Route path="/board" element={<Navigate to={boardPath("notice")} replace />} />
        {PAGES.map(([path, Page]) => (
          <Route key={path} path={path} element={<Page />} />
        ))}
        <Route element={<RequireAuth />}>
          {AUTH_PAGES.map(([path, Page, props]) => (
            // `key` remounts the shared form/list components when switching between their routes.
            <Route key={path} path={path} element={<Page key={path} {...props} />} />
          ))}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
