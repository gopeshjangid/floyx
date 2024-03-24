import React, { useEffect } from "react";
import "./style.css";
import "./animation.css";
import runAnimations, { allLinks, allFunctions } from "./scripts";
export const AnimateArticles = () => {
  useEffect(() => {
    runAnimations();
  }, []);
  return (
   <>
      
  
    <div className="parent-div-post">
   
      <div className="frame-427320682-1-92879 pos-abs" id="id-03144">
        <div className="article-1-762125-container pos-abs" id="id-03148">
          <div className="article-1-828360 pos-abs" id="id-03148">
            <div
              className="rectangle-1078-1-4125 pos-abs"
              id="id-I03148_933178"
            ></div>
            <div
              className="article-content-1-305660 pos-abs"
              id="id-I03148_933179"
            >
              <div
                className="nodeBg-I03148_933179 pos-abs image-div bg-no-repeat  bg-crop"
                id="id-bg-I03148_933179"
              >
                {" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
