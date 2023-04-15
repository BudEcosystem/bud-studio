import React = require("react");
import styles from './side-menu-layout.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChevronDoubleLeftIcon, MagnifyingGlassIcon, StarIcon, BellIcon } from '@heroicons/react/24/outline'
import TopBar from "components/top-bar";
import Link from "next/link";


export default function SideMenuLayout({children}) {
    return (
        <div className={styles.layoutWrapper}>
            <div className={styles.sidePanelWrapper}>
                <div className={styles.topWrap}>
                    <div className={styles.logo} style={{backgroundImage: 'url(images/logo.png)'}}></div>
                    <ChevronDoubleLeftIcon className="icons" />
                </div>
                <div className={styles.menuWrap}>
                    <div className={styles.menuItem}>
                        <MagnifyingGlassIcon className={styles.icons} />
                        <p>Search</p>
                        <div className={styles.menuInfo}>⌘ F</div>
                    </div>
                    <div className={styles.menuItem}>
                        <StarIcon className={styles.icons} />
                        <p>Favourites</p>
                        <div className={styles.menuInfo}>⌘ U</div>
                    </div>
                    <Link className={styles.menuItem} href="/canvas">
                        <BellIcon className={styles.icons} />
                        <p>Notification</p>
                        <div className={styles.menuInfo}>⌘ N</div>
                    </Link>
                    <div className={`${styles.menuItem} ${styles.active}`}>
                        <MagnifyingGlassIcon className={styles.icons} />
                        <p>My Spaces</p>
                        <div className={styles.menuInfo}>⌘ S</div>
                    </div>
                </div>
            </div>
            <div className={styles.contentWrapper}>
                <TopBar></TopBar>
                {children}
            </div>
        </div>
    )
}