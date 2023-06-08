/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/function-component-definition */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from 'react';
import { Layout, Space, Breadcrumb } from 'antd';
import classes from './dashboard.module.css';
import { useSelector } from 'react-redux';

const { Header } = Layout;

interface HeaderProps {
  slideFn: any;
  isCollapsed: boolean;
}

function SliderArrow({ slideFn, isCollapsed }: HeaderProps) {
  return (
    <div className={classes['slider-box']}>
      {isCollapsed ? (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <img
          className={classes['slide-arrow-active']}
          src="/images/other/CollapseIcon.svg"
          alt="#"
          width={30}
          height={30}
          onClick={slideFn}
        />
      ) : (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <img
          className={classes['slide-arrow']}
          src="/images/other/CollapseIcon.svg"
          alt="#"
          width={30}
          height={30}
          onClick={slideFn}
        />
      )}
    </div>
  );
}

const PencilIcon = ({ themeColor }: any) => {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.14758 0.244317C7.82182 -0.0814389 7.29363 -0.0814389 6.96779 0.244317L1.17848 6.03363C1.07493 6.13718 1.00045 6.26615 0.962544 6.40752L0 10L3.59248 9.03746C3.73393 8.99948 3.8629 8.92507 3.96637 8.82152L9.75568 3.03221C10.0814 2.70645 10.0814 2.17818 9.75568 1.85242L8.14758 0.244317ZM1.67652 6.7505L6.00233 2.42468L6.59216 3.01451L2.26634 7.34033L1.67652 6.7505ZM3.24956 8.32354L2.65968 7.73372L6.98549 3.4079L7.57532 3.99773L3.24956 8.32354Z"
        fill={`${themeColor}`}
      />
    </svg>
  );
};

const CanvasIcon = ({ themeColor }: any) => {
  return (
    <svg
      width="12"
      height="11"
      viewBox="0 0 12 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.41821 0H1.25036C0.747714 0 0 0.333048 0 1.25036V8.7525C0 9.25514 0.333048 10.0029 1.25036 10.0029H5.41821C5.92086 10.0029 6.66857 9.66981 6.66857 8.7525V1.25036C6.66857 0.747714 6.33552 0 5.41821 0ZM10.4196 5.00143H8.7525C8.24986 5.00143 7.50214 5.33448 7.50214 6.25179V8.7525C7.50214 9.25514 7.83519 10.0029 8.7525 10.0029H10.4196C10.9223 10.0029 11.67 9.66981 11.67 8.7525V6.25179C11.67 5.74914 11.337 5.00143 10.4196 5.00143ZM10.4196 0H8.7525C8.24986 0 7.50214 0.333048 7.50214 1.25036V2.9175C7.50214 3.42014 7.83519 4.16786 8.7525 4.16786H10.4196C10.9223 4.16786 11.67 3.83481 11.67 2.9175V1.25036C11.67 0.747714 11.337 0 10.4196 0ZM10.8364 2.9175C10.8364 3.25214 10.6084 3.32888 10.4163 3.33429H8.7525C8.41657 3.33429 8.34074 3.10505 8.33571 2.9175V1.25036C8.33571 0.91488 8.56495 0.838597 8.7525 0.833571H10.4196C10.7556 0.833571 10.8314 1.0628 10.8364 1.25036V2.9175Z"
        fill={`${themeColor}`}
      />
    </svg>
  );
};

const Star = ({ themeColor }: any) => {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5929 1.58203C7.83723 0.830044 8.90109 0.830047 9.14543 1.58203L10.116 4.56902C10.3993 5.44095 11.2118 6.03129 12.1286 6.03129H15.2693C16.06 6.03129 16.3887 7.04308 15.7491 7.50783L13.2082 9.35389C12.4665 9.89277 12.1561 10.848 12.4394 11.7199L13.4099 14.7069C13.6543 15.4589 12.7936 16.0842 12.1539 15.6194L9.61304 13.7734C8.87134 13.2345 7.86699 13.2345 7.12528 13.7734L4.5844 15.6194C3.94472 16.0842 3.08404 15.4589 3.32838 14.7069L4.29891 11.7199C4.58221 10.848 4.27186 9.89277 3.53015 9.35389L0.989265 7.50783C0.349588 7.04308 0.678339 6.03129 1.46902 6.03129H4.60973C5.52653 6.03129 6.33906 5.44095 6.62237 4.56902L7.5929 1.58203Z"
        stroke="white"
        strokeWidth="1.3"
      />
    </svg>
  );
};

