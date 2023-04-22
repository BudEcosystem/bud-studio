import { Layout, Space, Switch } from "antd";
import classes from "./dashboard.module.css";
import Image from "next/image";
const { Header } = Layout;

interface HeaderProps {
  slideFn: any;
  isCollapsed: boolean;
}

function HeaderComp({ isCollapsed, slideFn }: HeaderProps) {
  return (
    <Header className={classes["site-layout-header"]}>
      <SliderArrow slideFn={slideFn} isCollapsed={isCollapsed} />
      <Space split={" "} align="center" className={classes["arrow-box"]}>
        <Image
          className="hover-effect"
          src={"/images/other/arrow-left.png"}
          alt={"#"}
          width={10}
          height={15}
        />
        <Image
          className="hover-effect"
          src={"/images/other/arrow-right.png"}
          alt={"#"}
          width={10}
          height={15}
        />
      </Space>
      <Space align="center">
        <Image
          className="hover-effect"
          src={"/images/other/plus-3.png"}
          alt={"#"}
          width={18}
          height={18}
        />
      </Space>
      <div className={classes["controls-box"]}>
        <div className={classes["controls-box-path"]}>
          <Image
            className="hover-effect"
            src={"/images/other/more-box.png"}
            alt={"#"}
            width={38}
            height={20}
          />
            <Image
            className="hover-effect"
            src={"/images/other/arrow-blue-r.png"}
            alt={"#"}
            width={8}
            height={10}
          />
        </div>
        <div className={classes["controls-switch-box"]}>
          <Switch className={classes["controls-switch"]} />
          {/* <Image
            className={classes["controls-switch-arrow"]}
            src={"/images/other/switch-arrow.png"}
            alt={"#"}
            width={10}
            height={10}
          /> */}
          </div>
        <div className={classes["controls-box-right-box"]}>
        <Image
            className="hover-effect"
            src={"/images/other/favourite-icon.png"}
            alt={"#"}
            width={15}
            height={15}
          />
          <p>Share</p>
          <Image
            className="hover-effect"
            src={"/images/other/more.png"}
            alt={"#"}
            width={30}
            height={20}
          />
        </div>
      </div>
    </Header>
  );
}

function SliderArrow({ slideFn, isCollapsed }: HeaderProps) {
  return (
    <div className={classes["slider-box"]}>
      {isCollapsed ? (
        <Image
          className={classes["slide-arrow-active"]}
          src={"/images/other/slideArrowIcon.png"}
          alt={"#"}
          width={30}
          height={30}
          onClick={slideFn}
        />
      ) : (
        <Image
          className={classes["slide-arrow"]}
          src={"/images/other/slideArrowIcon.png"}
          alt={"#"}
          width={30}
          height={30}
          onClick={slideFn}
        />
      )}
    </div>
  );
}

export default HeaderComp;
