import React from 'react';
import { Folder, RightArrow } from '../MoveToIcons';

const Directory = ({ folder, selectedFolder, setSelectedFolder }) => {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}
      onClick={() => setSelectedFolder(folder)}
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
        <div
          className="folderText"
          style={{ color: selectedFolder?.name === folder?.name ? 'red' : '' }}
        >
          {folder.name}
        </div>
      </div>
    </div>
  );
};

export default Directory;