const FolderIcon = ({ themeColor }: any) => {
  return (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="path-1-inside-1_2718_7894" fill="white">
        <path d="M0 2.55139H14.285C14.7351 2.55139 15.1 2.91626 15.1 3.36634V11.1852C15.1 11.6353 14.7351 12.0001 14.285 12.0001H0.814949C0.364865 12.0001 0 11.6353 0 11.1852V2.55139Z" />
      </mask>
      <path
        d="M0 2.55139H14.285C14.7351 2.55139 15.1 2.91626 15.1 3.36634V11.1852C15.1 11.6353 14.7351 12.0001 14.285 12.0001H0.814949C0.364865 12.0001 0 11.6353 0 11.1852V2.55139Z"
        fill="#7B8388"
        stroke="#7B8388"
        strokeWidth="2"
        mask="url(#path-1-inside-1_2718_7894)"
      />
      <path
        d="M9.31046 3.21167H9.34148L7.25436 0.617587L7.64392 0.304156L7.25436 0.617587C7.19457 0.543282 7.10434 0.500068 7.00897 0.500068H0.815096C0.641162 0.500068 0.500157 0.641065 0.500148 0.815001L0.500026 3.21166L9.31046 3.21167Z"
        fill="#7B8388"
        stroke="#7B8388"
      />
    </svg>
  );
};

