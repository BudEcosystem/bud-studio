import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux/store';
import KanbanCards from './cards';

export default function KanbanSections({ title }: any) {
  const count = useSelector((state: RootState) => state.counter);
  useEffect(() => {
    console.log(count);
  }, [count]);
  return (
    <div draggable className="kanban-main">
      <div className="kanban-each-section-div">
        <div className="kanban-each-section-div-header">
          <div className="kanban-each-section-details">
            <span>New request {title}</span>
          </div>
          {/* <KanbanCards hasSubTask={false} messagePassed={false} />
          <KanbanCards hasSubTask messagePassed={false} />
          <KanbanCards hasSubTask messagePassed={false} />
          <KanbanCards hasSubTask messagePassed={true} /> */}
        </div>{' '}
        <div className="kanban-each-section-body-cards">
          <KanbanCards hasSubTask={false} messagePassed={false} />
          <KanbanCards hasSubTask messagePassed={false} />
          <KanbanCards hasSubTask messagePassed={false} />
          <KanbanCards hasSubTask messagePassed />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const headers = req ? req.headers : {};
  return { props: { headers } };
}
