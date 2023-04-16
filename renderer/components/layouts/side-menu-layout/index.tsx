import React = require("react");
import styles from './side-menu-layout.module.css';
import { ChevronDoubleLeftIcon, MagnifyingGlassIcon, StarIcon, BellIcon, QueueListIcon } from '@heroicons/react/24/outline'
import TopBar from "components/top-bar";
import Link from "next/link";


export default function SideMenuLayout({children, showTopBar }) {

    const [collapsed, setCollapsed] = React.useState(false);

    
    return (
        <div className={collapsed ? `${styles.layoutWrapper} ${styles.collapsed}` : `${styles.layoutWrapper}`}>
            <div className={styles.sidePanelWrapper}>
                <div className={styles.topWrap}>
                    <div className={styles.logo} style={{backgroundImage: 'url(images/logo.png)'}}></div>
                    <div className={styles.collapseWrap} onClick={() => setCollapsed(!collapsed)}>
                        <ChevronDoubleLeftIcon className="icons" />
                    </div>
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
                    <Link className={`${styles.menuItem} ${styles.active}`} href='/home'>
                        <QueueListIcon className={styles.icons} />
                        <p>My Spaces</p>
                        <div className={styles.menuInfo}>⌘ S</div>
                    </Link>
                </div>
            </div>
            <div className={styles.contentWrapper}>
                {showTopBar && <TopBar></TopBar> }
                {children}
            </div>
        </div>
    )
}