const FileIcon = ({ themeColor }: any) => {
  return (
    <svg
      width="13"
      height="15"
      viewBox="0 0 13 15"
      fill={`${themeColor}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.84131 0H7.44212C7.89336 0 8.32698 0.175176 8.65159 0.488612L11.5684 3.30493C11.9082 3.63305 12.1001 4.08516 12.1001 4.55754V12.7135C12.1001 13.6752 11.3205 14.4547 10.3589 14.4547H1.84131C0.879665 14.4547 0.100098 13.6752 0.100098 12.7135V1.74121C0.100098 0.779567 0.879666 0 1.84131 0ZM7.71839 0.181213V4.14825H11.7576L7.71839 0.181213ZM2.13445 11.638C2.13445 11.3619 2.3583 11.138 2.63445 11.138H7.71842C7.99457 11.138 8.21842 11.3619 8.21842 11.638C8.21842 11.9141 7.99457 12.138 7.71842 12.138H2.63445C2.3583 12.138 2.13445 11.9141 2.13445 11.638ZM5.47694 9.74457C5.75308 9.74457 5.97694 9.52071 5.97694 9.24457C5.97694 8.96843 5.75308 8.74457 5.47694 8.74457H2.6344C2.35826 8.74457 2.1344 8.96843 2.1344 9.24457C2.1344 9.52071 2.35826 9.74457 2.6344 9.74457H5.47694Z"
        fill={`${themeColor}`}
      />
    </svg>
  );
};

function HeaderComp({ isCollapsed, slideFn }: HeaderProps) {
  const [feedtext, setFeedText] = useState('Editor');
  const [switchToggle, setSwitchToggle] = useState(false);
  const { workspace, activestate }: any = useSelector((state) => state);
  let { color } = workspace;
  const switchToggled = () => {
    setSwitchToggle(!switchToggle);
    if (switchToggle) {
      setFeedText('Editor');
    } else {
      setFeedText('Canvas');
    }
  };

  const menuItems = [
    {
      key: '1',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.alipay.com/"
        >
          General
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.taobao.com/"
        >
          Layout
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.tmall.com/"
        >
          Navigation
        </a>
      ),
    },
  ];

  // [
  //   {
  //     title: (
  //       <>
  //         <FolderIcon />
  //         <span>Mobile App UI</span>
  //       </>
  //     ),
  //   },
  //   {
  //     title: 'General',
  //     menu: { items: menuItems },
  //   },
  //   {
  //     title: (
  //       <>
  //         <FileIcon themeColor={color} />
  //         <span style={{ color: color }}>UI/UX Design</span>
  //       </>
  //     ),
  //   },
  // ]
  const { navigationPathArray } = activestate;
  // const arrayHandler = () => {
  //   const arr = [];
  //   for (let i = navigationPathArray.length - 1; i >= 0; i--) {
  //     const obj = {
  //       title: (
  //         <>
  //           <FileIcon themeColor={color} />
  //           <span style={{ color: color }}>{navigationPathArray[i].name}</span>
  //         </>
  //       ),
  //     };
  //   }
  //   return arr;
  // };
  return (
    <Header className={classes['site-layout-header']}>
      <SliderArrow slideFn={slideFn} isCollapsed={isCollapsed} />
      <Space split={' '} className={classes['arrow-box']}>
        {navigationPathArray?.length > 1 && (
          <div style={{ display: 'grid' }} className="hover-effect">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_2345_3558)">
                <rect
                  x="2"
                  y="2"
                  width="28"
                  height="28"
                  rx="13.8292"
                  fill="#25272B"
                />
              </g>
              <path
                d="M18.0512 11L13 16.0512L18.0512 21.1025"
                stroke="white"
                strokeWidth="1.72866"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <filter
                  id="filter0_d_2345_3558"
                  x="0"
                  y="0"
                  width="32"
                  height="32"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="1" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.85 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_2345_3558"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_2345_3558"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        )}
      </Space>

      <div className={classes['controls-box']}>
        <div className={classes['controls-box-path']}>
          <Breadcrumb
            separator={<span style={{ color: '#7B8388' }}>/</span>}
            className="BreadCrumb"
          >
            {navigationPathArray?.length > 1 &&
              (navigationPathArray?.length > 4 ? (
                <>
                  <Breadcrumb.Item>
                    <>
                      {<FolderIcon />}
                      <span style={{ color: '#7B8388' }}>
                        {navigationPathArray[0]}
                      </span>
                    </>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <>
                      <span style={{ color: color }}>......</span>
                    </>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <>
                      <FileIcon themeColor={color} />
                      <span style={{ color: color }}>
                        {navigationPathArray[navigationPathArray.length - 1]}
                      </span>
                    </>
                  </Breadcrumb.Item>
                </>
              ) : (
                <>
                  {navigationPathArray?.map((item: any, index: any) => (
                    <Breadcrumb.Item key={index}>
                      {index === navigationPathArray?.length - 1 ? (
                        <>
                          <FileIcon themeColor={color} />
                          <span style={{ color: color }}>{item}</span>
                        </>
                      ) : (
                        <>
                          {item && <FolderIcon />}
                          <span style={{ color: '#7B8388' }}>{item}</span>
                        </>
                      )}
                    </Breadcrumb.Item>
                  ))}
                </>
              ))}
          </Breadcrumb>
        </div>

        <div className={classes['controls-switch-box']}>
          <div
            onClick={switchToggled}
            style={{
              border: `${
                !switchToggle ? `0.5px solid ${color}` : '0.5px solid #25272B'
              }`,
              marginRight: '5px',
            }}
            className={classes['controls-switch']}
          >
            <PencilIcon themeColor={`${!switchToggle ? color : '#7B8388'}`} />
          </div>
          <div
            onClick={switchToggled}
            style={{
              border: `${
                switchToggle ? `0.5px solid ${color}` : '0.5px solid #25272B'
              }`,
            }}
            className={classes['controls-switch']}
          >
            <CanvasIcon themeColor={`${switchToggle ? color : '#7B8388'}`} />
          </div>
          <div className={classes['controls-switch-name']}>{feedtext}</div>
        </div>

        <div className={classes['controls-box-right-box']}>
          <div
            // className="hover-effect"
            style={{ width: '15px', height: '15px', display: 'flex' }}
          >
            <Star />
          </div>
          <p style={{ cursor: 'pointer' }}>Share</p>
          <p
            style={{
              cursor: 'pointer',
              borderRight: '2px solid #212023',
              paddingRight: '10px',
            }}
          >
            View mode
          </p>
          <div className={classes['pointBox']} style={{ display: 'flex' }}>
            <svg
              width="15"
              height="3"
              viewBox="0 0 15 3"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="1.43853" cy="1.39996" r="1.39996" fill="white" />
              <circle cx="7.23834" cy="1.39996" r="1.39996" fill="white" />
              <circle cx="13.0386" cy="1.39996" r="1.39996" fill="white" />
            </svg>
          </div>
        </div>
      </div>
    </Header>
  );
}

export default HeaderComp;
