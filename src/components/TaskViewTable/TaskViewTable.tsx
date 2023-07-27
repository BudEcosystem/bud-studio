import React, { useEffect, useState } from 'react';
import './TaskViewTable.css';
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
  updateDocumentStartDateById,
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

function TaskViewTable({
  data,
  title,
  showTaskViewModal,
  setShowTaskViewModal,
  status,
  item,
  databaseEntries,
  statusPanels,
  subChild,
  checkedNum,
  level,
}: any) {
  const { workspace }: any = useSelector((state) => state);
  const { color } = workspace;
  const [isDragOver, setIsDragOver] = useState(false);
  const [localState, setLocalState] = useState(null);
  const [startDatePopoverVisible, setStartDatePopoverVisible] = useState(false);
  const [endDatePopoverVisible, setEndDatePopoverVisible] = useState(false);
  const [todoID, setToDoId] = useState([]);
  const [statusColor, setStatusColor] = useState();

  const solveRec = (structure: any, id: any) => {
    console.log({ ...structure }, id, 'rec1');
    if (!structure || structure.length === 0) {
      return null;
    }
    for (const item of structure) {
      console.log({ ...structure }, id, { ...item }, 'rec2');
      if (item.documentID === id) {
        console.log(structure, id, { ...item }, 'rec3');
        return item;
      }
      if (item.childs && item.childs.length > 0) {
        const foundInFolders = solveRec(item.childs, id);
        if (foundInFolders) {
          console.log(foundInFolders, 'rec4');
          return foundInFolders;
        }
      }
      // if (item.files && item.files.length > 0) {
      //   const foundInFiles = searchById(item.files, id);
      //   if (foundInFiles) {
      //     return foundInFiles;
      //   }
      // }
    }
    return null;
  };

  useEffect(() => {
    const TaskArray: any = [];
    console.log("CLL", databaseEntries)
    const x = solveRec(databaseEntries, data.entry.uuid);
    x.childs.map((child: any, i: any) => {
      workspace.workSpaceDocs.forEach((doc: any, j: any) => {
        if (doc.uuid == child.documentID) {
          TaskArray.push(doc);
        }
      });
    });

    setToDoId(TaskArray);
  }, [data, workspace, databaseEntries, item]);

  const formattedStatus = status
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (match: any) => match.toUpperCase());

  useEffect(() => {
    statusPanels.map((item: any, i: any) => {
      const formattedStatus = status
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (match: any) => match.toUpperCase());
      if (item.status === formattedStatus) {
        setStatusColor(item.colorIcon);
      }
    });
  }, [databaseEntries, data, workspace, item]);

  const dispatch = useDispatch();
  const flagcolors = {
    High: '#E14F21',
    Low: '#3fe142',
    Medium: '#e1af41',
    Normal: '#3D4047',
  };

  const getFlagColor = (flagColor: any) => {
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
  const setPriority = (priority: any) => {
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
  }, [data, databaseEntries, workspace, item]);

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

  const updateStartDate = (date: any) => {
    dispatch(updateDocumentStartDateById({ documentID: data.entry.uuid, dueDate: date }));

    setStartDatePopoverVisible(false);
  };

  const updateEndDate = (date: any) => {
    dispatch(updateDocumentDueDateById({ documentID: data.entry.uuid, dueDate: date }));

    setEndDatePopoverVisible(false);
  };

  return (
    <>
      {data && (
        <Modal
          className="TaskViewModal"
          open={showTaskViewModal}
          onOk={handleOk}
          onCancel={handleCancel}
          // width="auto"
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
                    style={{ background: `${statusColor || '#fff'}` }}
                  >
                    {formattedStatus}
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
                    <div
                      style={{ marginRight: '5px' }}
                      className="task-view-priority-chooser"
                    >
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
                    
                    <div className="" style={{display: "flex", alignItems:"center"}}>
                  <div style={{fontFamily: "Noto Sans", color:  `${color}`, fontWeight: "600", marginLeft: "20px"}}>Starts :</div> 
                  <Popover
                    trigger="click"
                    overlayClassName="list-view-tag-set-pop"
                    placement="bottom"
                    arrow={false}
                    title="Start Date"
                    open={startDatePopoverVisible}
                    onOpenChange={(visible) => setStartDatePopoverVisible(visible)}
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
                            onChange={updateStartDate}
                          />
                        </ConfigProvider>
                      </div>
                    }
                  >
                    {data.entry.properties.find(
                      (prop: { title: string; startDate: any }) =>
                        prop.title === 'Date'
                    )?.startDate ? (
                      <div className="taskview-duedate">
                        {dayjs(
                          data.entry.properties.find(
                            (prop: { title: string; startDate: any }) =>
                              prop.title === 'Date'
                          )?.startDate
                        ).fromNow()}
                      </div>
                    ) : (
                      <Button type="text">
                        <CircularBorder icon={<FoldedCard />} />
                      </Button>
                    )}
                  </Popover>
                </div>
                
                <div className="" style={{ marginRight: '10px', display: "flex", alignItems:"center", justifyContent: "center" }}>
                  <div style={{fontFamily: "Noto Sans", color:  `${color}`, fontWeight: "600", marginLeft: "20px"}}>Ends :</div> 
                  <Popover
                    trigger="click"
                    overlayClassName="list-view-tag-set-pop"
                    placement="bottom"
                    arrow={false}
                    title="End Date"
                    open={endDatePopoverVisible}
                    onOpenChange={(visible) => setEndDatePopoverVisible(visible)}
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
                            onChange={updateEndDate}
                          />
                        </ConfigProvider>
                      </div>
                    }
                  >
                    {data.entry.properties.find(
                      (prop: { title: string; endDate: any }) =>
                        prop.title === 'Date'
                    )?.endDate ? (
                      <div className="taskview-duedate">
                        {dayjs(
                          data.entry.properties.find(
                            (prop: { title: string; endDate: any }) =>
                              prop.title === 'Date'
                          )?.endDate
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
                    {!subChild && (
                      <div className="progressBar">
                        <div
                          style={{
                            backgroundColor: `${color}`,
                            width: `${
                              (checkedNum / data?.entry?.checkList?.length) *
                              100
                            }%`,
                          }}
                          className="progress"
                        />
                      </div>
                    )}
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
                    <ToDoPanel
                      dataId={todoID}
                      data={data}
                      statusPanels={statusPanels}
                      subChild={subChild}
                      title={title}
                      showTaskViewModal={showTaskViewModal}
                      setShowTaskViewModal={setShowTaskViewModal}
                      status={status}
                      item={item}
                      databaseEntries={databaseEntries}
                      checkedNum={checkedNum}
                      level={level}
                    />
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

export default TaskViewTable;
