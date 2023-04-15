

import React, { useCallback, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import styles from './rectangle.module.css'


export default function RectangleNode({ data }) {


  const onChange = useCallback((evt) => {
    console.log(evt.target.value);

  }, []);

  return (
    <div className={styles.nodeWrap}>
      <Handle type="target" position={Position.Left} />
      <Handle type="target" position={Position.Top} />
      <input id="text" name="text" value={data.label} onChange={onChange} className={styles.nodeText} />
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Right} id="b"/>
    </div>
  );
}