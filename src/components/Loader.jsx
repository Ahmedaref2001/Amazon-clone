import React from "react";
import loaderStyle from "../style/loaderStyle.module.css" 
const Loader = () => {
  return (
    <div className={`position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center ${loaderStyle.overlay}`}>
      <div className={`d-flex justify-content-center align-items-center rounded-4 ${loaderStyle.loader_box}`}>
        <div className={`${loaderStyle.loader}`}>

        </div>
      </div>
    </div>
  );
};

export default Loader;
