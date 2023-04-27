/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Layout, Space, Switch } from 'antd';
import classes from './dashboard.module.css';

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
          src="/images/other/slideArrowIcon.png"
          alt="#"
          width={30}
          height={30}
          onClick={slideFn}
        />
      ) : (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <img
          className={classes['slide-arrow']}
          src="/images/other/slideArrowIcon.png"
          alt="#"
          width={30}
          height={30}
          onClick={slideFn}
        />
      )}
    </div>
  );
}

function HeaderComp({ isCollapsed, slideFn }: HeaderProps) {
  return (
    <Header className={classes['site-layout-header']}>
      <SliderArrow slideFn={slideFn} isCollapsed={isCollapsed} />
      <Space split={' '} align="center" className={classes['arrow-box']}>
        <img
          style={{ marginTop: '28px' }}
          className="hover-effect"
          src="/images/other/arrow-left.png"
          alt="#"
          width={10}
          height={15}
        />
        {/* <img
          className="hover-effect"
          src="/images/other/arrow-right.png"
          alt="#"
          width={10}
          height={15}
        /> */}
      </Space>
      <div className={classes['controls-box']}>
        <div className={classes['controls-box-path']}>
          <svg
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask id="path-1-inside-1_876_563" fill="white">
              <path d="M0 2.25932H11.1851C11.6351 2.25932 12 2.62419 12 3.07427V8.95331C12 9.40339 11.6351 9.76825 11.1851 9.76825H0.814948C0.364865 9.76825 0 9.40339 0 8.95331V2.25932Z" />
            </mask>
            <path
              d="M0 2.25932H11.1851C11.6351 2.25932 12 2.62419 12 3.07427V8.95331C12 9.40339 11.6351 9.76825 11.1851 9.76825H0.814948C0.364865 9.76825 0 9.40339 0 8.95331V2.25932Z"
              fill="#939AFF"
              stroke="#939AFF"
              strokeWidth="2"
              mask="url(#path-1-inside-1_876_563)"
            />
            <path
              d="M0.500109 1.04666L0.500026 2.68134L7.20936 2.68135L5.73531 0.84925C5.67552 0.774945 5.58529 0.731731 5.48992 0.731731H0.815057C0.641123 0.731731 0.500118 0.872728 0.500109 1.04666Z"
              stroke="#939AFF"
            />
          </svg>
        </div>
        <div className={classes['controls-switch-box']}>
          <Switch className={classes['controls-switch']} />
          {/* <img
            className={classes["controls-switch-arrow"]}
            src={"/images/other/switch-arrow.png"}
            alt={"#"}
            width={10}
            height={10}
          /> */}
        </div>
        <div className={classes['controls-box-right-box']}>
          <img
            className="hover-effect"
            src="/images/other/favourite-icon.png"
            alt="#"
            width={15}
            height={15}
          />
          <p>Share</p>
          <p>Edit mode</p>
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
