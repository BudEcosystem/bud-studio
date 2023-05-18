/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/function-component-definition */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from 'react';
import { Layout, Space, Breadcrumb} from 'antd';
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

const  PencilIcon = ({themeColor}:any) => {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.14758 0.244317C7.82182 -0.0814389 7.29363 -0.0814389 6.96779 0.244317L1.17848 6.03363C1.07493 6.13718 1.00045 6.26615 0.962544 6.40752L0 10L3.59248 9.03746C3.73393 8.99948 3.8629 8.92507 3.96637 8.82152L9.75568 3.03221C10.0814 2.70645 10.0814 2.17818 9.75568 1.85242L8.14758 0.244317ZM1.67652 6.7505L6.00233 2.42468L6.59216 3.01451L2.26634 7.34033L1.67652 6.7505ZM3.24956 8.32354L2.65968 7.73372L6.98549 3.4079L7.57532 3.99773L3.24956 8.32354Z" fill={`${themeColor}`}/>
    </svg>
  );
  }

  const  CanvasIcon = ({themeColor}: any) => {
    return (
      <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.41821 0H1.25036C0.747714 0 0 0.333048 0 1.25036V8.7525C0 9.25514 0.333048 10.0029 1.25036 10.0029H5.41821C5.92086 10.0029 6.66857 9.66981 6.66857 8.7525V1.25036C6.66857 0.747714 6.33552 0 5.41821 0ZM10.4196 5.00143H8.7525C8.24986 5.00143 7.50214 5.33448 7.50214 6.25179V8.7525C7.50214 9.25514 7.83519 10.0029 8.7525 10.0029H10.4196C10.9223 10.0029 11.67 9.66981 11.67 8.7525V6.25179C11.67 5.74914 11.337 5.00143 10.4196 5.00143ZM10.4196 0H8.7525C8.24986 0 7.50214 0.333048 7.50214 1.25036V2.9175C7.50214 3.42014 7.83519 4.16786 8.7525 4.16786H10.4196C10.9223 4.16786 11.67 3.83481 11.67 2.9175V1.25036C11.67 0.747714 11.337 0 10.4196 0ZM10.8364 2.9175C10.8364 3.25214 10.6084 3.32888 10.4163 3.33429H8.7525C8.41657 3.33429 8.34074 3.10505 8.33571 2.9175V1.25036C8.33571 0.91488 8.56495 0.838597 8.7525 0.833571H10.4196C10.7556 0.833571 10.8314 1.0628 10.8364 1.25036V2.9175Z" fill={`${themeColor}`}/>
      </svg>

    );
    }

    const  FolderIcon = ({themeColor}: any) => {
      return (
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="path-1-inside-1_1076_1233" fill="white">
          <path d="M0 2.55139H14.285C14.7351 2.55139 15.1 2.91626 15.1 3.36634V11.1852C15.1 11.6353 14.7351 12.0001 14.285 12.0001H0.814949C0.364865 12.0001 0 11.6353 0 11.1852V2.55139Z"/>
          </mask>
          <path d="M0 2.55139H14.285C14.7351 2.55139 15.1 2.91626 15.1 3.36634V11.1852C15.1 11.6353 14.7351 12.0001 14.285 12.0001H0.814949C0.364865 12.0001 0 11.6353 0 11.1852V2.55139Z" fill="#7B8388" stroke="#7B8388" strokeWidth="2" mask="url(#path-1-inside-1_1076_1233)"/>
          <path d="M9.31046 3.21167H9.34148L7.25436 0.617587L7.64392 0.304156L7.25436 0.617587C7.19457 0.543282 7.10434 0.500068 7.00897 0.500068H0.815096C0.641162 0.500068 0.500157 0.641065 0.500148 0.815001L0.500026 3.21166L9.31046 3.21167Z" fill="#7B8388" stroke="#7B8388"/>
          </svg>

      );
      }

      const FileIcon = ({themeColor}: any) => {
        return (
          <svg
            width="12"
            height="14"
            viewBox="0 0 12 14"
            fill={`${themeColor}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.99465 0.5H2.76014C1.52235 0.5 0.518921 1.50343 0.518921 2.74121V11.2588C0.518921 12.4966 1.52235 13.5 2.76014 13.5H9.23984C10.4776 13.5 11.4811 12.4966 11.4811 11.2588V4.90909C11.4811 4.30107 11.234 3.71914 10.7966 3.2968L8.55142 1.12892C8.13359 0.725479 7.57546 0.5 6.99465 0.5Z"
              stroke="#000000"
            />
            <path
              d="M7.34338 1.15045V2.70258C7.34338 3.66423 8.12295 4.4438 9.0846 4.4438H10.6966"
              stroke="#000000"
            />
            <path
              d="M7.34329 10.6616L3.12268 10.6616"
              stroke="#000000"
              strokeLinecap="round"
            />
            <path
              d="M3.12274 8.67462L5.48254 8.67462"
              stroke="#000000"
              strokeLinecap="round"
            />
          </svg>
        );
        }




function HeaderComp({ isCollapsed, slideFn }: HeaderProps) {

  const [feedtext,setFeedText] = useState("Editor");
  const [switchToggle, setSwitchToggle] = useState(false)
  const {workspace}:any = useSelector(state=>state)
  let { color } = workspace
  const switchToggled = () => {
    setSwitchToggle(!switchToggle);
    if(switchToggle) {
      setFeedText("Editor")
    }
    else {
      setFeedText("Canvas")
    }
  }

  const menuItems = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
          General
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
          Layout
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
          Navigation
        </a>
      ),
    },
  ];


  return (
    <Header className={classes['site-layout-header']}>
      <SliderArrow slideFn={slideFn} isCollapsed={isCollapsed} />
      <Space split={' '} className={classes['arrow-box']}>
        <img
          style={{display: "grid" }}
          className="hover-effect"
          src="/images/other/BackArrow.svg"
          alt="#"
          width={36}
          height={36}
        />
      </Space>

      <div className={classes['controls-box']}>
        <div className={classes['controls-box-path']}>
          <Breadcrumb className="BreadCrumb"
              items={[
                {
                  title: (
                    <>
                      <FolderIcon />
                      <span>Mobile App UI</span>
                    </>
                  )
                },
                {
                  title:"General",
                  menu: { items: menuItems },
                },
                {
                  title: (
                    <>
                      <FileIcon themeColor={color} />
                      <span style={{color: color}}>UI/UX Design</span>
                    </>
                  ),
                },
              ]}
            />
        </div>

        <div className={classes['controls-switch-box']}>
          <div onClick={switchToggled} style={{border: `${!switchToggle ? `1px solid ${color}` : "1px solid #25272B"}`, background: `${!switchToggle ? "#1a1a20" : "#25272B"}` }} className={classes['controls-switch']}>
            <PencilIcon themeColor={`${!switchToggle ? color : "#7B8388"}`}/>
          </div>
          <div onClick={switchToggled} style={{border: `${switchToggle ? `1px solid ${color}` : "1px solid #25272B"}` , background: `${switchToggle ? "#1a1a20" : "#25272B"}` }} className={classes['controls-switch']}>
            <CanvasIcon themeColor={`${switchToggle ? color : "#7B8388"}`}/>
          </div>
          <div className={classes['controls-switch-name']}>
            {feedtext}
          </div>
        </div>

        <div className={classes['controls-box-right-box']}>
          <img
            className="hover-effect"
            src="/images/other/favourite-icon.png"
            alt="#"
            width={15}
            height={15}
          />
          <p style={{cursor: "pointer"}}>Share</p>
          <p style={{cursor: "pointer"}}>View mode</p>
          <img
            className="hover-effect"
            src="/images/other/more.png"
            alt="#"
            width={30}
            height={20}
          />
        </div>
      </div>
    </Header>
  );
}

export default HeaderComp;
