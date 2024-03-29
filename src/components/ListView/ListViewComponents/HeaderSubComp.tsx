// eslint-disable-file
// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editTitle, taskViewDataChange } from 'redux/slices/list';
import { setCurrentSelectedUI } from 'redux/slices/activestate';
import {
  editDocumentTitleById,
  updateDocumentDueDateById,
  updateDocumentStatusById,
  updateDocumentTagById,
} from '@/redux/slices/workspace';
import {
  Calendar,
  Button,
  Popover,
  Icon,
  Space,
  Input,
  InputRef,
  Tooltip,
  ConfigProvider,
  theme,
} from 'antd';
import TaskView from '../../TaskView/TaskView';
import { CalendarOutlined, SearchOutlined } from '@ant-design/icons';
import { styled } from 'styled-components';
import * as dayjs from 'dayjs';
import {
  BoxArrow,
  CheckList,
  DownArrow,
  Flag,
  FoldedCard,
  FourDots,
  Sicon,
  SmallerFlag,
  User,
} from '../ListViewIcons';
import SkillBar from './SkillBar';
import CircularImageComponent from './CircularImageComponent';
import CircularBorder from './CircularBorder';
import { check } from 'prettier';

const data = ['', ''];

function HeaderSubComp({
  index,
  childIndex,
  status,
  data,
  subChild,
  provided,
  expanded,
  title,
  item,
  toggleSubAccordion,
  showTaskViewModal,
  setShowTaskViewModal,
  databaseEntries,
  descHeight,
  statusPanels,
  activeHeaderSubComp,
  setActiveHeaderSubComp,
  removeLine,
  toggleSubAccordionChild2,
  docsDictionary,
  level,
}) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(data.title);
  const [newTags, setNewTags] = useState(
    data?.entry?.properties?.find(
      (prop: { title: string; value: any }) => prop.title === 'Tags'
    )?.value[0]
  );
  const [tagPopoverVisible, setTagPopoverVisible] = useState(false);
  const [priorityPopoverVisible, setPriorityPopoverVisible] = useState(false);
  const [datePopoverVisible, setDatePopoverVisible] = useState(false);
  const [siconValue, setSiconValue] = useState(0);
  const inputTagRef = useRef<InputRef>(null);
  const { color } = useSelector((state) => state.workspace);
  console.log(data, 'kjjlkjk');
  // Priority Flags
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

  var checkedNum = 0;

  data?.entry?.checkList.forEach((item) => {
    if (item.checked == true) {
      checkedNum++;
    }
  });

  // Hooks
  useEffect(() => {
    if (tagPopoverVisible) {
      setTimeout(() => {
        inputTagRef.current!.focus();
      }, 100);
    }
  }, [tagPopoverVisible]);

  const handleDoubleClick = (e) => {
    setEditing(true);
    e.stopPropagation();
  };
  const handleChange = (event) => {
    setNewTitle(event.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      dispatch(
        editDocumentTitleById({ documentID: data.entry.uuid, newTitle })
      );
      // setNewTitle('');
      setEditing(false);
    }
  };

  // Tag
  const setTag = (tag) => {
    dispatch(updateDocumentTagById({ documentID: data.entry.uuid, newTags }));
    setTagPopoverVisible(false);
  };

  // Priority
  const setPriority = (priority) => {
    dispatch(
      updateDocumentStatusById({ documentID: data.entry.uuid, priority })
    );
  };

  // Update Due Date
  const updateDueDate = (date) => {
    dispatch(
      updateDocumentDueDateById({ documentID: data.entry.uuid, dueDate: date })
    );

    setDatePopoverVisible(false);
  };
  let i = 0;

  // console.log('DATAHEAD', data, expanded);

  const solveRec = (structure, id) => {
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
    const x = solveRec(databaseEntries, data?.entry?.uuid);
    setSiconValue(x?.childs?.length);
    // databaseEntries.forEach((doc) => {
    //   if (data.entry.uuid == doc.documentID) {
    //     setSiconValue(doc?.childs?.length);
    //   }
    // });
  }, [data]);

  // const showTaskViewModal = activeHeaderSubComp === index;

  // const [descHeight, setDescHeight] = useState(null)
  // useEffect(() => {
  //   const myDiv = document.getElementById("descriptionHeight");
  //   setDescHeight(myDiv.offsetHeight)
  // })

  const style = {
    '--treeTop': `36px`,
    '--lineColor': color,
  };
  // console.log(descHeight, "lkjlkj", style)

  if (descHeight < 36) {
    style['--treeTop'] = '18px';
  } else {
    style['--treeTop'] = '0px';
  }

  // @ts-ignore
  // @ts-ignore

  const arrowClickHandler = () => {
    if (!removeLine) {
      toggleSubAccordion();
      toggleSubAccordionChild2(data.entry.uuid);
    } else {
      toggleSubAccordionChild2(data.entry.uuid);
    }
  };
  return (
    <>
      {activeHeaderSubComp === data?.entry?.uuid && (
        <TaskView
          data={data}
          title={title}
          showTaskViewModal={showTaskViewModal}
          setShowTaskViewModal={setShowTaskViewModal}
          status={status}
          item={item}
          databaseEntries={databaseEntries}
          statusPanels={statusPanels}
          subChild={subChild}
          checkedNum={checkedNum}
          level={level}
        />
      )}
      <div className={`flexVerticalCenter HeaderSubCompParent`} style={style}>
        <div className="flexVerticalCenter">
          <div
            className="iconsContainer"
            style={{
              marginLeft: subChild ? '12px' : '',
            }}
          >
            <div
              {...provided?.dragHandleProps}
              style={{
                display: subChild ? 'none' : '',
                position: 'relative',
              }}
            >
              <FourDots />
            </div>
            <div
              className={`${
                removeLine != true && subChild ? 'subchildTree' : ''
              } ${removeLine === true ? 'subSubChildTree' : ''}`}
              style={{ position: 'absolute' }}
            >
              <div
                style={{
                  transform: !docsDictionary[data?.entry?.uuid]
                    ? ''
                    : 'rotate(-90deg)',
                  transition: 'all 0.2s ease',
                  marginLeft: subChild ? '0px' : '-5px',
                }}
                onClick={arrowClickHandler}
              >
                <DownArrow />
              </div>
            </div>
            {!subChild && <div className="textIcon22" />}
          </div>
          {editing ? (
            <input
              className="titleInput"
              type="text"
              value={newTitle}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              onBlur={() => setEditing(false)}
            />
          ) : (
            <p
              className="datatitleText"
              id="cardTitle"
              style={{ marginLeft: '14px' }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                handleDoubleClick(e);
              }}
            >
              {data.title}
            </p>
          )}
          <div
            onClick={() => {
              setActiveHeaderSubComp(data.entry.uuid);
              setShowTaskViewModal(true);
            }}
            className="siconContainer"
          >
            <div className="flexVerticalCenter" style={{ marginLeft: '0px' }}>
              <Sicon />
            </div>
            <div className="list-view-count">{siconValue}</div>
            <div className="vertical-bar">|</div>
            <div style={{ marginLeft: '5px' }}>+</div>
          </div>
          {!subChild && (
            <div className="checklistContainer">
              <div style={{ marginLeft: '0px' }}>
                <CheckList />
              </div>
              <div style={{ marginLeft: '2px' }}>
                <span>{checkedNum}</span>/
                <span>{data?.entry?.checkList?.length}</span>
              </div>
            </div>
          )}
        </div>
        <div className="flexVerticalCenter">
          {!subChild && checkedNum !== 0 && (
            <div style={{ marginRight: '40px' }}>
              <SkillBar
                percentage={(checkedNum / data?.entry.checkList.length) * 100}
              />
            </div>
          )}

          <div style={{ marginRight: '40px' }}>
            {/* {data?.imagesData?.length > 0 ? ( */}
            {/*  <CircularImageComponent images={data.imagesData} /> */}
            {/* ) : ( */}
            {/*  <div style={{ marginRight: '14px' }}> */}
            {/*    <CircularBorder icon={<User />} /> */}
            {/*  </div> */}
            {/* )} */}
          </div>
          <div className="flexCenter" style={{ marginRight: '40px' }}>
            {data.page ? (
              <FoldedCard />
            ) : (
              <Popover
                trigger="click"
                overlayClassName="list-view-tag-set-pop"
                placement="bottom"
                arrow={false}
                title="End Date"
                open={datePopoverVisible}
                onOpenChange={(visible) => setDatePopoverVisible(visible)}
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
                      <Calendar fullscreen={false} onChange={updateDueDate} />
                    </ConfigProvider>
                  </div>
                }
              >
                {data?.entry?.properties?.find(
                  (prop: { title: string; endDate: any }) =>
                    prop.title === 'Date'
                )?.endDate ? (
                  <>
                    {dayjs(
                      data?.entry?.properties?.find(
                        (prop: { title: string; endDate: any }) =>
                          prop.title === 'Date'
                      )?.endDate
                    ).format('DD MMM YYYY')}
                  </>
                ) : (
                  <Button type="text">
                    <CircularBorder icon={<FoldedCard />} />
                  </Button>
                )}
              </Popover>
            )}
          </div>
          <div className="flexCenter" style={{ marginRight: '40px' }}>
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
                  data?.entry?.properties?.find(
                    (prop: { title: string; value: any }) =>
                      prop.title === 'Priority'
                  )?.value
                }
                color={
                  flagcolors[
                    data?.entry?.properties?.find(
                      (prop: { title: string; value: any }) =>
                        prop.title === 'Priority'
                    )?.value
                  ]
                }
                key={
                  flagcolors[
                    data?.entry?.properties?.find(
                      (prop: { title: string; value: any }) =>
                        prop.title === 'Priority'
                    )?.value
                  ]
                }
              >
                {getFlagColor(
                  flagcolors[
                    data?.entry?.properties?.find(
                      (prop: { title: string; value: any }) =>
                        prop.title === 'Priority'
                    )?.value
                  ]
                )}
              </Tooltip>
            </Popover>
          </div>

          <Popover
            overlayClassName="list-view-tag-set-pop"
            open={tagPopoverVisible}
            onOpenChange={(visible) => {
              setTagPopoverVisible(visible);
            }}
            content={
              <div className="list-view-tag-set">
                <Input
                  defaultValue={
                    data?.entry?.properties.find(
                      (prop: { title: string; value: any }) =>
                        prop.title === 'Tags'
                    )?.value[0]
                  }
                  onChange={(e) => setNewTags(e.target.value)}
                  onKeyDown={(e) => {
                    e.key === 'Enter' && setTag();
                  }}
                  ref={inputTagRef}
                />
                {/* <AddTagButton color={color} onClick={setTag}> */}
                {/*  Update Tag */}
                {/* </AddTagButton> */}
              </div>
            }
            arrow={false}
            title="Tag"
            trigger="click"
            placement="bottom"
          >
            <TagContainer color={color}>
              {
                data?.entry?.properties?.find(
                  (prop: { title: string; value: any }) => prop.title === 'Tags'
                )?.value[0]
              }
            </TagContainer>
            {/* <Button type="text"> */}
            {/*  <CircularBorder icon={<BoxArrow />} /> */}
            {/* </Button> */}
          </Popover>
        </div>
      </div>
    </>
  );
}

const TagContainer = styled.div`
  min-width: 59px;
  height: 18px;

  background: #3d4047;
  border-radius: 6px;
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  color: #c6c6c6;
  transition: background-color 0.4s ease;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: flex-start;
  justify-content: center;
  align-items: center;
  padding-left: 2px;
  padding-right: 4px;

  &:hover {
    background-color: ${(props) => props.color};
  }
`;

// Styles
const AddTagButton = styled.div`
  background-color: ${(props) => props.color};
  border: none;
  color: #fff;
  font-weight: 400;
  font-size: 14px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  height: 30px;
  border-radius: 4px;
  outline: none;
  opacity: 0.5;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: flex-start;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 1;
  }
`;

export default HeaderSubComp;
