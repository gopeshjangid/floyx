import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import "./animation.css";
export const AnimateForm = () => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "-300px" }
    );

    if (ref?.current) { observer.observe(ref.current); }

    return () => observer.disconnect();
  }, [isIntersecting]);

  useEffect(() => {
    if (isIntersecting) {
      document?.querySelector("#id-I03221_1366730")?.classList.add("object");
      document?.querySelector("#id-I03221_1366701")?.classList.add("object");
    }
    else {
      document?.querySelector("#id-I03221_1366730")?.classList.remove("object");
      document?.querySelector("#id-I03221_1366701")?.classList.remove("object");
    };

  }, [isIntersecting]);
  return (
    <div ref={ref} className="form-parent-div">
      <div className="group-1-571753 pos-abs" id="id-03221">
        <div className="frame-427320710-1-41184 pos-abs" id="id-I03221_1366730">
          <div
            className="frame-427320705-1-77063 pos-abs"
            id="id-I03221_1366731"
          >
            <div
              className="frame-427320704-1-264163 pos-abs"
              id="id-I03221_1366732"
            >
              <div
                className="add-channels-1-270052 pos-abs"
                id="id-I03221_1366733"
              >
                <span className="add-channels-1-270052-0">
                  {"Add channels"}
                </span>
              </div>
              <div
                className="frame-427319213-1-556154 pos-abs"
                id="id-I03221_1366734"
              >
                <div
                  className="frame-427319212-1-43516 pos-abs"
                  id="id-I03221_1366739"
                >
                  <div
                    className="enter-a-channel-1-141614 pos-abs"
                    id="id-I03221_1366740"
                  >
                    <span className="enter-a-channel-1-141614-0">
                      {"Enter a channel name"}
                    </span>
                  </div>
                </div>
                <div
                  className="frame-427320708-1-13398 pos-abs"
                  id="id-I03221_1366735"
                >
                  <div className="text-1-259752 pos-abs" id="id-I03221_1366738">
                    <span className="text-1-259752-0">{"Add channel "}</span>
                  </div>
                  <div
                    className="frame-427319217-1-451010 pos-abs"
                    id="id-I03221_1366736"
                  >
                    <div
                      className="enter-channel-n-1-108966 pos-abs"
                      id="id-I03221_1366737"
                    >
                      <span className="enter-channel-n-1-108966-0">
                        {"Enter channel name"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="frame-427320708-1-539440 pos-abs"
          id="id-I03221_1366684"
        >
          <div
            className="frame-427320687-1-33014 pos-abs"
            id="id-I03221_1366685"
          ></div>
          <div
            className="rectangle-1190-1-179334 pos-abs"
            id="id-I03221_1366697"
          ></div>
          <div
            className="create-a-group-1-230115 pos-abs"
            id="id-I03221_1366696"
          >
            <span className="create-a-group-1-230115-0">
              {"Create a group"}
            </span>
          </div>
          <div
            className="frame-427319213-1-623040 pos-abs"
            id="id-I03221_1366686"
          >
            <div
              className="frame-427319217-1-562900 pos-abs"
              id="id-I03221_1366687"
            >
              <div className="group-name-1-4040 pos-abs" id="id-I03221_1366688">
                <span className="group-name-1-4040-0">{"Group name"}</span>
              </div>
            </div>
            <div
              className="frame-427319212-1-209483 pos-abs"
              id="id-I03221_1366689"
            >
              <div
                className="enter-group-nam-1-49220 pos-abs"
                id="id-I03221_1366690"
              >
                <span className="enter-group-nam-1-49220-0">
                  {"Enter group name"}
                </span>
              </div>
            </div>
          </div>
          <div
            className="frame-427320689-1-159666 pos-abs"
            id="id-I03221_1366691"
          >
            <div
              className="frame-427319217-1-121656 pos-abs"
              id="id-I03221_1366692"
            >
              <div
                className="description-1-20185 pos-abs"
                id="id-I03221_1366693"
              >
                <span className="description-1-20185-0">{"Description "}</span>
              </div>
            </div>
            <div
              className="frame-427319212-1-563272 pos-abs"
              id="id-I03221_1366694"
            >
              <div
                className="enter-group-des-1-5733 pos-abs"
                id="id-I03221_1366695"
              >
                <span className="enter-group-des-1-5733-0">
                  {"Enter group description"}
                </span>
              </div>
            </div>
          </div>
          <div
            className="frame-427320688-1-895262 pos-abs"
            id="id-I03221_1366698"
          >
            <div
              className="upload-logo-1-162740 pos-abs"
              id="id-I03221_1366700"
            >
              <span className="upload-logo-1-162740-0">{"Upload logo"}</span>
            </div>
            <div
              className="outline--arrows-1-467122-container pos-abs"
              id="id-I03221_1366699"
            >
              <div
                className="outline--arrows-1-919080 pos-abs"
                id="id-I03221_1366699"
              >
                <div
                  className="vector-1-203840 pos-abs"
                  id="id-I03221_1366699_32220"
                >
                  <div
                    className="nodeBg-I03221_1366699_32220 pos-abs pos-init fill-parent bg-contain bg-no-repeat image-div"
                    id="id-bg-I03221_1366699_32220"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="frame-427320709-1-24605 pos-abs" id="id-I03221_1366701">
          <div
            className="frame-427320705-1-343712 pos-abs"
            id="id-I03221_1366702"
          >
            <div
              className="frame-427320704-1-17582 pos-abs"
              id="id-I03221_1366703"
            >
              <div
                className="add-admins-1-24912 pos-abs"
                id="id-I03221_1366704"
              >
                <span className="add-admins-1-24912-0">{"Add admins"}</span>
              </div>
              <div
                className="frame-427320703-1-644448 pos-abs"
                id="id-I03221_1366705"
              >
                <div
                  className="frame-427319212-1-167076 pos-abs"
                  id="id-I03221_1366706"
                ></div>
                <div
                  className="frame-427320702-1-36036 pos-abs"
                  id="id-I03221_1366707"
                >
                  <div className="nor-1-49762 pos-abs" id="id-I03221_1366709">
                    <span className="nor-1-49762-0">{"Nor "}</span>
                    <span className="nor-1-49762-1">
                      {" "}
                      <br />{" "}
                    </span>
                    <span className="nor-1-49762-2"> </span>
                  </div>
                  <div
                    className="outline--search-1-535506-container pos-abs"
                    id="id-I03221_1366708"
                  >
                    <div
                      className="outline--search-1-303888 pos-abs"
                      id="id-I03221_1366708"
                    >
                      <div
                        className="vector-1-41880 pos-abs"
                        id="id-I03221_1366708_35242"
                      >
                        <div
                          className="nodeBg-I03221_1366708_35242 pos-abs pos-init fill-parent bg-contain bg-no-repeat image-div"
                          id="id-bg-I03221_1366708_35242"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="frame-427320701-1-147658 pos-abs"
              id="id-I03221_1366710"
            >
              <div
                className="line-34-1-118320 pos-abs"
                id="id-I03221_1366720"
              ></div>
              <div
                className="frame-427320699-1-322092 pos-abs"
                id="id-I03221_1366711"
              >
                <div className="bttn-1-667818 pos-abs" id="id-I03221_1366718">
                  <div className="text-1-416520 pos-abs" id="id-I03221_1366719">
                    <span className="text-1-416520-0">{"Add"}</span>
                  </div>
                </div>
                <div
                  className="frame-427320696-1-566356 pos-abs"
                  id="id-I03221_1366712"
                >
                  <div
                    className="frame-427320695-1-510570 pos-abs"
                    id="id-I03221_1366715"
                  >
                    <div
                      className="nora-1-189120 pos-abs"
                      id="id-I03221_1366716"
                    >
                      <span className="nora-1-189120-0">{"Nora"}</span>
                    </div>
                    <div
                      className="jaco-1-180648 pos-abs"
                      id="id-I03221_1366717"
                    >
                      <span className="jaco-1-180648-0">{"@Jaco"}</span>
                    </div>
                  </div>
                  <div
                    className="frame-427320691-1-11248 pos-abs"
                    id="id-I03221_1366713"
                  >
                    <div
                      className="user-profile-pi-1-497295-container pos-abs"
                      id="id-I03221_1366714"
                    >
                      <div
                        className="user-profile-pi-1-199260 pos-abs"
                        id="id-I03221_1366714"
                      >
                        <div
                          className="memoji-1-263978 pos-abs"
                          id="id-I03221_1366714_69553"
                        ></div>
                        <div
                          className="mask-group-1-490855 pos-abs"
                          id="id-I03221_1366714_69554"
                        >
                          <div
                            className="nodeBg-I03221_1366714_69554 pos-abs pos-init fill-parent bg-contain bg-no-repeat image-div"
                            id="id-bg-I03221_1366714_69554"
                          >
                            {" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="frame-427320700-1-295728 pos-abs"
                id="id-I03221_1366721"
              >
                <div className="bttn-1-677642 pos-abs" id="id-I03221_1366728">
                  <div className="text-1-350424 pos-abs" id="id-I03221_1366729">
                    <span className="text-1-350424-0">{"Add"}</span>
                  </div>
                </div>
                <div
                  className="frame-427320698-1-177171 pos-abs"
                  id="id-I03221_1366722"
                >
                  <div
                    className="frame-427320697-1-139337 pos-abs"
                    id="id-I03221_1366725"
                  >
                    <div
                      className="novi-1-385671 pos-abs"
                      id="id-I03221_1366726"
                    >
                      <span className="novi-1-385671-0">{"Novi"}</span>
                    </div>
                    <div
                      className="miky-1-76609 pos-abs"
                      id="id-I03221_1366727"
                    >
                      <span className="miky-1-76609-0">{"@miky"}</span>
                    </div>
                  </div>
                  <div
                    className="frame-427320693-1-268650 pos-abs"
                    id="id-I03221_1366723"
                  >
                    <div
                      className="user-profile-pi-1-522786-container pos-abs"
                      id="id-I03221_1366724"
                    >
                      <div
                        className="user-profile-pi-1-139482 pos-abs"
                        id="id-I03221_1366724"
                      >
                        <div
                          className="memoji-1-141923 pos-abs"
                          id="id-I03221_1366724_111676"
                        ></div>
                        <div
                          className="mask-group-1-128128 pos-abs"
                          id="id-I03221_1366724_111677"
                        >
                          <div
                            className="nodeBg-I03221_1366724_111677 pos-abs pos-init fill-parent bg-contain bg-no-repeat image-div"
                            id="id-bg-I03221_1366724_111677"
                          >
                            {" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
