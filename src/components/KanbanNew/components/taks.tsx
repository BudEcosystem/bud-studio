/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import { styled } from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const TaskContainer = styled.div`
  height: 30px;
  padding: 10px;
  margin-bottom: 10px;
  background: blue;
  color: white;
  width: 214px;
  height: auto;
  background: #2c2b30;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;
const TaskHeader = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const TaskHeading = styled.div`
  text-transform: capitalize;
`;
const TaskProgressBar = styled.div`
  width: 94px;
  height: 4px;
  left: 321px;
  top: 386px;
  margin-top: 13px;
  margin-bottom: 15px;
  background: #0f0f0f;
  border-radius: 21px;
`;
const TaskUserUI = styled.div`
  display: flex;
  flex-direction: row;
`;
const TaskUser = styled.div`
  border-radius: 50%;
  background: grey;
  width: 18px;
  height: 18px;
`;

const TaskDescription = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  letter-spacing: -0.02em;
  color: #bbbbbb;
  margin-top: 13px;
  margin-bottom: 20px;
`;

const TaskFooterSection = styled.div`
  display: flex;
  flex-direction: row;
  > *:not(:first-child) {
    margin-left: 10px;
  }
`;

const TaskFooterTags = styled.div`
  width: 51.71px;
  height: 24px;
  background: #1b1c1e;
  border-radius: 7.03826px;
`;

const TaskFooterDueDetails = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  text-align: right;

  color: #c6c6c6;
`;
function Tasks(props: any) {
  // console.log("Draggable",props)
  return (
    <Draggable draggableId={props.task.id} index={props.task.index}>
      {(provided) => {
        return (
          <TaskContainer
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <TaskHeader>
              {' '}
              <TaskHeading>{props?.task?.content}</TaskHeading>
              <svg
                width="9"
                height="13"
                viewBox="0 0 9 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.94664 6.24253L7.54778 3.24062L8.95797 0.515535C9.01445 0.406121 9.01001 0.275019 8.94594 0.169645C8.88177 0.0643685 8.76743 9.84764e-05 8.64411 9.84764e-05L0.353284 0C0.15811 0 0 0.15811 0 0.353284V11.835C0 12.0302 0.15811 12.1883 0.353284 12.1883C0.548459 12.1883 0.706569 12.0302 0.706569 11.835V6.78306H8.64386C8.64494 6.78316 8.64603 6.78316 8.64672 6.78306C8.84189 6.78306 9 6.62495 9 6.42977C9 6.36097 8.98048 6.297 8.94657 6.24268L8.94664 6.24253ZM0.706532 6.07623V0.706314H8.06343L6.84023 3.07009C6.79005 3.16728 6.78749 3.28232 6.83382 3.38158L8.08955 6.07639L0.706532 6.07623Z"
                  fill="#C6C6C6"
                />
              </svg>
            </TaskHeader>
            <TaskProgressBar />
            <TaskUserUI>
              <TaskUser />
              <TaskUser />
              <TaskUser />
            </TaskUserUI>
            <TaskDescription>
              Make note of any appointments or meetings.
            </TaskDescription>
            <TaskFooterSection>
              <TaskFooterTags />
              <TaskFooterTags />
              <TaskFooterDueDetails />
            </TaskFooterSection>
          </TaskContainer>
        );
      }}
    </Draggable>
  );
}

export default Tasks;
