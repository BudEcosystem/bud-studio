import React, { useState } from 'react';
import './TaskView.css';
import { useSelector } from 'react-redux';
import CircularImageComponent from 'components/ListView/ListViewComponents/CircularImageComponent';
import {
  ArrowIcon,
  DocIcon,
  FlagIcon,
  FourLines,
  ThreeDots,
  UploadIcon,
  WindowIcon,
} from './TaskViewIcons';
import ToDoPanel from './components/ToDoPanel';

function TaskView() {
  const { workspace, list }: any = useSelector((state) => state);
  const { color } = workspace;
  const { taskViewData } = list;
  const [isDragOver, setIsDragOver] = useState(false);
  const imagesArray: Array<any> = ['', '', ''];

  const handleDragOver = (event: any) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: any) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    setIsDragOver(false);

    const { files } = event.dataTransfer;
    handleFiles(files);
  };

  const handleFiles = (files: any) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Perform file upload or any other desired operation
    }
  };

  const comments = [
    {
      text: 'George created this task',
      time: 'May 9, 11:20am',
    },
    {
      text: 'George added a task',
      time: 'May 9, 11:22am',
    },
    {
      text: 'George added a task',
      time: 'May 9, 11:24am',
    },
    {
      text: 'George moved this task to important',
      time: 'May 9, 11:28am',
    },
    {
      text: 'George created a subtask',
      time: 'May 9, 12:20am',
    },
    {
      text: 'George removed a task',
      time: 'May 9, 12:30am',
    },
    {
      text: 'George marked a task as checked',
      time: 'May 9, 12:40am',
    },
    {
      text: 'George added a task',
      time: 'May 9, 12:55am',
    },
    {
      text: 'George created this task',
      time: 'May 9, 11:20am',
    },
    {
      text: 'George added a task',
      time: 'May 9, 11:22am',
    },
    {
      text: 'George added a task',
      time: 'May 9, 11:24am',
    },
    {
      text: 'George moved this task to important',
      time: 'May 9, 11:28am',
    },
    {
      text: 'George created a subtask',
      time: 'May 9, 12:20am',
    },
    {
      text: 'George removed a task',
      time: 'May 9, 12:30am',
    },
    {
      text: 'George marked a task as checked',
      time: 'May 9, 12:40am',
    },
    {
      text: 'George added a task',
      time: 'May 9, 12:55am',
    },
    {
      text: 'George created this task',
      time: 'May 9, 11:20am',
    },
    {
      text: 'George added a task',
      time: 'May 9, 11:22am',
    },
    {
      text: 'George added a task',
      time: 'May 9, 11:24am',
    },
    {
      text: 'George moved this task to important',
      time: 'May 9, 11:28am',
    },
    {
      text: 'George created a subtask',
      time: 'May 9, 12:20am',
    },
    {
      text: 'George removed a task',
      time: 'May 9, 12:30am',
    },
    {
      text: 'George marked a task as checked',
      time: 'May 9, 12:40am',
    },
    {
      text: 'George added a task',
      time: 'May 9, 12:55am',
    },
  ];

  return (
    <div className="KanbanTaskView">
      <div className="KanbanTaskView__TopBar">
        <div className="TopBar__LeftSide">
          <div className="LogoAndProgress">
            <div className="kabuniLogo" style={{ background: `${color}` }}>
              <span className="tick">L</span>
              <span className="tick">L</span>
              <span className="tick">L</span>
            </div>
            <h2 className="TopBar__Title">Kabuni</h2>
            <div className="TopBar__ProgressText">In Progress</div>
          </div>
          <div
            style={{
              display: 'grid',
              placeItems: 'center',
              marginLeft: '40px',
            }}
            className="TopBar__AvatarImages"
          >
            <CircularImageComponent images={taskViewData.imagesData} />
          </div>
          <div
            style={{
              cursor: 'pointer',
              display: 'grid',
              placeItems: 'center',
              marginLeft: '20px',
            }}
          >
            <FlagIcon />
          </div>
          <div
            style={{
              cursor: 'pointer',
              display: 'grid',
              marginTop: '7px',
              marginLeft: '20px',
            }}
          >
            <DocIcon />
          </div>
          <div className="progressBar">
            <div
              style={{
                backgroundColor: `${color}`,
                width: `${
                  (taskViewData.checklist?.checked /
                    taskViewData.checklist?.total) *
                  100
                }%`,
              }}
              className="progress"
            />
          </div>
        </div>

        <div className="TopBar__RightSide">
          <div className="TopBarRight__Date">
            <div style={{ color: '#8A8B8B' }}>Created</div>
            <div>May 9, 11:20am</div>
          </div>
          <div className="Bar" />
          <div className="Share">Share</div>
          <div className="Bar" />
          <div style={{ marginLeft: '10px' }}>
            <ThreeDots />
          </div>
        </div>
      </div>

      <div className="KanbanTaskView__Panel">
        <div className="KanbanTaskView__LeftPanel">
          <div className="KanbanTask__Title">{taskViewData.title}</div>
          <div className="KanbanTask__subHeading">
            {taskViewData?.description}
          </div>

          <div className="KabuniPanel__WriteContent">
            <textarea
              placeholder="Write something or “@” fo ask anything on bud"
              className="KabuniPanel__TextArea"
            />
          </div>

          <div style={{ marginTop: '20px' }}>
            <ToDoPanel />
          </div>

          <div
            style={{
              marginTop: ' 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div className="KanbanPanel__Attatchment">
              <div style={{ fontSize: '16px' }}>Attatchments</div>
              <div
                style={{
                  marginLeft: '10px',
                  color: `${color}`,
                  border: `1px solid ${color}`,
                }}
                className="AddIcon"
              >
                <div style={{ fontSize: '12px' }}>Add</div>
                <div
                  style={{
                    marginLeft: '5px',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <ArrowIcon themeColor={color} />
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                marginRight: '25px',
              }}
            >
              <div style={{ cursor: 'pointer' }}>
                <FourLines />
              </div>
              <div style={{ cursor: 'pointer' }}>
                <WindowIcon />
              </div>
            </div>
          </div>

          <div
            className={`drop-zone ${isDragOver ? 'dragover' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <UploadIcon />
            <div style={{ marginLeft: '10px' }}>Drop files here to attach</div>
          </div>
        </div>

        <div className="KanbanTaskView__RightPanel">
          <div className="KanbanRightPanel__Comments">
            {comments.map((comment) => (
              <div className="KanbanRightPanel__Comment">
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: '300',
                    color: '#7B8388',
                  }}
                >
                  {comment.text}
                </div>
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: '300',
                    color: '#7B8388',
                    marginRight: '5px',
                  }}
                >
                  {comment.time}
                </div>
              </div>
            ))}
          </div>
          <div className="KanbanRightPanel__CommentInput">
            <input
              className="CommentInput__InputField"
              placeholder="Comment or type ‘ / ‘ for commands"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskView;
