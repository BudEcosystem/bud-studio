import React from 'react';
import { Folder, RightArrow } from '../MoveToIcons';

const Directory = ({ folder }) => {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}
    >
      <div>
        <RightArrow />
      </div>
      <div
        style={{ display: 'flex', marginLeft: '16px', alignItems: 'center' }}
      >
        <div>
          <Folder />
        </div>
        <div className="folderText">{folder.name}</div>
      </div>
    </div>
  );
};

export default Directory;
