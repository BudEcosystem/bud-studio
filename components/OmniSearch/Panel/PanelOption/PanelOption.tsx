import React, { useState } from "react";

const PanelOption = ({ key, icon, name, description }) => {
  const [background, setBackground] = useState(null)
  let isDes = true;
  if (description === "") isDes = false;
  return (
    <div className="panelParent">
      <div className="panelChild" style={{padding: isDes ? "10px 15px" : "10px 15px"}}>
        <div className="PanelOption">
          <div className="PanelOptionIcon">{icon}</div>
          <div className="PanelOptionTexts">
            <div className="PanelOptionName" style={{ color: isDes ? "white" : "#7B8388" }}>
              {name}
            </div>
          </div>
        </div>
        {isDes && <div className="PanelOptionDesc">{description}</div>}
      </div>
    </div>
  );
};

export default PanelOption;
