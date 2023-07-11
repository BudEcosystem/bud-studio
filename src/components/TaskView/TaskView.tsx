import React, { useEffect, useState } from 'react';
import './TaskView.css';
import { useSelector, useDispatch } from 'react-redux';
import CircularImageComponent from 'components/ListView/ListViewComponents/CircularImageComponent';
import {
  Button,
  Calendar,
  ConfigProvider,
  Drawer,
  Modal,
  Popover,
  Space,
  Tooltip,
} from 'antd';
import BudEditor from '@/Libraries/LexicalEditor/BudEditor';
import {
  updateDocumentData,
  updateDocumentDueDateById,
  updateDocumentStatusById,
} from '@/redux/slices/workspace';
import { Flag, FoldedCard } from '@/components/ListView/ListViewIcons';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import CircularBorder from '@/components/ListView/ListViewComponents/CircularBorder';
import {
  ArrowIcon,
  DocIcon,
  DocSmall,
  FlagIcon,
  FlagSmall,
  FourLines,
  PersonIcon,
  ThreeDots,
  UploadIcon,
  WindowIcon,
} from './TaskViewIcons';
import ToDoPanel from './components/ToDoPanel';

dayjs.extend(relativeTime);

function TaskView({
  data,
  title,
  showTaskViewModal,
  setShowTaskViewModal,
  status,
  item,
  databaseEntries,
}: any) {
  const { workspace, list }: any = useSelector((state) => state);
  const { color } = workspace;
  const [isDragOver, setIsDragOver] = useState(false);
  const [localState, setLocalState] = useState(null);
  const [datePopoverVisible, setDatePopoverVisible] = useState(false);
  const [todoID, setToDoId] = useState([]);
  console.log(data, databaseEntries, 'taskViewConsole');

  useEffect(() => {
    const TaskArray: any = [];
    databaseEntries.map((dbentry, i) => {
      if (dbentry.documentID === data.entry.uuid) {
        console.log(dbentry);
        dbentry?.childs?.map((child, j) => {
          workspace.workSpaceDocs.forEach((doc: any, i: any) => {
            if (doc.uuid == child.documentID) {
              TaskArray.push(doc);
            }
          });
        });
      }
    });
    setToDoId(TaskArray);
  }, [data, workspace]);

  const dispatch = useDispatch();
  const flagcolors = {
    High: '#E14F21',
    Low: '#3fe142',
    Medium: '#e1af41',
    Normal: '#3D4047',
  };

  const getFlagColor = (flagColor) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="17"
        viewBox="0 0 12 17"
        fill="none"
      >
        <path
          d="M11.9288 8.32337L10.0637 4.32083L11.944 0.68738C12.0193 0.541494 12.0134 0.366692 11.9279 0.226193C11.8424 0.0858247 11.6899 0.000131302 11.5255 0.000131302L0.471046 0C0.210813 0 0 0.210813 0 0.471046V15.78C0 16.0403 0.210813 16.2511 0.471046 16.2511C0.731278 16.2511 0.942092 16.0403 0.942092 15.78V9.04408H11.5251H11.529C11.7892 9.04408 12 8.83327 12 8.57303C12 8.48129 11.9741 8.39579 11.9288 8.32337Z"
          fill={flagColor}
        />
      </svg>
    );
  };

  // Local State
  const [priorityPopoverVisible, setPriorityPopoverVisible] = useState(false);
  const setPriority = (priority) => {
    dispatch(
      updateDocumentStatusById({ documentID: data.entry.uuid, priority })
    );
  };

  useEffect(() => {
    // console.log('task View', data);
    if (!localState) {
      const localData = workspace.applicationData[data.entry.uuid];
      setLocalState(localData[0]);
    }
  }, [data]);

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
      // console.log('Uploaded file:', file.name);
    }
  };

  const handleCancel = () => {
    setShowTaskViewModal(false);
  };

  const handleOk = () => {
    setShowTaskViewModal(false);
  };

  // Persist changes to the local state
  const persistEditorRoot = (editorState: any, editorStateTextString: any) => {
    dispatch(
      updateDocumentData({
        editorState,
        currentPage: 0,
        currentDocumentUUID: data.entry.uuid,
        editorStateTextString,
      })
    );
  };

  const updateDueDate = (date) => {
    dispatch(
      updateDocumentDueDateById({ documentID: data.entry.uuid, dueDate: date })
    );

    setDatePopoverVisible(false);
  };

  return (
    <>
      {data && (
        <Modal
          className="TaskViewModal"
          open={showTaskViewModal}
          onOk={handleOk}
          onCancel={handleCancel}
          width="auto"
          // bodyStyle={{width: 'auto',marginLeft: '270px',marginRight: '2%'}}
        >
          <div className="KanbanTaskView">
            <div className="KanbanTaskView__TopBar">
              <div className="TaskView__LeftSide">
                <div className="LogoAndProgress">
                  <div
                    className="kabuniLogo"
                    style={{ background: `${color}` }}
                  >
                    <span className="tick">L</span>
                    <span className="tick">L</span>
                    <span className="tick">L</span>
                  </div>
                  <h2 className="TopBar__Title">{title}</h2>
                  <div
                    className="TopBar__ProgressText"
                    style={{ background: `${item.colorIcon || '#fff'}` }}
                  >
                    {status}
                  </div>
                </div>

                {data?.imagesData ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        display: 'grid',
                        placeItems: 'center',
                        marginLeft: '40px',
                      }}
                      className="TopBar__AvatarImages"
                    >
                      <CircularImageComponent images={data?.imagesData} />
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
                            (data?.checklist?.checked /
                              data?.checklist?.total) *
                            100
                          }%`,
                        }}
                        className="progress"
                      />
                    </div>{' '}
                  </div>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      placeItems: 'center',
                      marginLeft: '30px',
                    }}
                  >
                    <div className="task-view-priority-chooser">
                      <Popover
                        overlayClassName="list-view-tag-set-pop"
                        content={
                          <div className="list-view-tag-set">
                            <Space direction="vertical">
                              <Space wrap>
                                <Tooltip title="High">
                                  <Button
                                    className="list-view-flag-icon list-view-flag-high"
                                    type="dashed"
                                    shape="circle"
                                    onClick={() => {
                                      setPriority('High');
                                      setPriorityPopoverVisible(false);
                                    }}
                                    icon={<Flag />}
                                  />
                                </Tooltip>

                                <Tooltip title="Medium">
                                  <Button
                                    className="list-view-flag-icon list-view-flag-medium"
                                    onClick={() => {
                                      setPriority('Medium');
                                      setPriorityPopoverVisible(false);
                                    }}
                                    type="dashed"
                                    shape="circle"
                                    icon={<Flag />}
                                  />
                                </Tooltip>
                                <Tooltip title="Normal">
                                  <Button
                                    className="list-view-flag-icon list-view-flag-normal"
                                    onClick={() => {
                                      setPriority('Normal');
                                      setPriorityPopoverVisible(false);
                                    }}
                                    type="dashed"
                                    shape="circle"
                                    icon={<Flag />}
                                  />
                                </Tooltip>
                                <Tooltip title="Low">
                                  <Button
                                    className="list-view-flag-icon list-view-flag-low"
                                    type="dashed"
                                    shape="circle"
                                    onClick={() => {
                                      setPriority('Low');
                                      setPriorityPopoverVisible(false);
                                    }}
                                    icon={<Flag />}
                                  />
                                </Tooltip>
                              </Space>
                            </Space>
                          </div>
                        }
                        arrow={false}
                        title="Priority"
                        trigger="click"
                        placement="bottom"
                        open={priorityPopoverVisible}
                        onOpenChange={setPriorityPopoverVisible}
                      >
                        <Tooltip
                          title={
                            data.entry.properties.find(
                              (prop: { title: string; value: any }) =>
                                prop.title === 'Priority'
                            )?.value
                          }
                          color={
                            flagcolors[
                              data.entry.properties.find(
                                (prop: { title: string; value: any }) =>
                                  prop.title === 'Priority'
                              )?.value
                            ]
                          }
                          key={
                            flagcolors[
                              data.entry.properties.find(
                                (prop: { title: string; value: any }) =>
                                  prop.title === 'Priority'
                              )?.value
                            ]
                          }
                        >
                          {getFlagColor(
                            flagcolors[
                              data.entry.properties.find(
                                (prop: { title: string; value: any }) =>
                                  prop.title === 'Priority'
                              )?.value
                            ]
                          )}
                        </Tooltip>
                      </Popover>
                    </div>
                    <div className="" style={{ marginRight: '40px' }}>
                      <Popover
                        trigger="click"
                        overlayClassName="list-view-tag-set-pop"
                        placement="bottom"
                        arrow={false}
                        title="Due Date"
                        open={datePopoverVisible}
                        onOpenChange={(visible) =>
                          setDatePopoverVisible(visible)
                        }
                        content={
                          <div style={{ width: 300 }}>
                            <ConfigProvider
                              theme={{
                                components: {
                                  Calendar: {
                                    colorBgContainer: '#0c0c0c',
                                    colorBgDateSelected: color,
                                    colorPrimary: color,
                                    colorText: '#fff',
                                    colorTextDisabled: '#ffffff21',
                                    fontFamily: 'Nano Sans',
                                  },
                                },
                              }}
                            >
                              <Calendar
                                fullscreen={false}
                                onChange={updateDueDate}
                              />
                            </ConfigProvider>
                          </div>
                        }
                      >
                        {data.entry.properties.find(
                          (prop: { title: string; value: any }) =>
                            prop.title === 'Date'
                        )?.value ? (
                          <div className="taskview-duedate">
                            {dayjs(
                              data.entry.properties.find(
                                (prop: { title: string; value: any }) =>
                                  prop.title === 'Date'
                              )?.value
                            ).fromNow()}
                          </div>
                        ) : (
                          <Button type="text">
                            <CircularBorder icon={<FoldedCard />} />
                          </Button>
                        )}
                      </Popover>
                    </div>
                    {/* <div className="DashedCircleIcons"> */}
                    {/*  <PersonIcon /> */}
                    {/* </div> */}
                  </div>
                )}
              </div>

              <div className="TopBar__RightSide">
                <div className="TopBarRight__Date">
                  <div style={{ color: '#8A8B8B' }}>Created</div>
                  <div style={{ color: 'white' }}>May 9, 11:20am</div>
                </div>
                <div className="Bar" />
                <div className="Share">Share</div>
                <div className="Bar" />
                <div style={{ marginLeft: '10px' }}>
                  <ThreeDots />
                </div>
              </div>
            </div>
            <div className="TaskView__HorizontalBar" />
            <div className="KanbanTaskView__Panel">
              <div className="KanbanTaskView-LeftPanel">
                <div className="KanbanTask__Title">{data?.entry.name}</div>
                <div className="KanbanTask__subHeading">
                  {data?.entry.description}
                </div>

                <div className="TaskView__WriteContent">
                  {localState && (
                    <BudEditor
                      data={localState}
                      persistEditorRoot={persistEditorRoot}
                    />
                  )}
                </div>

                {
                  <div style={{ marginTop: '20px' }}>
                    <ToDoPanel dataId={todoID} data={data} />
                  </div>
                }

                <div
                  style={{
                    marginTop: ' 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div className="KanbanPanel__Attatchment">
                    <div style={{ color: 'white', fontSize: '16px' }}>
                      Attatchments
                    </div>
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
                  <div style={{ marginLeft: '10px' }}>
                    Drop files here to attach
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default TaskView;
