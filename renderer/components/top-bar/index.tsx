import Breadcrumbs from "components/breadcrumbs";
import React from 'react'
import styles from './topbar.module.css';
import {  StarIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';


export default function TopBar(){
    return(
        <div className={styles.topBarWrap}>
            <Breadcrumbs></Breadcrumbs>
            <div className={styles.optionsWrap}>
                <div className={styles.favicon}>
                    <StarIcon className="icons" />
                </div>
                <div className={styles.share}>Share</div>
                <div className={styles.moreOption}>
                    <EllipsisHorizontalIcon className="icons" />
                </div>
            </div>
        </div>
    )
}