import { useEffect } from "react";
import TrainingInfoPopup from "@/components/my/TrainingInfoPopup";
import HeroSlider from "./HeroSlider";
import PersonalCard from "./PersonalCard";
import QuickServices from "./QuickServices";
import ServiceTabs from "./ServiceTabs";
import BannerCards from "./BannerCards";
import MediaFeed from "./MediaFeed";
import BoardTabs from "./BoardTabs";
import SectionState from "./SectionState";
import { fetchMain } from "@/api/services/main";
import useApi from "@/hooks/useApi";

export default function MainPage() {
  const { data, error } = useApi((opts) => fetchMain(opts), []);

  useEffect(() => {
    document.title = "예비군 홈페이지에 오신 것을 환영합니다.";
  }, []);

  return (
    <div className="home">
      <h1 className="sr-only">예비군 홈페이지</h1>
      <div className="wide home-top">
        {data ? <HeroSlider slides={data.slides} /> : <SectionState error={error} className="home-hero" />}
        <PersonalCard />
      </div>

      <div className="wide">
        <QuickServices />
      </div>

      <div className="home-band">
        <div className="wide home-row home-row-service">
          <ServiceTabs />
          {data ? <BannerCards banners={data.banners} /> : <SectionState error={error} lines={4} />}
        </div>
      </div>

      <div className="wide home-row home-row-news">
        {data ? <MediaFeed tabs={data.mediaTabs} /> : <SectionState error={error} className="home-panel" />}
        {data ? (
          <BoardTabs notices={data.notices} faq={data.faq} />
        ) : (
          <SectionState error={error} lines={5} className="home-panel" />
        )}
      </div>

      <TrainingInfoPopup />
    </div>
  );
}
