import { useContext, FC, useRef } from "react";
import { NextPage } from "next";
import { PageWrapperContent } from "@components/Layout";
import Button from "@components/Common/Button";
import { getStatsForBusinesses } from "../../services/Statistics/statistics-service";
import GlobalContext from "../../context/GlobalContext";

const growYourBusiness = require("@image/grow-your-business.png");
const constantlyGrowing = require("@image/constantly-growing.png");
const rocket = require("@image/svg/rocket.svg");
const ellipse = require("@image/svg/icon-ellipse.svg");
const logoMckinstry = require("@image/svg/logo-mckinstry.svg");
const logoFoster = require("@image/svg/logo-foster.svg");
const warmIntroduction = require("@image/warm-introduction.svg");
const solicitationTransparency = require("@image/svg/solicitation_transparency.svg");
const successFuel = require("@image/l3/png/success-fuel.png");
const quote = require("@image/svg/quote.svg");
const line = require("@image/svg/white-line.svg");
const changeWorld = require("@image/l3/png/change-world.png");
const committedPartners = require("@image/l3/png/committed-partners.png");
const news1 = require("@image/l3/png/news1.png");
const news2 = require("@image/l3/png/news2.png");
const news3 = require("@image/l3/png/news3.png");
const nextSlide = require("@image/svg/next-slide.svg");
const previousSlide = require("@image/svg/previous-slide.svg");
import { Carousel } from "antd";
import WorkCard from "@components/WorkCard";
import NewsCard from "@components/NewsCard";
import { CarouselRef } from "antd/lib/carousel";

const iconList = [
  { src: logoMckinstry, width: "132px" },
  { src: logoFoster, width: "180px" },
  { src: logoMckinstry, width: "132px" },
  { src: logoFoster, width: "180px" },
  { src: logoMckinstry, width: "132px" },
  { src: logoFoster, width: "180px" },
  { src: logoMckinstry, width: "132px" },
  { src: logoFoster, width: "180px" },
];

interface ListItemProps {
  text: string;
}

const ListItem: FC<ListItemProps> = ({ text }) => {
  return (
    <li className="my-10 small d-flex justify-content-start">
      <img className="mt-1 mr-8 text-start" alt="Ellipse" src={ellipse} width="20px" height="100%" />
      <span>{text}</span>
    </li>
  );
};

interface IconType {
  src: any;
  width: string | number;
  height?: string | number;
}
interface IconBlockProps {
  columns: number;
  iconList: Array<IconType>;
}

const IconBlock: FC<IconBlockProps> = ({ columns, iconList }) => {
  const totalRows = Math.ceil(iconList.length / columns);
  const colSize = Math.floor(12 / columns);
  const rows = new Array(totalRows).fill(1);
  const cols = new Array(columns).fill(1);
  let count = 0;
  return (
    <>
      {rows.map((_, indx: number) => {
        return (
          <div className="row my-12" key={`landing-icon-block-row-${indx}`}>
            {cols.map((_, indy: number) => {
              if (count < iconList.length) {
                const icon = iconList[count++];
                return (
                  <div className={`col col-${colSize}`} key={`landing-icon-block-row-${indx}-col-${indy}`}>
                    <img alt="Partners logos" src={icon.src} width={icon.width} height={icon.height || "100%"} />
                  </div>
                );
              } else return null;
            })}
          </div>
        );
      })}
    </>
  );
};

interface OurBusinessesPageProps {
  businessStats: {
    partnersCount: number;
    opportunityCount: number;
    contractsAwarded: number;
  };
}

