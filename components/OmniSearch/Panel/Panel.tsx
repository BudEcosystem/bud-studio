import React from "react";
import PanelOption from "./PanelOption/PanelOption";
import {
  Pin,
  Bookmark,
  FullScreen,
  Reload,
  Add,
  UpArrow,
  DownArrow
} from "./PanelOption/PanelSvgIcons";
import ButtonComponent from "./Button/Button";

const Panel = () => {
  return (
    <div className="Panel">
      <div className="PanelResults">482 results</div>

      <div className="PanelOptions">
        <PanelOption
          icon={<Pin />}
          name={"Pin Tab"}
          description={"Pin in the current tab"}
          textColor=""
        />
        <PanelOption
          icon={<Bookmark />}
          name={"Bookmark"}
          description={"Create a bookmark"}
          textColor=""
        />
        <PanelOption
          icon={<FullScreen />}
          name={"Fullscreen"}
          description={"Make the page fullscreen"}
          textColor=""
        />
        <PanelOption
          icon={<Reload />}
          name={"Reload"}
          description={"Reload the page"}
          textColor=""
        />
      </div>
      <div className="line"></div>
      <div className="action">Quick actions</div>
      <div className="PanelOptions">
        <PanelOption
          icon={<Add />}
          name={"Create New Task"}
          description={""}
          textColor="#7B8388"
        />
        <PanelOption
          icon={<Add />}
          name={"Create Note"}
          description={""}
          textColor="#7B8388"
        />
        <PanelOption
          icon={<Add />}
          name={"Create Add member"}
          description={""}
          textColor="#7B8388"
        />
      </div>
      <div className="bottomSuggestionContainer">
        <div className="btnContainer">
          <ButtonComponent name="Apps" />
          <ButtonComponent name="Peoples" />
          <ButtonComponent name="Files" />
          <ButtonComponent name="Commands" />
        </div>
        <div>
          <p className="bottomSuggestionText">Use arrow keys <span>{<UpArrow />}</span> <span>{<DownArrow />} to navigate.</span></p>
        </div>
      </div>
    </div>
  );
};

export default Panel;
