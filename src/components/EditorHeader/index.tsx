import React, { useState } from 'react';
import {
  AddCover,
  AddIcon,
  TextIcon,
  ListIcon,
  Plus,
  TableIcon,
  CheckListIcon,
  HeadingIcon,
  ParagraphIcon,
  FileIcon,
  BackButton,
} from './EditorIcons';
import './Editor.css';

const EditorHeader = ({ coverImg, iconImg }: any) => {
  const [coverUrl, setCoverUrl] = useState(coverImg);
  const [coverUrlAvailable, setCoverUrlAvailable] = useState(true);
  const [iconUrl, setIconUrl] = useState(iconImg);
  const [iconAvailable, setIconAvailable] = useState(true);

  return (
    <div className="editor">
      {coverUrlAvailable ? (
        <div
          style={{
            backgroundImage: `url(${coverUrl})`,
          }}
          className="editorCover"
        >
          <div
            style={{
              position: 'relative',
              left: '81%',
              marginTop: '15px',
              display: 'flex',
              width: '150px',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div
              onClick={(e) => setCoverUrlAvailable(false)}
              style={{
                paddingLeft: '10px',
                paddingRight: '10px',
                cursor: 'pointer',
                width: 'fit-content',
                height: '22px',
                background: 'rgba(40, 39, 44, 0.28)',
                borderRadius: '11px',
                display: 'grid',
                placeItems: 'center',
                fontSize: '10px',
                fontWeight: '400',
              }}
            >
              Remove
            </div>
            <div
              style={{
                paddingLeft: '10px',
                paddingRight: '10px',
                cursor: 'pointer',
                width: 'fit-content',
                height: '22px',
                background: 'rgba(40, 39, 44, 0.28)',
                borderRadius: '11px',
                display: 'grid',
                placeItems: 'center',
                fontSize: '10px',
                fontWeight: '400',
              }}
            >
              Change Cover
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={(e) => setCoverUrlAvailable(true)}
          style={{
            position: 'absolute',
            display: 'flex',
            left: '90%',
            width: 'fit-content',
            height: 'fit-content',
            color: '#333539',
            cursor: 'pointer',
          }}
        >
          <div style={{ marginRight: '10px' }}>
            <AddCover />
          </div>
          Add Cover
        </div>
      )}

      {iconAvailable ? (
        coverUrlAvailable ? (
          <div
            style={{
              position: 'relative',
              bottom: '30px',
              display: 'flex',
              width: '889px',
              alignItems: 'end',
            }}
          >
            <div className="editorIcon">
              <img src={iconUrl} />
            </div>
            {/* <div
              style={{
                fontSize: '23px',
                fontWeight: '400',
                height: 'fit-content',
              }}
            >
              File Name
            </div> */}
          </div>
        ) : (
          <div
            style={{
              position: 'relative',
              bottom: '0px',
              display: 'flex',
              width: '700px',
              alignItems: 'center',
              marginRight: '125px',
              marginBottom: '40px',
            }}
          >
            <div className="editorIcon">
              <img src={iconUrl} />
            </div>
            <div
              style={{
                fontSize: '25px',
                fontWeight: '400',
                height: 'fit-content',
              }}
            >
              File Name
            </div>
          </div>
        )
      ) : (
        <div
          style={{
            fontSize: '14px',
            fontWeight: '500',
            marginRight: '810px',
            marginTop: '60px',
            display: 'flex',
            width: 'fit-content',
            color: '#333539',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          <div
            onClick={(e) => setIconAvailable(true)}
            style={{ marginRight: '10px' }}
          >
            <AddIcon />
          </div>
          Add Icon
        </div>
      )}
    </div>
  );
};

export default EditorHeader;
