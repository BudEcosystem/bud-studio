import React, { useEffect, useState } from "react";
import OmniSearch from "../components/OmniSearch/OmniSearch";
import { Button, Modal } from 'antd';

export default function App() {
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
    <>
      <div>Menu 1</div>
      <Modal className="Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <OmniSearch />
       </Modal>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const headers = req ? req.headers : {};
  return { props: { headers } };
}
