/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import { styled } from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { Popover } from 'antd';
import { useDispatch } from 'react-redux';
import { setCurrentSelectedUI } from 'redux/slices/activestate';
import { taskViewDataChange, taskViewTitleChange } from 'redux/slices/list';
import { useState } from 'react';
import TaskViewKanban from 'components/TaskViewKanban/TaskViewKanban';
import GroupByModal from 'components/ListView/ListViewComponents/GroupBy/GroupByModal';
import RightClickMenu from './RightClickMenu';

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
  font-family: 'Noto Sans';
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
  width: 119px;
  &:first-letter {
    text-transform: uppercase;
  }
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
const TaskProgress = styled.div`
  width: 64px;
  height: 4px;
  background: #939aff;
  border-radius: 21px;
`;
const TaskUserUI = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  padding-bottom: 15px;
  margin-bottom: 15px;
  > *:not(:first-child) {
    left: 10px;
  }
`;
const TaskUser = styled.div`
  border-radius: 50%;
  background: grey;
  width: 18px;
  height: 18px;
  position: absolute;
  border: 0.5px solid #fbf3f3;
`;

const TaskDescription = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  letter-spacing: -0.02em;
  color: #bbbbbb;
  // margin-top: 13px;
  margin-bottom: 20px;
`;

const TaskFooterSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  > *:not(:first-child) {
    margin-left: 10px;
  }
`;

const TaskFooterTagsWrapper = styled.div`
  // width: 51.71px;
  height: 24px;
  background: #1b1c1e;
  border-radius: 7.03826px;
  display: flex;
  align-items: center;
  padding: 3.5px 7px 3.5px 7px;
`;

const TaskFooterDueDetails = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  text-align: right;
  color: #c6c6c6;
`;

const TaskBrancDetailsWrapper = styled.div`
  height: 17px;
  display: flex;
  align-items: center;
`;
const TaskBranchImage = styled.div``;
const TaskBranchCount = styled.span`
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 17px;
  /* identical to box height, or 170% */
  letter-spacing: -0.0848362px;
  color: #ffffff;
  margin-left: 3.5px;
`;
const TaskBrancDetailsSeperator = styled.div`
  width: 7.64px;
  height: 0px;
  left: 32.88px;
  border: 0.848362px solid rgba(255, 255, 255, 0.25);
  transform: rotate(90deg);
  margin-left: 7px;
`;
const TaskImageSection = styled.div`
  width: 184px;
  height: 120px;
  background: url(${(props: any) => props.image});
  border-radius: 6px;
  margin-top: 14px;
`;

const TaskType = styled.div`
  width: 59px;
  height: 18px;
  left: 832px;
  top: 480px;
  background: #3d4047;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 7px;
`;
const TaskTypeSpan = styled.span`
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 100%;
  /* identical to box height, or 10px */

  color: #c6c6c6;
`;
const PopOverWrapper = styled.div`
  width: 221.18px;
  height: 249.04px;
  background: #0c0c0c;
  border: 0.87078px solid #1d1d1d;
  backdrop-filter: blur(40.4912px);
  /* Note: backdrop-filter has minimal browser support */
  border-radius: 12px;
  display flex;
  flex-direction:column;
`;
const PopOveSearchWrapper = styled.div`
  width: 192.33px;
  height: 31.93px;
  left: calc(50% - 192.33px / 2 - 297.03px);
  top: 319.8px;
  background: #171718;
  border: 0.87078px solid #1d1d1d;
  border-radius: 10.4494px;
  margin: 0px auto;
  margin-top: 14.8px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const PopOverSearchIcon = styled.img`
  margin-left: 15px;
`;
const PopOverSearchInput = styled.input`
  width: 100px;
  margin-left: 15px;
  background: #171718;
  border: none;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  /* identical to box height, or 12px */
  /* Shortcut */
  color: #7b8388;
  outline: none;
  text-align: left;
  &::placeholder,
  &::-webkit-input-placeholder {
    text-align: left;
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
  }
  &:-ms-input-placeholder {
    text-align: left;
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
  }
`;
const PopOverSearchKeybordCommandWrapper = styled.div`
  width: 20px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 15.59px;
`;
const PopOverSearchKeybordCommand = styled.img``;

function PopOverSearch() {
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
    </PopOverWrapper>
  );
}

function Tasks(props: any) {
  const [showKanbanTaskView, setShowKanbanTaskView] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (event) => {
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

  return (
    <Draggable draggableId={props.task.id} index={props.task.index}>
      {(provided) => {
        return (
          <TaskContainer
            onDoubleClick={() => setShowKanbanTaskView(true)}
            {...provided.draggableProps}
            ref={provided.innerRef}
            onContextMenu={handleContextMenu}
          >
            {
              <TaskViewKanban
                data={props.task}
                showKanbanTaskView={showKanbanTaskView}
                setShowKanbanTaskView={setShowKanbanTaskView}
              />
            }
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
            {props?.task?.progress && (
              <TaskProgressBar>
                <TaskProgress />
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
              <TaskDescription>
                Make note of any appointments or meetings.
              </TaskDescription>
            )}
            {props.task.type && (
              <TaskType>
                <TaskTypeSpan>Recurring</TaskTypeSpan>
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
