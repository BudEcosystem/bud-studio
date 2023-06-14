import React, { useState } from 'react';
import './TaskView.css'
import { useSelector } from 'react-redux';
import { ArrowIcon, DocIcon, FlagIcon, ThreeDots, UploadIcon } from './TaskViewIcons';

const TaskView = () => {

    const { workspace }: any = useSelector((state) => state);
    const { color } = workspace;
    const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (event:any) => {
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

    const files = event.dataTransfer.files;
    handleFiles(files);
  };

  const handleFiles = (files: any) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Perform file upload or any other desired operation
      console.log('Uploaded file:', file.name);
    }
  };

  return (
    <div className='KanbanTaskView'>

        <div className='KanbanTaskView__TopBar'>
            <div className='TopBar__LeftSide'>
            <div className='LogoAndProgress'>
                <div className="kabuniLogo" style={{background: `${color}`}}>
                        <span className="tick">L</span>
                        <span className="tick">L</span>
                        <span className="tick">L</span>
                </div>
                <h2 className='TopBar__Title'>Kabuni</h2>
                <div className='TopBar__ProgressText'>In Progress</div>
            </div>
              <div className='TopBar__AvatarImages'></div>
              <div style={{cursor: "pointer", display: "grid", placeItems: "center", marginLeft: "20px"}}><FlagIcon/></div>
              <div style={{cursor: "pointer", display: "grid", marginTop: "7px", marginLeft: "20px"}}><DocIcon/></div>
              <div className="progressBar">
                <div style={{backgroundColor: `${color}`, width: "20%"}} className="progress"></div>
              </div>
            </div>

            <div className='TopBar__RightSide'>
              <div className='TopBarRight__Date'>
              <div style={{color: "#8A8B8B"}}>Created</div>
                <div>May 9, 11:20am</div>
              </div>
              <div className='Bar'></div>
              <div className='Share'>Share</div>
              <div className='Bar'></div>
              <div style={{marginLeft: "10px"}}>
                <ThreeDots/>
              </div>
            </div>
        </div>

        <div className='KanbanTaskView__Panel'>

          <div className='KanbanTaskView__LeftPanel'>
            <div className='KanbanTask__Title'>Check and respond to emails</div>
            <div className='KanbanTask__subHeading'>Make note of any appointments or meetings.</div>

            <div className='KabuniPanel__WriteContent'>
              <textarea placeholder='Write something or “@” fo ask anything on bud' className='KabuniPanel__TextArea'></textarea>
            </div>

            <div className='KanbanPanel__Attatchment'>
              <div style={{fontSize: "16px"}}>Attatchments</div>
              <div style={{marginLeft: "10px", color: `${color}`, border: `1px solid ${color}`}} className='AddIcon'>
                <div style={{fontSize: "12px"}}>Add</div> 
                <div style={{marginLeft:"5px", display: "grid", placeItems: "center"}}><ArrowIcon themeColor={color}/></div>
                </div>
            </div>
            <div
            className={`drop-zone ${isDragOver ? 'dragover' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <UploadIcon/>  
            <div style={{marginLeft: "10px"}}>Drop files here to attach</div>
          </div>
          </div>

          <div className='KanbanTaskView__RightPanel'>
            
          </div>

        </div>
    </div>
  )
}

export default TaskView