import SubLayout from "@/components/layout/SubLayout";

export default function Mission() {
  return (
    <SubLayout title="">
      <section className="section-box" style={{ borderTop: "0px" }}>
        <div>
          <h3 className="h3-tit">예비군의 이념</h3>
          <ul className="txt-list bl_hyphen">
            <li>
              예비군은 호국의 투사로서, 군경의 전우로서, 국민의 자제로서 &quot;일하면서 싸우고, 싸우면서 일하는&quot;
              범국민적인 자유방위의 역군이다.
            </li>
          </ul>
        </div>
      </section>{" "}
      <section className="section-box">
        <div>
          <h3 className="h3-tit">예비군의 사명</h3>
          <ul className="txt-list bl_hyphen">
            <li>
              예비군은 국가 유사시 현역 군부대의 확장을 위하여 참여하고 적의 침략과 파괴로 부터 국가를 방위하며 자주국방
              의식의 배양을 위하여 선봉이 된다.
            </li>
          </ul>
        </div>
      </section>{" "}
      <section className="section-box">
        <div>
          <h3 className="h3-tit">예비군의 임무</h3>
          <ul className="txt-list bl_hyphen">
            <li>
              전시(戰時), 사변 그밖에 이에 준하는 국가비상사태하에서 현역 군부대의 편성이나 작전에 필요한 동원을 위한
              대비
            </li>
            <li>
              적(敵) 또는 반국가단체의 지령을 받아 무기를 지니고 이는 사람(이하 &quot;무장공비&quot;라 한다)이
              침투하거나 침투할 우려가 있는 지역에서 적이나 무장공비의 소멸(掃滅)
            </li>
            <li>
              무장 소요(騷擾)가 있거나 소요의 우려가 있는 지역에서 무장 소요 진압(경찰력만으로 그 소요를 진압하거나
              대처할 수 없는 경우만 해당한다.)
            </li>
            <li>제2호 및 제3호의 지역에 있는 중요시설·무기고 및 병참선(兵站線) 등의 경비</li>
            <li>「민방위기본법」 에 따른 민방위 업무의 지원</li>
          </ul>
        </div>
      </section>
    </SubLayout>
  );
}
