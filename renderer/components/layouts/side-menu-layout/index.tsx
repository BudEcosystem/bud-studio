import React, { useEffect } from 'react'
import styles from './side-menu-layout.module.css';
import { ChevronDoubleLeftIcon, MagnifyingGlassIcon, StarIcon, BellIcon, QueueListIcon } from '@heroicons/react/24/outline'
import TopBar from "components/top-bar";
import Link from "next/link";
import { createNewFile } from "actions/pages";
import { ipcRenderer } from "electron";
import { useRouter } from "next/router";
import { useRef } from 'react';
import WorkspaceViewer from 'components/workspace-viewer';
import AskBud from 'components/ask-bud';


export default function SideMenuLayout({children, showTopBar }) {

    const initialList = [
        {name: 'Accubits'},
        {name: 'DevBud'},
        {name: 'Accubits'},
    ]

    const addWorkspaceInput = useRef(null);

    const [collapsed, setCollapsed] = React.useState(false);
    const [showAddWorkspace, setShowAddWorkspace] = React.useState(false);
    const [workspaces, setWorkspaces] = React.useState(initialList as any);
    const [showWorkspaceViewer, setShowWokspaceViewer] = React.useState(false);

    
    const { push } = useRouter();
    const newPage = async () => {
        const pathDoc = await ipcRenderer.invoke("app-get-path", "documents");
        console.log("Path", pathDoc);
        const file = await createNewFile(pathDoc);
        console.log("File", file);

        //redirect to new page in nextjs
        push(`/projects/view?page=${file.fileName.split('.')[0]}&filePath=${file.filePath}`);

    }

    useEffect(() => {
        if(showAddWorkspace) addWorkspaceInput.current.focus()
    }, [showAddWorkspace])
    
    const addWorkspace = (event) => {
        if (event.key != 'Enter') return;
        let space = {
            name: event.target.value
        }
        workspaces.push(space);
        setWorkspaces(workspaces);
        setShowAddWorkspace(!showAddWorkspace);
    }

    return (
        <div className={collapsed ? `${styles.layoutWrapper} ${styles.collapsed}` : `${styles.layoutWrapper}`}>
            <div className={styles.sidePanelWrapper}>
                <div className={styles.topWrap}>
                    <div className={styles.logo} style={{backgroundImage: 'url(/images/logo.png)'}}></div>
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
                <div className={styles.workspacesWrap}>
                    
                    <div className={styles.workspaceTitle}>
                        <p>Work Spaces</p>
                        <div className={styles.addIcon} onClick={() => setShowAddWorkspace(!showAddWorkspace)}>+</div>
                    </div>
                    <div className={styles.workspaceListWrap}>
                        {workspaces.map((item: any, index: number) => (
                            <div className={styles.workspaceItem} key={index} onClick={() => setShowWokspaceViewer(!showWorkspaceViewer)}>
                                <div className={styles.colorTag}></div>
                                <p>{item.name}</p>
                            </div>
                        ))}
                        {showAddWorkspace && <div className={styles.workspaceItem}>
                            <div className={styles.colorTag}></div>
                            <input type="text" placeholder='Space name' ref={addWorkspaceInput} onKeyUp={(event) => addWorkspace(event)}/>
                        </div>}
                    </div>
                    {showWorkspaceViewer && <WorkspaceViewer></WorkspaceViewer>}
                </div>
            </div>
            <div className={styles.contentWrapper} >
                {showTopBar && <TopBar></TopBar> }
                <div className={styles.container}>{children}</div>
                <AskBud></AskBud>
            </div>
        </div>
    )
}