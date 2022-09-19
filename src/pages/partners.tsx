// @PACKAGES
import { NextPage } from "next";
import algoliasearch from "algoliasearch";

// @COMPONENTS
import ViewBusinesses from "@components/ViewBusinesses";

// @SERVICES
import { getBusinesses } from "@services/Business";
import { getCategories } from "@services/Category";
import { BusinessInterface } from "@services/Business/types";
import { CategoryInterface } from "@services/Category/types";

// @UTILS
import { algoliaUtils } from "@utils/index";
import { DefaultValues } from "@utils/constants";

interface PartnersProps {
  businesses: BusinessInterface;
  type: string;
  categories: CategoryInterface;
}
const Partners: NextPage<PartnersProps> = ({ businesses, type, categories }) => {
  return (
    <>
      <ViewBusinesses businesses={businesses} type={type} categories={categories} />
    </>
  );
};

const getAlgoliaRecords = async (query) => {
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

export async function getServerSideProps(context) {
  const type = DefaultValues.PARTNER;
  let search = context.query.q;
  let sizeSearch = context.query.size;
  let size = [
    { weight: ">=", revenue: 750000 },
    { weight: "<", revenue: 750000 },
    { weight: ">", revenue: 0 },
  ];

  if (sizeSearch) {
    //@ts-ignore
    size = sizeSearch == "enterprise" ? size[0] : sizeSearch == "small" ? size[1] : size[2];
  }

  if (!search) {
    const [businesses, categories] = await Promise.all([getBusinesses(size, "PARTNER"), getCategories()]);

    //@ts-ignore
    businesses.sort((a, b) => a.name.localeCompare(b.name));
    categories.sort((a, b) => a.name.localeCompare(b.name));
    return {
      props: {
        businesses,
        size,
        type,
        categories: categories.map((cat) => cat.id),
      },
    };
  } else {
    const [businesses, categories] = await Promise.all([getAlgoliaRecords(search), getCategories()]);
    let transformedBusinesses = [];
    if (Array.isArray(businesses)) {
      transformedBusinesses = algoliaUtils.scanBusinessesData(businesses);
      transformedBusinesses.sort((a, b) => a.name.localeCompare(b.name));
    }

    categories.sort((a, b) => a.name.localeCompare(b.name));
    return {
      props: {
        businesses: transformedBusinesses,
        size,
        type,
        categories: categories.map((cat) => cat.id),
      },
    };
  }
}
export default Partners;
