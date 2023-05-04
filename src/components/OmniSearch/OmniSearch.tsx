import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import SearchBar from './SearchBar/SearchBar';
import Panel from './Panel/Panel';

function OmniSearch() {
  const [themeColor, setThemeColor] = useState('aqua');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleKeyDown = (event: any) => {
    if (event.ctrlKey && event.key === 'o') {
      setIsModalOpen(!isModalOpen);
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      className="Modal"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      style={{
        top: 150,
        left: 100
      }}
    >
      <div className="OmniSearch">
        <SearchBar themeColor={themeColor} />
        <Panel />
      </div>
    </Modal>
  );
}

export default OmniSearch;
