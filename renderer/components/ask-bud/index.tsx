import React from 'react';
import styles from './ask-bud.module.css';
import Launcher from 'components/launcher';

export default function AskBud(){

    const [showLauncher, setShowLauncher] = React.useState(false);

    return (
        <div className={styles.searchWrapper}>
            <div className={styles.launchIcon} onClick={() => setShowLauncher(!showLauncher)}></div>
            <div className={styles.budLogo}></div>
            <input type="text" placeholder='Get started by typing your need'/>
            <div className={styles.voiceIcon}></div>
            {showLauncher && <Launcher></Launcher>}
        </div>
    )
}