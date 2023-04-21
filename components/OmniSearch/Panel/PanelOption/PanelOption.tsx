import React from "react";

const PanelOption = ({ icon, name, description, textColor }) => {
  let isDes = true;
  if(description === "")
    isDes = false
  return (
    <div className="panelParent" style={{marginBottom: isDes ? '20px' : '13px'}}>
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
  );
};

export default PanelOption;
