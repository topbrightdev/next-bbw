// @TODO: define and specify types instead of using any
export const scanBusinessesData = (businesses: Array<any>) => {
  const transformedBusinesses = [];
  for (const business of businesses) {
    if (business.business_name !== undefined) transformedBusinesses.push(formatData(business));
    else transformedBusinesses.push(business);
  }
  return transformedBusinesses;
};

// @TODO: define and specify types instead of using any
const formatData = (business: any) => {
  const { objectID: id, business_name: name, primary_industry, logo, city, state, industry } = business;
  return {
    id,
    name,
    categoryId: { id: "", name: primary_industry },
    mediaId: { id: "", source: logo },
    city,
    state,
    subcategory: industry.map((name) => ({ id: "", name })),
    businessType: "BUSINESS",
    isActive: true,
  };
};
