import React = require("react");
import styles from './side-menu-layout.module.css';
import { ChevronDoubleLeftIcon, MagnifyingGlassIcon, StarIcon, BellIcon, QueueListIcon } from '@heroicons/react/24/outline'
import TopBar from "components/top-bar";
import Link from "next/link";
import { createNewFile } from "actions/pages";
import { ipcRenderer } from "electron";
import { useRouter } from "next/router";


export default function SideMenuLayout({children, showTopBar }) {
    const { push } = useRouter();
    const newPage = async () => {
        const pathDoc = await ipcRenderer.invoke("app-get-path", "documents");
        console.log("Path", pathDoc);
        const file = await createNewFile(pathDoc);
        console.log("File", file);

        //redirect to new page in nextjs
        push(`/projects/view?page=${file.fileName.split('.')[0]}&filePath=${file.filePath}`);

    }

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
                    <Link className={`${styles.menuItem} ${styles.active}`} href='/home'>
                        <QueueListIcon className={styles.icons} />
                        <p>My Spaces</p>
                        <div className={styles.menuInfo}>⌘ S</div>
                    </Link>

                    {/* <Link className={`${styles.menuItem}`} href="/projects/new/new?mode=new">
                        <QueueListIcon className={styles.icons} />
                        <p>+ New</p>
                        <div className={styles.menuInfo}>⌘ D</div>
                    </Link> */}


                    {/* <Link href={{ pathname: '/projects/test/'+Math.random().toString(), query: { mode: 'new' } }}>path</Link> */}

                    <div className={styles.menuItem} onClick={newPage}>
                        New
                    </div>



                    
                    
                </div>
            </div>
            <div className={styles.contentWrapper} >
                {showTopBar && <TopBar></TopBar> }
                {children}
            </div>
        </div>
    )
}