const OurBusinessesPage: NextPage<OurBusinessesPageProps> = (props) => {
  const { toggleSignInModal, toggleScheduleCall } = useContext(GlobalContext);
  const workCarouselRef = useRef<CarouselRef>();
  const newsCarouselRef = useRef<CarouselRef>();

  const { businessStats } = props;

  return (
    <div>
      <PageWrapperContent>
        <div className="mb-20">
          <section className="row d-flex align-items-center pb-20 ml-32">
            <div className="col col-6 px-24" data-aos="fade-right" data-aos-duration="800">
              <h1 style={{ fontSize: 62, lineHeight: 1.35 }}>
                <strong>
                  IT&apos;S OUR BUSINESS TO GROW YOU
                  <br />
                  BUSINESS
                </strong>
              </h1>
              <div className="mt-16">
                {/* @ts-ignore */}
                <Button dark medium textUpperCase handleClick={toggleSignInModal} text="Find Businesses" />
              </div>
            </div>
            <div className="col col-6 pl-32" data-aos="fade-left" data-aos-duration="800">
              <img alt="Grow your business" src={growYourBusiness} width="100%" />
            </div>
          </section>

          <section className="row d-flex align-items-center bg-black-2">
            <div className="col col-4 px-0" data-aos="fade-right" data-aos-duration="800">
              <img alt="Constantly Growing" src={constantlyGrowing} width="480px" />
            </div>
            <div className="col col-8 d-flex flex-column px-32">
              <h1 className="text-light my-8" style={{ fontSize: 54 }} data-aos="fade-up" data-aos-duration="1000">
                We are constantly growing
              </h1>
              <p className="text-light" style={{ fontSize: 20, lineHeight: 2 }} data-aos="fade-up" data-aos-duration="1000">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua.
              </p>
              <img className="my-10" alt="Growth statistics" src={rocket} data-aos="fade-up" data-aos-duration="1000" />
              <div className="d-flex flex-fill justify-content-between text-light" data-aos="fade-up" data-aos-duration="1000">
                <div className="d-flex flex-column text-center justify-content-center">
                  <h3 className="text-light">{businessStats?.partnersCount || 0}</h3>
                  <p className="text-light small">Total Partners</p>
                </div>

                <div className="d-flex flex-column text-center justify-content-center">
                  <h3 className="text-light">{businessStats?.opportunityCount || 0}</h3>
                  <p className="text-light small">Total Opportunities</p>
                </div>

                <div className="d-flex flex-column text-center justify-content-center">
                  <h3 className="text-light">
                    {businessStats?.contractsAwarded?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 1,
                      minimumFractionDigits: 1,
                    }) || 0}
                  </h3>
                  <p className="text-light small">Total Opportunities</p>
                </div>
              </div>
            </div>
          </section>

          <section className="row d-flex justify-content-between align-items-center px-32 py-16 bg-polar">
            <div className="col col-4" data-aos="fade-up" data-aos-duration="1000">
              <h2 className="text-dark my-8" style={{ lineHeight: 1.5 }}>
                You have the expertise, we have the buyers
              </h2>
              <ul className="list-unstyled" data-aos="fade-up" data-aos-duration="1000">
                <ListItem text="Your dedicated business development team - we worry about the relationships you worry about your expertise. we will probably list different ways we support these businesses in winning contracts." />
                <ListItem text="Committed partners - show snippets of some of the commitment statement partners have made in doing business with our businesses." />
                <ListItem text="Solicitation transparency - maybe we show the details of opportunities so people can see what king of contracts they could win." />
              </ul>
            </div>
            <div className="col col-sm-4"></div>
            <div className="col col-sm-4" data-aos="fade-up" data-aos-duration="1000">
              <IconBlock columns={2} iconList={iconList} />
            </div>
          </section>

          {/* 4th section => work that's waiting for you */}

          <section className="row mt-25">
            <div className="col col-12 d-flex justify-content-center" data-aos="fade-up" data-aos-duration="1000">
              <h1>Work thats waiting for you</h1>
            </div>
          </section>
          <section className="mt-16" data-aos="fade-up" data-aos-duration="1000">
            <Carousel dots={false} ref={workCarouselRef}>
              <div>
                <div className="row d-flex justify-content-center py-5">
                  <WorkCard
                    type={"General Solicitation"}
                    title={"Professional Services"}
                    description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit, quisquam. Eius ipsam iusto, laudantium inventore optio velit officiis dolores ex voluptates laborum, minus in libero vero labore facilis accusantium cupiditate?"
                    additionalResources={["www.facebook.com"]}
                  />

                  <WorkCard
                    type={"General Solicitation"}
                    title={"Technology"}
                    description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit, quisquam. Eius ipsam iusto, laudantium inventore optio velit officiis dolores ex voluptates laborum, minus in libero vero labore facilis accusantium cupiditate?"
                    additionalResources={[]}
                  />

                  <WorkCard
                    type={"General Solicitation"}
                    title={"Marketing and Communication"}
                    description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit, quisquam. Eius ipsam iusto, laudantium inventore optio velit officiis dolores ex voluptates laborum, minus in libero vero labore facilis accusantium cupiditate?"
                    additionalResources={["www.facebook.com", "www.instagram.com"]}
                  />
                </div>
              </div>
              <div>
                <div className="row d-flex justify-content-center py-5">
                  <WorkCard
                    type={"General Solicitation"}
                    title={"Marketing and Communication"}
                    description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit, quisquam. Eius ipsam iusto, laudantium inventore optio velit officiis dolores ex voluptates laborum, minus in libero vero labore facilis accusantium cupiditate?"
                    additionalResources={["www.facebook.com", "www.instagram.com"]}
                  />
                  <WorkCard
                    type={"General Solicitation"}
                    title={"Technology"}
                    description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit, quisquam. Eius ipsam iusto, laudantium inventore optio velit officiis dolores ex voluptates laborum, minus in libero vero labore facilis accusantium cupiditate?"
                    additionalResources={[]}
                  />

                  <WorkCard
                    type={"General Solicitation"}
                    title={"Professional Services"}
                    description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit, quisquam. Eius ipsam iusto, laudantium inventore optio velit officiis dolores ex voluptates laborum, minus in libero vero labore facilis accusantium cupiditate?"
                    additionalResources={["www.facebook.com"]}
                  />
                </div>
              </div>
            </Carousel>
            <div className="d-flex justify-content-center align-items-center">
              <span onClick={() => (workCarouselRef ? workCarouselRef?.current?.prev() : null)}>
                <img src={previousSlide} alt="previous-slide" />
              </span>
              <h1 className="font-size-7 mx-4">.&nbsp;.&nbsp;.</h1>
              <span onClick={() => workCarouselRef.current.next()}>
                <img src={nextSlide} alt="next-slide" />
              </span>
            </div>
          </section>

          <section className="row d-flex align-items-center mt-16">
            <div className="col col-6" data-aos="fade-right" data-aos-duration="800">
              <div className="px-20">
                <h2>
                  <strong>Your dedicated business development team</strong>
                </h2>
                <p className="text-black font-size-4">We worry about the relationships you worry about you expertise</p>
              </div>
            </div>
            <div className="col col-6 p-0 m-0 d-flex justify-content-center" data-aos="fade-left" data-aos-duration="800">
              <img className="object-cover" alt="warm_introduction" src={warmIntroduction} />
            </div>
          </section>
          {/* 5th section =>  ComittedPartners*/}

          <section className="row d-flex align-items-center mt-16">
            <div className="col-6" data-aos="fade-right" data-aos-duration="800">
              <div className="position-relative d-flex justify-content-center">
                <img src={committedPartners} alt="commited-Partners" />

                <div className="position-absolute bg-white rounded shadow-sm px-10 py-10 commited-partner">
                  <h6 className="font-size-5 ">Our commitment</h6>
                  <p className="text-black font-size-3 my-5">
                    In October 2020, JPMorgan Chase announced a new long-term $30 billion commitment to advance racial equity. Part of
                    that commitment includes growing Black- and Latinx-owned businesses. The firm will provide an additional 15,000
                    loans to small businesses in majority Black and Latinx communities and spend significantly more with new and
                    existing Black and Latinx suppliers. Building on the firm’s supplier diversity efforts, JPMorgan Chase will spend an
                    additional $750 million with Black and Latinx suppliers over the next five years.
                  </p>
                </div>
              </div>
            </div>
            <div className="col col-6" data-aos="fade-right" data-aos-duration="800">
              <div className="px-20">
                <h2>
                  <strong>Committed Partners</strong>
                </h2>
                <p className="text-black font-size-4">We worry about the relationships you worry about your expertise</p>
              </div>
            </div>
          </section>

          <section className="row d-flex align-items-center mt-16">
            <div className="col col-6" data-aos="fade-right" data-aos-duration="800">
              <div className="px-20">
                <h2>
                  <strong>Solicitation Transparency</strong>
                </h2>
              </div>
            </div>
            <div className="col col-6 p-0 m-0 " data-aos="fade-left" data-aos-duration="800">
              <img className="w-100 object-cover" alt="warm_introduction" src={solicitationTransparency} />
            </div>
          </section>

          <section className="row bg-black-2 d-flex align-items-center mt-16  py-25">
            <div className="col col-6">
              <div className="px-20">
                <h1 className="text-white mb-15" data-aos="fade-up" data-aos-duration="1000">
                  Your success fuels ours
                </h1>
                <img src={quote} alt="quote" data-aos="fade-up" data-aos-duration="1000" />
                <p className="font-italic text-white my-10" data-aos="fade-up" data-aos-duration="1000">
                  Your company is truly upstanding and is behind its product 100%. It&apos;s the perfect solution for our business. It
                  has really helped our business.
                </p>
                <img src={line} alt="line" data-aos="fade-up" data-aos-duration="1000" />
                <p className="text-white mt-10" data-aos="fade-up" data-aos-duration="1000">
                  <strong>Alex Smith</strong>, CEO BRP Company
                </p>
              </div>
            </div>
            <div className="col col-6 d-flex justify-content-center align-items-center" data-aos="fade-left" data-aos-duration="800">
              <img className="object-cover" alt="warm_introduction" src={successFuel} />
            </div>
          </section>

          {/* 8th Section => News with Us */}
          <section className="row mt-25">
            <div className="col col-12 d-flex justify-content-center" data-aos="fade-up" data-aos-duration="1000">
              <h1>News with Us</h1>
            </div>
          </section>
          <section className="mt-16" data-aos="fade-up" data-aos-duration="1000">
            <Carousel dots={false} ref={newsCarouselRef}>
              <div className="row d-flex justify-content-center py-5">
                <NewsCard
                  src={news1}
                  title="How to build a loyal community online and offline"
                  description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
                />
                <NewsCard
                  src={news2}
                  title="How to build a loyal community online and offline"
                  description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
                />
                <NewsCard
                  src={news3}
                  title="Caring is the new marketing"
                  description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
                />
              </div>
              <div className="row d-flex justify-content-center py-5">
                <NewsCard
                  src={news3}
                  title="Caring is the new marketing"
                  description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
                />
                <NewsCard
                  src={news2}
                  title="How to build a loyal community online and offline"
                  description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
                />
                <NewsCard
                  src={news1}
                  title="How to build a loyal community online and offline"
                  description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
                />
              </div>
            </Carousel>
            <div className="d-flex justify-content-center align-items-center">
              <span onClick={() => newsCarouselRef.current.prev()}>
                <img src={previousSlide} alt="previous-slide" />
              </span>
              <h1 className="font-size-7 mx-4">.&nbsp;.&nbsp;.</h1>
              <span onClick={() => newsCarouselRef.current.next()}>
                <img src={nextSlide} alt="next-slide" />
              </span>
            </div>
          </section>

          <section className="row bg-black-2 d-flex align-items-center mt-16 py-18">
            <div className="col col-6 d-flex">
              <div className="mx-auto ">
                <h1 data-aos="fade-up" data-aos-duration="800">
                  {" "}
                  <strong className="text-white text-uppercase">
                    Are you still <br />
                    calm while other
                    <br /> businesses grow?
                  </strong>
                </h1>
                <p className="text-white font-size-4 mt-8" data-aos="fade-up" data-aos-duration="800">
                  You are very risky?
                </p>
                <div className="mt-10" data-aos="fade-up" data-aos-duration="800">
                  {/* @ts-ignore */}
                  <Button medium textUpperCase handleClick={toggleScheduleCall} text="Schedule a Call" />
                </div>
              </div>
            </div>

            <div className="col col-6 d-flex align-items-center justify-content-center " data-aos="fade-left" data-aos-duration="800">
              <img src={changeWorld} alt="change_world" />
            </div>
          </section>
        </div>
      </PageWrapperContent>
    </div>
  );
};

export default OurBusinessesPage;

export async function getServerSideProps(_) {
  const businessStats = await getStatsForBusinesses();

  return {
    props: {
      businessStats,
    },
  };
}
