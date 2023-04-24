import React, { useState } from "react";

const PanelOption = ({ icon, name, description, textColor }) => {
  const [background, setBackground] = useState("")
  let isDes = true;
  if (description === "") isDes = false;
  return (
    <div className="panelParent">
      <div className="panelChild" style={{padding: isDes ? "15px 15px" : "10px 15px"}}>
        <div className="PanelOption">
          <div className="PanelOptionIcon">{icon}</div>
          <div className="PanelOptionTexts">
            <div className="PanelOptionName" style={{ color: textColor }}>
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
