import React, { useState } from 'react';
import { Folder, RightArrow } from '../MoveToIcons';
import { FolderItem } from '@/components/WorkspaceModal/new-tree-view';

const Directory = ({
  folder,
  selectedFolder,
  setSelectedFolder,
  workspaceColor,
  currentMoveToItem,
}) => {
  // console.log(folder, 'folder', workspaceColor);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    setSelectedFolder(folder);
  };
  return (
    <>
      {currentMoveToItem?.id !== folder?.id && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            cursor: 'pointer',
          }}
          onClick={handleToggle}
        >
          <div style={{ transform: isExpanded ? 'rotate(90deg)' : '' }}>
            <RightArrow />
          </div>
          <div
            style={{
              display: 'flex',
              marginLeft: '16px',
              alignItems: 'center',
            }}
          >
            <div>
              <Folder />
            </div>
            <div
              className="folderText"
              style={{
                color:
                  selectedFolder?.name === folder?.name
                    ? `${workspaceColor}`
                    : '',
              }}
            >
              {folder.name}
            </div>
          </div>
        </div>
      )}
      {isExpanded &&
        folder.folders.map((f, i) => (
          <div style={{ marginLeft: '30px' }}>
            {currentMoveToItem?.id !== f?.id && (
              <Directory
                folder={f}
                selectedFolder={selectedFolder}
                setSelectedFolder={setSelectedFolder}
                workspaceColor={workspaceColor}
                currentMoveToItem={currentMoveToItem}
              />
            )}
          </div>
        ))}
    </>
  );
};

export default Directory;
