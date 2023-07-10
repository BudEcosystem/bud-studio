import React from 'react';
import './ToggleFileComponent.css';
import { useSelector } from 'react-redux';

export const FileLogo = () => {
  return (
    <svg
      width="12"
      height="15"
      viewBox="0 0 12 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group 1261155719">
        <path
          id="Subtract"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1.74121 0H7.34203C7.79326 0 8.22688 0.175176 8.55149 0.488612L11.4683 3.30493C11.8081 3.63305 12 4.08516 12 4.55754V12.7135C12 13.6752 11.2204 14.4547 10.2588 14.4547H1.74121C0.779567 14.4547 0 13.6752 0 12.7135V1.74121C0 0.779567 0.779568 0 1.74121 0ZM7.61829 0.181213V4.14825H11.6575L7.61829 0.181213ZM2.03435 11.638C2.03435 11.3619 2.25821 11.138 2.53435 11.138H7.61833C7.89447 11.138 8.11833 11.3619 8.11833 11.638C8.11833 11.9141 7.89447 12.138 7.61833 12.138H2.53435C2.25821 12.138 2.03435 11.9141 2.03435 11.638ZM5.37684 9.74457C5.65298 9.74457 5.87684 9.52071 5.87684 9.24457C5.87684 8.96843 5.65298 8.74457 5.37684 8.74457H2.53431C2.25816 8.74457 2.03431 8.96843 2.03431 9.24457C2.03431 9.52071 2.25816 9.74457 2.53431 9.74457H5.37684Z"
          fill="#7B8388"
        />
      </g>
    </svg>
  );
};

export const ToggleFileComponent = () => {
  const { workspace }: any = useSelector((state) => state);
  const { dropdownBreadcrumbs, currentSelectedDocId } = workspace;
  console.log(dropdownBreadcrumbs);
  return (
    <div className="toggleFileWrapper">
      <div className="toggleMainContainer">
        {dropdownBreadcrumbs?.map((item, i) => {
          if (item.id !== currentSelectedDocId) {
            return (
              <div className="toggleFile">
                <FileLogo />
                <p className="fileNameToggle">{item.name}</p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
