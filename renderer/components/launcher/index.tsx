import React from 'react';
import styles from './launcher.module.css'
import { ArrowRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'


export default function Launcher(){
    const [showDetail, setShowDetail] = React.useState(false);

    const getSkillDetails = () => {
        setShowDetail(true);
    }
    return(
        <div className={styles.launchWrap}>
            {!showDetail && <div className={styles.launchHome}>
                <div className={styles.launchTitle}>Skills</div>
                <div className={styles.skillWrap}>
                    <div className={styles.skill} onClick={() => getSkillDetails()}>
                        <div className={styles.skillIcon}></div>
                        <div className={styles.skillContent}>
                            <h3>Proposal creation</h3>
                            <p>key document that describes what falls under.</p>
                        </div>
                    </div>
                    <div className={styles.skill} onClick={() => getSkillDetails()}>
                        <div className={styles.skillIcon}></div>
                        <div className={styles.skillContent}>
                            <h3>Proposal creation</h3>
                            <p>key document that describes what falls under.</p>
                        </div>
                    </div>
                    <div className={styles.skill} onClick={() => getSkillDetails()}>
                        <div className={styles.skillIcon}></div>
                        <div className={styles.skillContent}>
                            <h3>Proposal creation</h3>
                            <p>key document that describes what falls under.</p>
                        </div>
                    </div>
                </div>
            </div>}
            {showDetail && <div className={styles.skillDetail}>
                <div className={styles.backBtn} onClick={() => setShowDetail(false)}>
                    <ChevronLeftIcon className="icons" />
                </div>
                <div className={styles.detailTitle}>Skills / <span>Scope of work</span></div>
                <p>Key document that describes what falls under the framework of a project</p>
                <div className={styles.skillInputWrap}>
                    <div className={styles.skillInput}>
                        <label>Project Name</label>   
                        <input type="text" placeholder='Enter project name'/>
                    </div>
                    <div className={styles.skillInput}>
                        <label>Project Name</label>   
                        <input type="text" />
                    </div>
                    <div className={styles.skillInput}>
                        <label>Project Name</label>   
                        <input type="text" />
                    </div>
                    <div className={styles.skillInput}>
                        <label>Project Name</label>   
                        <input type="text" />
                    </div>
                </div>
                <div className={styles.btn}>
                    <p>Create</p>
                    <ArrowRightIcon className="icons" />
                </div>
            </div>}
        </div>
    )
}