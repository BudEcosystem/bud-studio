/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import { styled, css } from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { Avatar, Popover } from 'antd';
import { useDispatch } from 'react-redux';
import { setCurrentSelectedUI } from 'redux/slices/activestate';
import { taskViewDataChange, taskViewTitleChange } from 'redux/slices/list';
// import { styled as materialStyled } from '@mui/material/styles';
// import Badge from '@mui/material/Badge';
// import Avatar from '@mui/material/Avatar';
// import Stack from '@mui/material/Stack';
import { useState } from 'react';
import TaskViewKanban from 'components/TaskViewKanban/TaskViewKanban';
import GroupByModal from 'components/ListView/ListViewComponents/GroupBy/GroupByModal';
import RightClickMenu from './RightClickMenu';
import { Sicon } from '@/components/ListView/ListViewIcons';
import { Tooltip } from 'antd';
import './kanban.css';
import {
  PopOveSearchWrapper,
  PopOverSearchIcon,
  PopOverSearchInput,
  PopOverSearchKeybordCommand,
  PopOverSearchKeybordCommandWrapper,
  PopOverWrapper,
  TaskBrancDetailsSeperator,
  TaskBrancDetailsWrapper,
  TaskBranchCount,
  TaskBranchImage,
  TaskDescription,
  TaskFooterDueDetails,
  TaskFooterSection,
  TaskFooterTagsWrapper,
  TaskHeader,
  TaskHeading,
  TaskImageSection,
  TaskProgress,
  TaskProgressBar,
  TaskType,
  TaskTypeSpan,
  TaskUser,
  TaskUserUI,
} from '../styled-components';

const TaskContainer = styled.div`
  height: 30px;
  padding: 10px;
  margin-bottom: 10px;
  color: white;
  width: 214px;
  height: auto;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease;
  transform: ${({ isDragging, draggingOver }: any) =>
    isDragging || draggingOver ? 'rotate(-3deg)' : 'none'};
  background: ${({ isDragging, draggingOver }: any) =>
    isDragging || draggingOver ? 'grey' : '#2c2b30'};
`;

// const getItemStyle = (isDragging: any) => ({
//   background: isDragging ? 'lightgreen' : 'grey',

//   // change the tilt of the card while dragging
//   transform: isDragging ? 'rotate(-3deg)' : null,
// });

const UserNameDiv = styled.div`
  color: #bbb;
  font-size: 12px;
  font-family: Noto Sans;
  line-height: 100%;
`;

function PopOverSearch() {
  const arr = ['Me', 'Manu M', 'Frijo johnson', 'Aji', 'Shandra'];
  return (
    <PopOverWrapper>
      <PopOveSearchWrapper>
        <PopOverSearchIcon src="/images/other/SearchIconPopOver.svg" alt="#" />
        <PopOverSearchInput placeholder="Search" />
        <PopOverSearchKeybordCommandWrapper>
          <PopOverSearchKeybordCommand
            src="/images/other/KeyboardS.svg"
            alt="#"
          />
        </PopOverSearchKeybordCommandWrapper>
      </PopOveSearchWrapper>
      <div className="userContainer">
        {arr.map((item, i) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <Avatar
              size={25}
              src={
                'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80'
              }
            />
            <p className="userNameText">{item}</p>
          </div>
        ))}
      </div>
    </PopOverWrapper>
  );
}

