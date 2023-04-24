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
  const items = [
    { id: 1, icon: <Pin />, name: "Pin Tab", desc: "Pin in the current tab" },
    { id: 2, icon: <Bookmark />, name: "Bookmark", desc: "Create a bookmark" },
    { id: 3, icon: <FullScreen />, name: "FullScreen", desc: "Make the page fullscreen" },
    { id: 4, icon: <Reload />, name: "Reload", desc: "Reload the page" },
  ]
  const items2 = [
    { id: 5, icon: <Add />, name: "Create New Task", desc: "" },
    { id: 6, icon: <Add />, name: "Create Note", desc: "" },
    { id: 7, icon: <Add />, name: "Create Add member", desc: "" },
  ]
  return (
    <div className="Panel">
      <div className="PanelResults">482 results</div>

      <div className="PanelOptions">
        {items.map((item) => (
          <PanelOption key={item.id} icon={item.icon} name={item.name} description={item.desc} />
        ))}
      </div>
      <div className="line"></div>
      <div className="action">Quick actions</div>
      <div className="PanelOptions">
      {items2.map((item) => (
          <PanelOption key={item.id} icon={item.icon} name={item.name} description={item.desc} />
        ))}
      </div>
      <div className="bottomSuggestionContainer">
        <div className="btnContainer">
          <ButtonComponent name="Apps" />
          <ButtonComponent name="Peoples" />
          <ButtonComponent name="Files" />
          <ButtonComponent name="Commands" />
        </div>
        <div>
          <p className="bottomSuggestionText">Use arrow keys  <span className="arrowDiv">{<UpArrow />}</span> <span className="arrowDiv">{<DownArrow />}</span>  to navigate</p>
        </div>
      </div>
    </div>
  );
};

export default Panel;
