import React, { useEffect, useRef } from 'react';
import './ToggleFileComponent.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeColor,
  setCurrentSelectedDocument,
  setDropdownBreadcrumbs,
} from '@/redux/slices/workspace';
import { setNavigationPath, setNodeIDs } from '@/redux/slices/activestate';

export const FileLogo = ({color}) => {
  return (
    <svg
      width="12"
      height="15"
      viewBox="0 0 12 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group 1261155719">
        <path
          id="Subtract"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1.74121 0H7.34203C7.79326 0 8.22688 0.175176 8.55149 0.488612L11.4683 3.30493C11.8081 3.63305 12 4.08516 12 4.55754V12.7135C12 13.6752 11.2204 14.4547 10.2588 14.4547H1.74121C0.779567 14.4547 0 13.6752 0 12.7135V1.74121C0 0.779567 0.779568 0 1.74121 0ZM7.61829 0.181213V4.14825H11.6575L7.61829 0.181213ZM2.03435 11.638C2.03435 11.3619 2.25821 11.138 2.53435 11.138H7.61833C7.89447 11.138 8.11833 11.3619 8.11833 11.638C8.11833 11.9141 7.89447 12.138 7.61833 12.138H2.53435C2.25821 12.138 2.03435 11.9141 2.03435 11.638ZM5.37684 9.74457C5.65298 9.74457 5.87684 9.52071 5.87684 9.24457C5.87684 8.96843 5.65298 8.74457 5.37684 8.74457H2.53431C2.25816 8.74457 2.03431 8.96843 2.03431 9.24457C2.03431 9.52071 2.25816 9.74457 2.53431 9.74457H5.37684Z"
          fill={color}
        />
      </g>
    </svg>
  );
};

export const ToggleFileComponent = ({setToggleFileButton}: any) => {
  const { workspace }: any = useSelector((state) => state);
  const { dropdownBreadcrumbs, currentSelectedDocId, color } = workspace;
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const {} = useOutsideAlerter(wrapperRef);
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setToggleFileButton(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
    return {};
  }

  const findParent = (x: any) => {
    const find = workspace.workSpaceDocs.find((y: any) => y?.uuid === x);
    return find;
  };

  const solveRec = (x: any) => {
    if (x?.childOf != null) {
      const temp = workspace.workspaceFolders.find(
        (y: any) => y?.uuid === x?.childOf
      );
      console.log('asdfasfsad', temp);
      dispatch(setNavigationPath(temp));
      solveRec(temp);
    }
  };
  const clickHandler = (item) => {
    console.log('clicked', item);
    setTimeout(() => {
      dispatch(
        setCurrentSelectedDocument({
          uuid: item.id,
          workSpaceUUID: item.workspaceUUID,
        })
      );
      dispatch(
        setNodeIDs({
          uuid: item.id,
          workSpaceUUID: item.workspaceUUID,
        })
      );
      // dispatch(changeColor({ color: workspaceItem.color }));
      dispatch(setNavigationPath(null));
      dispatch(setNavigationPath({ name: item.name }));
      const par = findParent(item.id);
      if (par) {
        // dispatch(setNavigationPath({name: par.name}));
        solveRec(par);
      }
      const x = workspace.workSpaceItems.find(
        (i) => i.uuid === item.workspaceUUID
      );
      dispatch(setNavigationPath({ name: x.name }));
      // dispatch(setDropdownBreadcrumbs());
    });
  };
  const handler = () => {
    if (dropdownBreadcrumbs.length > 1) {
      return dropdownBreadcrumbs?.map((item, i) => {
        if (item.id !== currentSelectedDocId) {
          return (
            <div className="toggleFile" onClick={() => clickHandler(item)}>
              <FileLogo color={color} />
              <p className="fileNameToggle">{item.name}</p>
            </div>
          );
        }
      });
    } else {
      return (
        <div className="toggleFile">
          <p className="fileNameToggle" style={{ color: 'white' }}>
            No Docs
          </p>
        </div>
      );
    }
  };

  return (
    <div ref={wrapperRef} className="toggleFileWrapper">
      <div className="toggleMainContainer">{handler()}</div>
    </div>
  );
};
