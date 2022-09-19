import React, { useState, useEffect, createContext, useCallback } from "react";
import { setCookie, destroyCookie } from "nookies";
import { State, City } from "country-state-city";
import { convertImgDataURLtoBase64 } from "@utils/convertImageURLtoBase64";
import { auth } from "../config/firebase";
import { getProfileAvatarUrl } from "@services/Storage";
import { getBusinessById, getBusinessWithDetailsById } from "../services/Business";
import { getUserById, getUserWithDetailsById } from "../services/User";
import { getCategories } from "@services/Category";
import { DefaultValues } from "@utils/constants";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [states, setStates] = useState(null);
  const [cities, setCities] = useState(null);
  const [categories, setCategories] = useState(null);
  const [currentUserWithDetails, setCurrentUserWithDetails] = useState(null);
  const [businessWithDetails, setBusinessWithDetails] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        //STATES
        const states = State.getStatesOfCountry("US");
        setStates(states);
        //CITIES
        const cities = City.getCitiesOfCountry("US");
        setCities(cities);
        //USER
        if (!currentUser || user.uid !== currentUser.id) {
          const [userData, userDetailData] = await Promise.all([getUserById(user.uid), getUserWithDetailsById(user.uid)]);
          setCurrentUser(userData);
          setCurrentUserWithDetails(() => ({
            ...userDetailData,
            avatarSource: null,
          }));

          if (userDetailData?.mediaId?.source) {
            const avatarURL = await getProfileAvatarUrl(userDetailData.mediaId.source, DefaultValues.USER);
            convertImgDataURLtoBase64(avatarURL, (base64) => {
              setCurrentUserWithDetails((state) => ({
                ...state,
                avatarSource: base64,
              }));
            });
          }
          //BUSINESS
          const [business, businessDetailData, categoriesData] = await Promise.all([
            getBusinessById(userData.parentId),
            getBusinessWithDetailsById(userData.parentId),
            getCategories(),
          ]);

          setBusiness(business);
          setBusinessWithDetails(() => ({ ...businessDetailData, logoSource: null }));
          setCategories(categoriesData);

          if (businessDetailData?.mediaId?.source) {
            const avatarURL = await getProfileAvatarUrl(businessDetailData.mediaId.source, DefaultValues.BUSINESS);
            convertImgDataURLtoBase64(avatarURL, (base64) => {
              setBusinessWithDetails((state) => ({
                ...state,
                logoSource: base64,
              }));
            });
          }

          setCookie("null", "BUSINESS_TYPE", businessDetailData.type);
        }
      } else {
        setCurrentUser(null);
        setBusiness(null);
        setCurrentUserWithDetails(null);
        setBusinessWithDetails(null);
        destroyCookie("null", "userId");
        destroyCookie("null", "BUSINESS_TYPE");
      }
      setLoading(false);
    });
  }, []);

  const refreshUserData = useCallback(async () => {
    const [userData, userDetailData] = await Promise.all([getUserById(currentUser.id), getUserWithDetailsById(currentUser.id)]);

    setCurrentUser(userData);
    const avatarURL = await getProfileAvatarUrl(userDetailData?.mediaId.source, DefaultValues.USER);

    convertImgDataURLtoBase64(avatarURL, (base64) => {
      setCurrentUserWithDetails({ ...userDetailData, avatarSource: base64 });
    });
  }, [currentUser, setCurrentUser]);

  const refreshBusinessData = useCallback(async () => {
    const [business, businessDetailData] = await Promise.all([
      getBusinessById(currentUser.parentId),
      getBusinessWithDetailsById(currentUser.parentId),
    ]);
    setBusiness(business);
    setBusinessWithDetails(businessDetailData);
  }, [business, setBusiness]);

  const updateUserAvatarSource = (source) => {
    setCurrentUserWithDetails((state) => ({ ...state, avatarSource: source }));
  };
  const updateBusinessLogoSource = (source) => {
    setBusinessWithDetails((state) => ({ ...state, logoSource: source }));
  };

  return (
    <DataContext.Provider
      value={{
        currentUser,
        business,
        loading,
        states,
        cities,
        currentUserWithDetails,
        businessWithDetails,
        categories,
        refreshUserData,
        refreshBusinessData,
        updateUserAvatarSource,
        updateBusinessLogoSource,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
export { DataProvider };
