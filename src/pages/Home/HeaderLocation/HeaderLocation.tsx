import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/configStore";
import { getLocationApi } from "../../../redux/Reducers/locationReducer";
import HomeLocationItem from "./HeaderLocationItem";

type Props = {};

export default function HeaderLocation({}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { locationList } = useSelector(
    (state: RootState) => state.locationReducer
  );
  useEffect(() => {
    dispatch(getLocationApi());
  }, []);

  const renderPositionList = () => {
    return (
      <>
        <div className="flex justify-between flex-wrap py-10">
          {locationList?.slice(0, 12).map((item: any, index: number) => {
            return <HomeLocationItem key={index} location={item} />;
          })}
        </div>
      </>
    );
  };
  return <div className="container-dn">{renderPositionList()}</div>;
}
