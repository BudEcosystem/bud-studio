import React, { useState } from "react";
import OmniSearch from "../components/OmniSearch/OmniSearch";
import { Button, Modal } from 'antd';

export default function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);

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

      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      
      <Modal className="Modal" title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <OmniSearch />
      </Modal>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const headers = req ? req.headers : {};
  return { props: { headers } };
}
