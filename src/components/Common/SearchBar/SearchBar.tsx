import { useState, FC } from "react";
import { Button } from "react-bootstrap";

interface SearchBarProps {
  parentCallback: (arg: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ parentCallback }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    parentCallback(query);
  };
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  return (
    <div className="">
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

export default SearchBar;
