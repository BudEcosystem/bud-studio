import React from 'react';
import {  ChevronRightIcon, EllipsisHorizontalIcon, FolderIcon, DocumentIcon } from '@heroicons/react/24/outline';
import styles from './breadcrumbs.module.css';

export default function Breadcrumbs(){
    return (
        <div className={styles.breadcrumbWrap}>
            <div><EllipsisHorizontalIcon className="icons" /></div>
            <ChevronRightIcon className="icons" />
            <div>
                <FolderIcon className="icons" /> 
                <span>Folder Icon</span>
            </div>
            <ChevronRightIcon className="icons" />
            <div>
                <DocumentIcon className="icons" /> 
                <span>DocumentName</span>
            </div>
        </div>
    )
}