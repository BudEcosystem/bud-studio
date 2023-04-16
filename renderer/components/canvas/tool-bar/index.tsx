import React from 'react';
import styles from './tool-bar.module.css';
import { Square2StackIcon, PhotoIcon } from '@heroicons/react/24/outline'

export default function ToolBar(){

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
      };

    return (
        <div className={styles.toolBarWrap}>
            <div className={styles.tool} onDragStart={(event) => onDragStart(event, 'rectangle')} draggable>
                <Square2StackIcon className='icons'/>
            </div>
            <div className={styles.tool} onDragStart={(event) => onDragStart(event, 'photo')} draggable>
                <PhotoIcon className='icons'/>
            </div>
            <div className={styles.tool} onDragStart={(event) => onDragStart(event, 'text')} draggable>
                <Square2StackIcon className='icons'/>
            </div>
        </div>
    )
}