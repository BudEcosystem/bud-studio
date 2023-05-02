function KanbanCards({ hasSubTask, messagePassed }) {
  return (
    <div
      draggable
      style={{ display: 'flex', flexDirection: 'column' }}
      className="draggable"
    >
      <div className="kanban-each-section-div-body">
        <div className="kanban-each-section-div-body-draggables">
          <div className="kanban-each-section-div-body-draggables-header-part-one">
            <svg
              className="kanban-each-section-div-body-draggables-header-part-one-dragger"
              width="9"
              height="15"
              viewBox="0 0 9 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="1.5"
                cy="13.5"
                r="1.5"
                transform="rotate(-90 1.5 13.5)"
                fill="#242424"
              />
              <circle
                cx="1.5"
                cy="7.5"
                r="1.5"
                transform="rotate(-90 1.5 7.5)"
                fill="#242424"
              />
              <circle
                cx="1.5"
                cy="1.5"
                r="1.5"
                transform="rotate(-90 1.5 1.5)"
                fill="#242424"
              />
              <circle
                cx="7.5"
                cy="13.5"
                r="1.5"
                transform="rotate(-90 7.5 13.5)"
                fill="#242424"
              />
              <circle
                cx="7.5"
                cy="7.5"
                r="1.5"
                transform="rotate(-90 7.5 7.5)"
                fill="#242424"
              />
              <circle
                cx="7.5"
                cy="1.5"
                r="1.5"
                transform="rotate(-90 7.5 1.5)"
                fill="#242424"
              />
            </svg>
            <span className="kanban-each-section-div-body-draggables-header-part-one-header">
              Kabuni project Rabbit
            </span>
          </div>
          <div className="kanban-each-section-div-body-draggables-header-part-two">
            <svg
              className="kanban-each-section-div-body-draggables-header-part-two-side-menu"
              width="3"
              height="15"
              viewBox="0 0 3 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="1.45882"
                cy="1.45882"
                r="1.45882"
                transform="matrix(0 -1 -1 0 2.91766 2.9176)"
                fill="#7B8388"
              />
              <circle
                cx="1.45882"
                cy="1.45882"
                r="1.45882"
                transform="matrix(0 -1 -1 0 2.91766 8.83533)"
                fill="#7B8388"
              />
              <circle
                cx="1.45882"
                cy="1.45882"
                r="1.45882"
                transform="matrix(0 -1 -1 0 2.91766 14.7529)"
                fill="#7B8388"
              />
            </svg>
          </div>
        </div>
        {messagePassed && (
          <div className="card-details">
            All the details are in the file,I'm sure it will turn out cool
          </div>
        )}
        <div className="kanban-each-section-div-body-details">
          <div className="kanban-each-section-div-body-details-sub-task-section">
            <div style={{ display: 'flex' }}>
              <div className="kanban-each-section-div-body-details-sub-task-section-count-section">
                <svg
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="2.33125"
                    cy="2.33125"
                    r="1.83125"
                    stroke="#7B8388"
                  />
                  <circle
                    cx="9.66859"
                    cy="9.93671"
                    r="1.83125"
                    stroke="#7B8388"
                  />
                  <path
                    d="M4.50958 2.62439V2.62439C5.24707 2.62439 5.84493 3.22225 5.84493 3.95974V8.29096C5.84493 9.19979 6.58168 9.93655 7.49052 9.93655V9.93655"
                    stroke="#7B8388"
                  />
                </svg>
                {hasSubTask ? (
                  <span className="kanban-each-section-div-body-details-sub-task-section-count-section-added-sub-task">
                    1
                  </span>
                ) : (
                  <span className="kanban-each-section-div-body-details-sub-task-section-count-section-add-sub-task">
                    +
                  </span>
                )}
              </div>
              <div className="sub-task-details">
                <svg
                  className="tick-box"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.16658 7.67414C5.01563 7.67414 4.86468 7.61657 4.74963 7.50143L2.56392 5.31563C2.33355 5.08525 2.33355 4.71202 2.56392 4.48166C2.79392 4.25157 3.16761 4.25157 3.39779 4.48166L5.16674 6.25061L10.9933 0.423791C11.2233 0.193697 11.597 0.193697 11.8272 0.423791C12.0576 0.654164 12.0576 1.0274 11.8272 1.25776L5.58324 7.50148C5.46838 7.61652 5.31724 7.67409 5.16639 7.67409L5.16658 7.67414Z"
                    fill="#7B8388"
                  />
                  <path
                    d="M10.1718 11.2843H0.589753C0.264044 11.2843 0 11.0203 0 10.6946V1.11234C0 0.786722 0.264044 0.522583 0.589753 0.522583H7.19561C7.52123 0.522583 7.78536 0.786627 7.78536 1.11234C7.78536 1.43805 7.52132 1.70209 7.19561 1.70209H1.17951V10.1048H9.58224L9.58234 5.90346C9.58234 5.57784 9.84638 5.3137 10.1721 5.3137C10.4978 5.3137 10.7618 5.57775 10.7618 5.90346V10.6946C10.7617 11.0203 10.4973 11.2843 10.1718 11.2843Z"
                    fill="#7B8388"
                  />
                </svg>
                <span> 2/06</span>
              </div>
            </div>

            {hasSubTask ? (
              <div>
                <span className="day-details">Tomorrow</span>
              </div>
            ) : (
              <div className="kanban-each-section-div-body-details-sub-task-section-date-section">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.53485 4.51336e-05H2.79068L3.62776 0H5.58132H6.41854H8.37209H9.20932H10.4651C10.8721 0.000376545 11.2623 0.170216 11.55 0.471939C11.8378 0.773763 11.9996 1.18288 12 1.60977V6.97841C12.0011 7.40567 11.8392 7.8156 11.5504 8.11684L8.29739 11.5284C8.16946 11.6606 8.02034 11.7682 7.85691 11.8461C7.85294 11.8482 7.84922 11.8505 7.84549 11.8528C7.84029 11.856 7.83509 11.8593 7.82926 11.8617C7.635 11.9524 7.42484 11.9995 7.21217 12H1.53485C1.12791 11.9996 0.737689 11.8299 0.449996 11.5281C0.162211 11.2263 0.00037376 10.8171 0 10.3903V1.60981C0.00035881 1.18295 0.162206 0.773807 0.449996 0.471984C0.737713 0.170266 1.12791 0.00043712 1.53485 4.51336e-05ZM8.09317 10.5012L10.9586 7.49603L10.9587 7.49615C11.09 7.35925 11.1637 7.17285 11.1631 6.97852L11.1632 6.97862V3.8051H0.837364V10.3905C0.837551 10.5844 0.911107 10.7704 1.0419 10.9076C1.1727 11.0448 1.35006 11.1219 1.53498 11.1221H7.21231C7.2203 11.1221 7.2279 11.1198 7.23551 11.1175C7.24222 11.1155 7.24894 11.1135 7.25595 11.113V8.04885C7.25623 7.77731 7.3593 7.51693 7.54235 7.32486C7.72549 7.13288 7.97376 7.02479 8.23268 7.02449H9.90712C10.0567 7.02449 10.1949 7.10818 10.2697 7.24401C10.3444 7.37983 10.3444 7.54721 10.2697 7.68303C10.1949 7.81886 10.0567 7.90254 9.90712 7.90254H8.23268C8.15606 7.90352 8.0941 7.9685 8.09317 8.04885V10.5012ZM6.41872 0.878045H5.5815H3.62803H2.79081H1.53498C1.35007 0.87824 1.17272 0.955358 1.0419 1.09256C0.911083 1.22976 0.837546 1.41575 0.837359 1.60978V2.92686H11.163V1.60978C11.1628 1.41576 11.0892 1.22976 10.9584 1.09256C10.8276 0.955363 10.6503 0.878241 10.4653 0.878045H9.2095H9.20932H8.37228H6.41872ZM2.73648 8.86824C2.73648 8.79547 2.79547 8.73647 2.86824 8.73647C2.94101 8.73647 3 8.79547 3 8.86824C3 8.94101 2.94101 9 2.86824 9C2.79547 9 2.73648 8.94101 2.73648 8.86824ZM3.73648 8.86824C3.73648 9.34775 3.34775 9.73647 2.86824 9.73647C2.38872 9.73647 2 9.34775 2 8.86824C2 8.38872 2.38872 8 2.86824 8C3.34775 8 3.73648 8.38872 3.73648 8.86824Z"
                    fill="#7B8388"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
      {!hasSubTask && (
        <div className="add-new-subtask">
          <span className="add-new-text">New Sub Task</span>
        </div>
      )}
    </div>
  );
}
export default KanbanCards;
