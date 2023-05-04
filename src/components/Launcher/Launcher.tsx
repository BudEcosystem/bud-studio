import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { Rocket, BudIcon, Voice, CommandF } from './LauncherIcons';

function Launcher() {
  const [showLauncher, setShowLauncher] = useState(false);

  const handleKeyDown = (event: any) => {
    if (event.ctrlKey && event.key === 'l') {
      setShowLauncher(!showLauncher);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.getElementById('inputTag').focus();
    };
  }, [showLauncher]);

  const showModal = () => {
    setShowLauncher(true);
  };

  const handleOk = () => {
    setShowLauncher(false);
  };

  const handleCancel = () => {
    setShowLauncher(false);
  };

  return (
    <Modal
      style={{ top: "88%" }}
      className="Modal"
      open={showLauncher}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className="Launcher">
        <div className="RocketLaunchDiv">
          <div className="RocketOuter">
            <div className="RocketInner">
              <Rocket />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '10px',
            }}
          >
            <BudIcon />
          </div>
        </div>

        <input
          id="inputTag"
          className="LauncherInput"
          type="text"
          placeholder={`Get started by typing your need `}
        />
        <div
          style={{ display: 'grid', placeItems: 'center', marginLeft: '-95px' }}
        >
          <CommandF />
        </div>

        <div className="VoiceDiv">
          <Voice />
        </div>
      </div>
    </Modal>
  );
}

export default Launcher;
