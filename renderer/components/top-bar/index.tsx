import Breadcrumbs from "components/breadcrumbs";
import React = require("react");
import styles from './topbar.module.css';

export default function TopBar(){
    return(
        <div className={styles.topBarWrap}>
            <Breadcrumbs></Breadcrumbs>
        </div>
    )
}