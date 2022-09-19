import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import algoliasearch from "algoliasearch";
import { auth } from "../../config/firebase";
import GlobalContext from "../../context/GlobalContext";

const Search = (props) => {
  const { businesses, partners, parentCallback } = props;
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { toggleSignInModal } = useContext(GlobalContext);
  const SendBusinesses = (query) => {
    const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
    const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME);
    let companies = index
      .search(query)
      .then(({ hits }) => {
        return hits;
      })
      .catch((err) => {
        console.error(err);
      });
    return companies;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      toggleSignInModal();
      return;
    }
    let companies = await SendBusinesses(query);
    if (parentCallback) {
      parentCallback(companies);
      setQuery("");
    }
    if (businesses) {
      router.push({
        pathname: "/businesses",
        query: { q: query },
      });
    }
    if (partners) {
      router.push({
        pathname: "/partners",
        query: { q: query },
      });
    }
  };

  const handleChange = (e) => {
    if (!auth.currentUser) toggleSignInModal();
    else setQuery(e.target.value);
  };

  return (
    <div className="pt-12">
      <form
        id="search"
        action="/"
        className="search-form"
        data-aos="fade-right"
        data-aos-duration="1000"
        data-aos-dealy="1200"
        onSubmit={handleSubmit}
      >
        <div className="filter-search-form-2 bg-white rounded-sm shadow-4 pr-5 py-5 pl-5">
          <div className="filter-inputs">
            <div className="form-group position-relative">
              <input
                className="form-control focus-reset pl-13 w-100"
                type="text"
                id="keyword"
                placeholder="Type Industry keywords"
                value={query}
                onChange={handleChange}
              />
              <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
                <i className="icon icon-zoom-2 text-primary font-weight-bold"></i>
              </span>
            </div>
          </div>
          <div className="button-block">
            <Button className="line-height-reset h-100 btn-submit w-100 text-uppercase" type="submit" form="search" value="Submit">
              Search
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Search;
