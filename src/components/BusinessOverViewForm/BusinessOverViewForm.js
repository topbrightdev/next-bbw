import { useState, useContext, useEffect } from "react";
import { Formik, ErrorMessage, Field, FieldArray } from "formik";
import {
  businessOverViewInitialValues,
  businessOverViewValidationSchema,
  businessOverViewVFormFields,
} from "../../utils/validationSchemas";
import { Button, ScreenLoader } from "../Common";
import DataContext from "../../context/DataContext";
import { updateBusiness } from "../../services/Business";
import { addPressRelease, deletePressRelease, getPressReleaseByBusinessId, updatePressRelease } from "../../services/PressRelease";
import { isEqual } from "lodash/lang";
import Select from "../Core/Select";
import { toast } from "react-toastify";
import { BsCheckCircle } from "react-icons/bs";
import { EmployeeSize } from "../../utils/constants";
import close from "../../assets/image/svg/close.svg";
import { getAllCertifications } from "../../services/Certification";
import { getCategories, getSubcategoriesByCategoryId } from "../../services/Category";
import { getAllSubcategories } from "@services/Subcategory";

const BusinessOverViewForm = () => {
  const [data, setData] = useState(businessOverViewInitialValues);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [businessLoading, setBusinessLoading] = useState(true);
  const [certificationsArray, setCertifications] = useState([]);
  const [categoryArray, setCategory] = useState([]);
  const [subcategoryArray, setSubcategory] = useState([]);
  const { businessWithDetails } = useContext(DataContext);
  const [allSubcategories, setAllSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState([]);

  const getSelectedValue = (value, array) => {
    const foundedValue = array.find((element) => {
      return value === element.label;
    });
    if (foundedValue) {
      const index = array.indexOf(foundedValue);

      return index;
    }
    return 0;
  };

  const getArrayOfIds = (array) => {
    return array ? array.map((object) => object.value) : [];
  };

  const getIdInTermsOfLabel = (value, array) => {
    return array.find((option) => value === option.label);
  };

  const handleDeletePressRelease = async (pressReleaseId) => {
    await deletePressRelease(pressReleaseId);
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setFormData(values);
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateInfo = async () => {
    try {
      setLoading(true);
      let update = {};

      let {
        services: subcategory,
        industryType: categoryId,
        certifications: certification,
        companyName: name,
        employeeSize: employees,
        yearFounded,
        about: description,
        news,
      } = formData;

      if (isEqual(formData.industryType, data.industryType)) {
        categoryId = getIdInTermsOfLabel(formData.industryType, categoryArray).value;
      }
      if (isEqual(formData.services, data.services)) {
        const array = formData.services.map((value) => {
          return getIdInTermsOfLabel(value, subcategoryArray);
        });
        subcategory = getArrayOfIds(array);
      }
      if (isEqual(formData.certifications, data.certifications)) {
        const result = formData.certifications.map((value) => {
          return getIdInTermsOfLabel(value, certificationsArray);
        });
        certification = getArrayOfIds(result);
      }

      if (news && Array.isArray(news)) {
        for (let newsObject of news) {
          if (newsObject.id) {
            await updatePressRelease(newsObject.id, {
              source: newsObject.source,
            });
          } else {
            await addPressRelease({
              source: newsObject.source,
              businessId: businessWithDetails.id,
            });
          }
        }
      }
      update = {
        subcategory,
        categoryId,
        certification,
        name,
        employees,
        yearFounded,
        description,
      };
      await updateBusiness(businessWithDetails.id, update);
      toast("Profile changes were saved", {
        className: "bg-dark",
        bodyClassName: "text-white",
        icon: <BsCheckCircle color="#ffffff" size={30} />,
      });
    } catch (error) {
      setLoading(false);
      toast.error("There was an error while updating the profile");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function updateProfile() {
      updateInfo();
    }
    if (formData) {
      updateProfile();
    }
  }, [formData]);

  const formatData = (array) => {
    return array.map((doc) => {
      let object = {};
      object.label = doc.name;
      object.value = doc.id;
      return object;
    });
  };

  const fetchData = async () => {
    const [news, certificationsData, categoriesData, subcategoriesData, allSubcategoriesData] = await Promise.all([
      getPressReleaseByBusinessId(businessWithDetails.id),
      getAllCertifications(),
      getCategories(),
      getSubcategoriesByCategoryId(businessWithDetails.categoryId.id),
      getAllSubcategories(),
    ]);

    const certificationArray = formatData(certificationsData).sort((a, b) => (a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1));
    const categoryLabelList = [];
    const categoriesArray = [];
    for (const catData of categoriesData) {
      const { name: label, id: value, subcategory } = catData;
      if (label === businessWithDetails.categoryId.name || !categoryLabelList.includes(label.toLowerCase().trim())) {
        categoriesArray.push({ label, value, subcategory });
        categoryLabelList.push(label.toLowerCase().trim());
      }
    }
    // const categoriesArray = categoriesData
    // .filter(cat => Array.isArray(cat.subcategory) && cat.subcategory.length > 0)
    // .map(({name: label, id: value, subcategory}) => ({label, value, subcategory}))
    // .sort((a,b) => a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1);
    categoriesArray.sort((a, b) => (a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1));
    const subcategoriesArray = formatData(subcategoriesData).sort((a, b) => (a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1));
    const allSubcategoriesArray = formatData(allSubcategoriesData).sort((a, b) =>
      a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1,
    );

    setCertifications(certificationArray);
    setCategory(categoriesArray);
    setSubcategory(subcategoriesArray);
    setAllSubcategories(allSubcategoriesArray);

    const {
      name: companyName,
      categoryId: { name: industryType },
      description: about,
      yearFounded,
      employees: employeeSize,
      subcategory,
      certification,
    } = businessWithDetails;
    const certifications = certification.map((cert) => cert.name);
    const services = subcategory.map((sub) => sub.name);
    setData((state) => ({
      ...state,
      companyName,
      industryType,
      about,
      yearFounded,
      employeeSize,
      services,
      certifications,
      news,
    }));

    setSelectedCategory(industryType);
    setSelectedSubcategory(services);

    setBusinessLoading(false);
  };

  const getCategory = () => {
    const foundIndex = categoryArray.findIndex((item) => selectedCategory === item.label);
    return foundIndex >= 0 ? foundIndex : 0;
  };

  const getSubcategoriesOfCategory = () => {
    const { subcategory } = {
      ...categoryArray.find((item) => selectedCategory === item.label),
    };
    return subcategory ? allSubcategories.filter((subcat) => subcategory.includes(subcat.value)) : [];
  };

  const getSubcategories = () => {
    const allSubcategoriesOfCategory = getSubcategoriesOfCategory();
    const foundIndices = Array.isArray(selectedSubcategory)
      ? selectedSubcategory
          .map((subcat) => allSubcategoriesOfCategory.findIndex((allSubcat) => allSubcat.label === subcat))
          .filter((ind) => ind !== -1)
      : [];

    return foundIndices;
  };

  useEffect(() => {
    if (businessWithDetails) {
      fetchData();
    }
  }, [businessWithDetails]);

  if (businessLoading) {
    return <ScreenLoader />;
  }

  const SubcategorySelect = ({ name, setFieldValue }) => (
    <Select
      name={name}
      options={getSubcategoriesOfCategory()}
      isMultiSelect={true}
      defaultValue={getSubcategories()}
      sendFilters={(option) => {
        const arrayOfIds = getArrayOfIds(option);
        setFieldValue(name, arrayOfIds);
        setSelectedSubcategory(Array.isArray(option) ? option.map((opt) => opt.label) : []);
      }}
    />
  );

  return (
    <>
      <Formik initialValues={data} validationSchema={businessOverViewValidationSchema} onSubmit={handleSubmit} enableReinitialize>
        {({ values, handleSubmit, setFieldValue }) => {
          return (
            <div className="form-group">
              <div className="row mt-8">
                {businessOverViewVFormFields.map(({ label, name, placeholder, type, fieldSize }) => {
                  {
                    return (
                      <div key={name} className={`mb-9 ${fieldSize === "full" ? "col-12" : "col-6"}`}>
                        <label htmlFor={name} className="font-size-4 text-black-2 font-weight-semibold line-height-reset">
                          {label}
                        </label>

                        {type === "text" && name !== "news" ? (
                          <Field name={name} type="text" className="form-control" placeholder={placeholder} />
                        ) : type === "select" && name === "industryType" ? (
                          <Select
                            name={name}
                            options={categoryArray}
                            defaultValue={getCategory()}
                            sendFilters={(option) => {
                              setFieldValue(name, option.value);
                              setFieldValue("services", []);
                              setSelectedCategory(option.label);
                              setSelectedSubcategory([]);
                            }}
                          />
                        ) : type === "select" && name === "services" ? (
                          <SubcategorySelect name={name} setFieldValue={setFieldValue} />
                        ) : type === "select" && name === "employeeSize" ? (
                          <Select
                            name={name}
                            options={EmployeeSize}
                            defaultValue={getSelectedValue(data.employeeSize, EmployeeSize)}
                            sendFilters={(option) => {
                              setFieldValue(name, option.value);
                            }}
                          />
                        ) : type === "select" && name === "certifications" ? (
                          <Select
                            name={name}
                            options={certificationsArray}
                            isMultiSelect={true}
                            defaultValue={
                              data.certifications
                                ? data.certifications.map((name) => {
                                    return getSelectedValue(name, certificationsArray);
                                  })
                                : 0
                            }
                            sendFilters={(option) => setFieldValue(name, getArrayOfIds(option))}
                          />
                        ) : type === "text" && name === "news" ? (
                          <FieldArray
                            name={name}
                            render={(arrayHelpers) => (
                              <div>
                                {values.news && values.news.length > 0
                                  ? values.news.map((currentValue, index) => (
                                      <div key={index} className="d-flex flex-row justify-content-center align-items-center mt-5">
                                        {/** both these conventions do the same */}
                                        <Field name={`${name}[${index}].source`} placeholder={placeholder} className="form-control" />

                                        <img
                                          src={close}
                                          alt="close"
                                          className="pointer ml-5"
                                          onClick={() => {
                                            arrayHelpers.remove(index);
                                            handleDeletePressRelease(currentValue.id);
                                          }}
                                        />
                                      </div>
                                    ))
                                  : null}
                                <div className="mt-7">
                                  <Button
                                    handleClick={() =>
                                      arrayHelpers.push({
                                        source: "",
                                        businessId: "",
                                      })
                                    }
                                    text={"Add News"}
                                    small
                                    textUpperCase
                                  />
                                </div>
                              </div>
                            )}
                          />
                        ) : (
                          <Field name={name} component="textarea" rows="5" className="form-control" placeholder={placeholder} />
                        )}

                        <ErrorMessage name={name} component="div" className="text-danger" />
                      </div>
                    );
                  }
                })}
              </div>
              <div className="mt-10">
                <Button handleClick={handleSubmit} text="Update Profile" dark medium textUpperCase loading={loading} />
              </div>
            </div>
          );
        }}
      </Formik>
    </>
  );
};

export default BusinessOverViewForm;
