import { useEffect } from 'react';
import KanbanSections from './sections';

export default function KanbanMain() {
  // const count = useSelector((state: RootState) => state.counter);
  // useEffect(() => {
  //   console.log(count);
  // }, [count]);

  const draggables = document.querySelectorAll('.draggable');
  const containers = document.querySelectorAll(
    '.kanban-each-section-body-cards'
  );
  // console.log("45",draggables);
  // console.log("45",containers);
  function getDragAfterElement(container: any, y: any) {
    const draggableElements = [
      ...container.querySelectorAll('.draggable:not(.dragging)'),
    ];
    console.log('45', draggableElements);
    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        }
        return closest;
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
  useEffect(() => {
    draggables.forEach((draggable: any) => {
      draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
      });

      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
      });
    });
    containers.forEach((container) => {
      container.addEventListener('dragover', (e: any) => {
        try {
          // e.preventDefault()
          // e.stopImmediatePropagation()
          const afterElement = getDragAfterElement(container, e?.clientY);
          const draggable: any = document.querySelector('.dragging');
          if (afterElement == null) {
            container.appendChild(draggable);
          } else {
            container.insertBefore(draggable, afterElement);
          }
        } catch (err) {
          console.log(err);
        }
      });
    });
  }, [containers, draggables]);
  return (
    <div className="kanban-wrapper">
      <div className="kanabn-header">
        <div className="kanban-header-section-one">
          <div className="kanban-header-section-one-logo">
            <svg
              width="13"
              height="12"
              viewBox="0 0 13 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.599964 0H2.99992C3.3313 0 3.59988 0.331379 3.59988 0.599964V11.3999C3.59988 11.7313 3.3313 11.9999 2.99992 11.9999H0.599964C0.268585 11.9999 0 11.6685 0 11.3999V0.599964C0 0.268585 0.268585 0 0.599964 0Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.19982 0H7.59977C7.93115 0 8.19974 0.331379 8.19974 0.599964V6.59986C8.19974 6.93124 7.93115 7.19982 7.59977 7.19982H5.19982C4.86844 7.19982 4.59985 6.86844 4.59985 6.59986V0.599964C4.59985 0.268585 4.86844 0 5.19982 0Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.79967 0H12.1996C12.531 0 12.7996 0.331379 12.7996 0.599964V9.00002C12.7996 9.3314 12.531 9.59998 12.1996 9.59998H9.79967C9.46829 9.59998 9.19971 9.26861 9.19971 9.00002V0.599964C9.19971 0.268585 9.46829 0 9.79967 0Z"
                fill="white"
              />
            </svg>
            <span>kanban</span>
          </div>
          <div className="kanban-header-section-one-add-plus-wrap">
            <span className="kanban-header-section-one-add-plus">+</span>
          </div>
        </div>
        <div className="kanban-header-section-two">b</div>
      </div>
      <div className="kanban-body-wrap">
        <div className="kanban-body-head">Head</div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <KanbanSections />
          <KanbanSections />
          <KanbanSections />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const headers = req ? req.headers : {};
  return { props: { headers } };
}
