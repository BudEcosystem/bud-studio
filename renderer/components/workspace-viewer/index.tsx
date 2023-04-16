
import React, { useEffect, useRef } from 'react'
import styles from './workspace-viewer.module.css';
import {MagnifyingGlassIcon, FolderIcon, EllipsisHorizontalIcon, DocumentIcon} from '@heroicons/react/24/outline'

export default function WorkspaceViewer(){

    const initialList = [
        {name: 'People Ops', files: [{ name: 'Document A'}, {name: 'Document B'}]},
        {name: 'HR', files: [{ name: 'Document A'}, {name: 'Document B'}]},
        {name: 'Dev', files: []}
    ]
    
    const addFolderInput = useRef(null);

    const [showAddFolder, setShowAddFolder] = React.useState(false);
    const [folders, setFolders] = React.useState(initialList as any);

    useEffect(() => {
        if(showAddFolder) addFolderInput.current.focus()
    }, [showAddFolder])
    
    const addFolder = (event) => {
        if (event.key != 'Enter') return;
        let space = {
            name: event.target.value
        }
        folders.push(space);
        setFolders(folders);
        setShowAddFolder(!showAddFolder);
    }


    return (
        <div className={styles.viewerWrap}>
            <div className={styles.viewerTop}>
                <div className={styles.spaceTitle}>
                    <div className={styles.colorTag}></div>
                    <p>Accubits</p>
                    <div className={styles.addIcon} onClick={() => setShowAddFolder(true)}>+</div>
                </div>
                <div className={styles.moveOption}></div>
            </div>
            <div className={styles.searchWrap}>
                <MagnifyingGlassIcon className={styles.icons} />
                <input type="text" placeholder='Search' />
            </div>
            <div className={styles.listWrap}>
                {showAddFolder && <div className={`${styles.folder}`}>
                    <div className={styles.folderTitle}>
                        <div className={styles.openIcon}></div>
                        <div className={styles.folderIcon}>
                            <FolderIcon className='icons' />
                        </div>
                        <input type="text" placeholder='Folder name' ref={addFolderInput} onKeyUp={(event) => addFolder(event)}/>
                    </div>
                </div>}
                {folders.map((item: any, index: number) => (
                    <div className={`${styles.folder} ${styles.open}`}>
                        <div className={styles.folderTitle}>
                            <div className={styles.openIcon}></div>
                            <div className={styles.folderIcon}>
                                <FolderIcon className='icons' />
                            </div>
                            <p>{item.name}</p>
                            <div className={styles.addIcon}>+</div>
                            <div className={styles.actionIcon}>
                                <EllipsisHorizontalIcon className='icons' />
                            </div>
                        </div>
                        {item.files && <div className={styles.folderList}>
                            {item.files.map((file: any, index: number) => (
                                <div className={styles.fileItem}>
                                    <DocumentIcon className='icons' />
                                    <p>{file.name}</p>
                                </div>
                            ))}
                        </div>}
                        
                    </div>
                ))}
                
                
            </div>
        </div>
    )
}