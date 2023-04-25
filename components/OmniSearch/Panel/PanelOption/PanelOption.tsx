import React, { useState } from "react";

const PanelOption = ({ key, active, item, setSelected, setHovered }) => {
  let isDes = true;
  if (item.desc === "") isDes = false;
  return (
    <div className={`panelParent ${active ? "active" : ""}`} onClick={() => setSelected(item)} onMouseEnter={() => setHovered(item)} onMouseLeave={() => setHovered(undefined)}>
      <div className="panelChild" style={{padding: isDes ? "10px 15px" : "10px 15px"}}>
        <div className="PanelOption">
          <div className="PanelOptionIcon">{item.icon}</div>
          <div className="PanelOptionTexts">
            <div className="PanelOptionName" style={{ color: isDes ? "white" : "#7B8388" }}>
              {item.name}
            </div>
          </div>
        </div>
        {isDes && <div className="PanelOptionDesc">{item.desc}</div>}
      </div>
    </div>
  );
};

export default PanelOption;