function Tasks(props: any) {
  const [showKanbanTaskView, setShowKanbanTaskView] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  console.log("PODA", props?.task?.databaseEntries);

  const handleContextMenu = (event: any) => {
    event.preventDefault();
    const { clientX, clientY } = event;
    setMenuPosition({ x: clientX, y: clientY });
    setMenuVisible(true);
  };

  const handleMenuItemClick = () => {
    setMenuVisible(false);
    // Handle menu item click logic
  };

  const handleDocumentClick = () => {
    setMenuVisible(false);
  };

  var checkedNum = 0;
  var progressWidth = 0;



  props.task?.checkList?.forEach((item: any) => {
    if (item.checked == true) {
      checkedNum++;
    }
    progressWidth = (checkedNum / props?.task?.checkList.length) * 100;
  });

  var sub = false;
  var parentId = ""
  var levelOrder = 0;

  if(props?.task?.databaseEntries[0].subChild == false) {
  props?.task?.databaseEntries.map((doc: any) => {
    if(doc.documentID == props?.task?.uuid) {
      sub = doc.subChild
      parentId = doc.parentName
      levelOrder = doc.level
    }
  })
}


  return (
    <Draggable draggableId={props.task.id} index={props.task.index}>
      {(provided, snapshot) => {
        return (
          <TaskContainer
            onDoubleClick={() => setShowKanbanTaskView(true)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onContextMenu={handleContextMenu}
            isDragging={snapshot.isDragging}
            draggingOver={snapshot.draggingOver}
          >
            <TaskViewKanban
              data={props.task}
              showKanbanTaskView={showKanbanTaskView}
              setShowKanbanTaskView={setShowKanbanTaskView}
              statusPanels={props.task.statusPanels}
              databaseEntries={props.task.databaseEntries}
              level={levelOrder}
            />
            {menuVisible && (
              <RightClickMenu
                left={menuPosition.x}
                top={menuPosition.y}
                setMenuVisible={setMenuVisible}
              />
            )}
            <TaskHeader>
              {' '}
              {props?.task?.heading && (
                <TaskHeading {...provided.dragHandleProps}>
                  {props?.task?.content}
                  {sub && (<Tooltip title={`Subtask of ${parentId}`}><span style={{cursor: "help", marginLeft: "10px"}}><Sicon /></span></Tooltip>)} 
                </TaskHeading>
              )} 

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
            {props?.task?.image && (
              <TaskImageSection image="/images/other/sampleImage.svg" />
            )}
            {props?.task?.checkList?.length > 0 && (
              <TaskProgressBar>
                <TaskProgress progress={progressWidth} />
              </TaskProgressBar>
            )}
            {props.task.user && (
              <TaskUserUI>
                <TaskUser />
                <TaskUser />
                <Popover
                  placement="bottom"
                  content={PopOverSearch}
                  trigger="click"
                >
                  <TaskUser style={{ left: '20px' }} />
                </Popover>
              </TaskUserUI>
            )}
            {props.task.description && (
              <TaskDescription>{props.task.description}</TaskDescription>
            )}
            {props.task.type && (
              <TaskType>
                <TaskTypeSpan>{props.task.type}</TaskTypeSpan>
              </TaskType>
            )}
            {props.task.footer && (
              <TaskFooterSection>
                <TaskFooterTagsWrapper>
                  <TaskBrancDetailsWrapper>
                    <TaskBranchImage>
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="2.72627"
                          cy="2.19811"
                          r="1.55356"
                          stroke="#C6C6C6"
                          strokeWidth="0.848362"
                        />
                        <circle
                          cx="8.95088"
                          cy="8.65032"
                          r="1.55356"
                          stroke="#C6C6C6"
                          strokeWidth="0.848362"
                        />
                        <path
                          d="M4.57421 2.44681V2.44681C5.19988 2.44681 5.70707 2.95401 5.70707 3.57967V7.25411C5.70707 8.02513 6.33211 8.65017 7.10313 8.65017V8.65017"
                          stroke="#C6C6C6"
                          strokeWidth="0.848362"
                        />
                      </svg>
                    </TaskBranchImage>
                    <TaskBranchCount>2</TaskBranchCount>
                    <TaskBrancDetailsSeperator />
                    <TaskBranchImage
                      style={{ marginLeft: '5px', marginTop: '-2px' }}
                    >
                      <svg
                        width="7"
                        height="7"
                        viewBox="0 0 7 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.16943 0.5V5.59017"
                          stroke="white"
                          strokeWidth="0.848362"
                          strokeLinecap="round"
                        />
                        <path
                          d="M5.71484 3.0451L0.624672 3.0451"
                          stroke="white"
                          strokeWidth="0.848362"
                          strokeLinecap="round"
                        />
                      </svg>
                    </TaskBranchImage>
                  </TaskBrancDetailsWrapper>
                </TaskFooterTagsWrapper>
                <TaskFooterTagsWrapper>
                  <TaskBrancDetailsWrapper>
                    <TaskBranchImage>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.88107 6.52048C4.98199 6.62147 5.11439 6.67197 5.24679 6.67197L5.24662 6.67193C5.37894 6.67193 5.51151 6.62143 5.61226 6.52052L11.089 1.04396C11.2911 0.841914 11.2911 0.514536 11.089 0.312469C10.8871 0.110647 10.5594 0.110647 10.3576 0.312469L5.24694 5.42335L3.69534 3.87175C3.49343 3.66993 3.16567 3.66993 2.96393 3.87175C2.76186 4.0738 2.76186 4.40118 2.96393 4.60324L4.88107 6.52048ZM1.23213 9.8389H9.6368C9.92238 9.8389 10.1542 9.6073 10.1544 9.32161V5.11917C10.1544 4.83348 9.92278 4.60188 9.63709 4.60188C9.3514 4.60188 9.1198 4.83357 9.1198 5.11917L9.11972 8.80432H1.74942V1.43402H7.02633C7.31202 1.43402 7.54362 1.20242 7.54362 0.916734C7.54362 0.631044 7.31194 0.399444 7.02633 0.399444H1.23213C0.946444 0.399444 0.714844 0.631128 0.714844 0.916734V9.32161C0.714844 9.6073 0.946444 9.8389 1.23213 9.8389Z"
                          fill="#C6C6C6"
                        />
                      </svg>
                    </TaskBranchImage>
                    <TaskBranchCount>2/6</TaskBranchCount>
                  </TaskBrancDetailsWrapper>
                </TaskFooterTagsWrapper>
                <TaskFooterDueDetails>Due Today</TaskFooterDueDetails>
              </TaskFooterSection>
            )}
          </TaskContainer>
        );
      }}
    </Draggable>
  );
}

export default Tasks;
