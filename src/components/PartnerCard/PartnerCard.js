import React from "react";
import Link from "next/link";
import iconM from "../../assets/image/svg/icon-industry-white.svg";
import { truncate } from "../../utils";

const PartnerCard = (props) => {
  const {
    business_name,
    industry,
    // type,
    business_description,
    // opportunities,
    // transactions,
    logo,
    id,
    partner_type,
    status,
  } = props;

  return (
    <div className="col-12 col-lg-6">
      {/* <!-- Start Feature One --> */}

      <div className="bg-white px-8 pt-9 pb-7 rounded-4 mb-9 feature-cardOne-adjustments rounded hover-shadow-3">
        <div className="d-block mb-7 mt-7">
          <a>
            <img src={logo} alt="black business warehouse" style={{ maxWidth: "115px", maxHeight: "115px" }} />
          </a>
          {status == "pending" ? (
            <a
              className="bg-mid-gray absoulute text-black font-size-3 pl-6 pr-6 pt-2 pb-2"
              css={`
                position: absolute;
                right: 15px;
                top: 25px;
              `}
            >
              Coming Soon
            </a>
          ) : null}
        </div>
        <a className="font-size-3 d-block mb-0 text-gray">{partner_type}</a>
        <h2 className="mt-n4">
          <a className="font-size-7 text-black-2 font-weight-bold mb-4">{business_name}</a>
        </h2>
        <ul className="list-unstyled mb-1 card-tag-list">
          {/* 
         {status == 'pending' ? 'test' : 'none'} 
         <li>
          <Link href={{ pathname: `/partner/${id}`, query: { object: JSON.stringify(props) } }} as={`/partner/${business_name}`} >
              <a className="bg-dark-gray text-white font-size-3 rounded-3">
                <span
                  className="mr-4"
                  css={`
                    margin-top: -2px;
                  `}
                >
                  <img src={iconL} alt="" />
                </span>
                <i className="icon icon-pin-3 mr-2 font-weight-bold"></i>{' '}
                {opportunities.length}
              </a>
            </Link>
          </li> */}
          <li>
            <a className="bg-dark-gray text-white font-size-3 rounded-3 pl-4 pr-4">
              <span
                className="mr-4"
                css={`
                  margin-top: -2px;
                `}
              >
                <img src={iconM} alt="Industry" />
              </span>{" "}
              {industry}
            </a>
          </li>
        </ul>
        {status == "pending" ? null : (
          <>
            <p className="mb-7 font-size-4 text-gray">{truncate(business_description)}</p>

            <div className="card-btn-group">
              <Link
                href={{
                  pathname: `/partner/${id}`,
                  query: { object: JSON.stringify(props) },
                }}
                as={`/partner/${business_name}`}
              >
                <a className="btn btn-dark-gray text-uppercase btn-medium rounded-3">Learn more</a>
              </Link>
              {/* <Link href="/partner">
                <a className="btn btn-outline-mercury text-black-2 text-uppercase btn-medium rounded-3">
                  <i className="icon icon-bookmark-2 font-weight-bold mr-4 font-size-4"></i>{' '}
                  Save it
                </a>
              </Link> */}
            </div>
          </>
        )}
      </div>
      {/* <!-- End Feature One --> */}
    </div>
  );
};

export default PartnerCard;

// TODO: GET FIREBASE PARTNERS
export async function getStaticProps() {
  // const product_res = await fetch(`${API_URL}/products/`)
  // const products = await product_res.json()

  return {
    props: {
      data: "TESTING",
    },
  };
}
