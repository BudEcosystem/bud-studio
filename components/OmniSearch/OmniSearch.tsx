import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar/SearchBar';
import Panel from './Panel/Panel'
import { Modal } from 'antd';

const OmniSearch = () => {
  const [themeColor, setThemeColor] = useState("aqua");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'm') {
      setIsModalOpen((!isModalOpen));
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
    <Modal className="Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <div className='OmniSearch'>
        <SearchBar themeColor={themeColor} />
        <Panel />
      </div>
    </Modal>
  )
};

export default OmniSearch