import React from 'react'
import { GroupBy, Sort, ThreeDots, Union, Views } from '../ListViewIcons'
import { useDispatch, useSelector } from 'react-redux';
import { setNewTaskClicked } from 'redux/slices/list';

const nameAndLogoArray = [
    {
        name: "Search",
        logo: <Union />
    },
    {
        name: "Sort",
        logo: <Sort />
    },
    {
        name: "Group By",
        logo: <GroupBy />
    },
    {
        name: "Views",
        logo: <Views />
    }
]

const NewTaskPanel = () => {
    const dispatch = useDispatch();
    const { list }: any = useSelector((state) => state);
    const {newTaskClicked} = list
    const newTaskHandler = () => {
        dispatch(setNewTaskClicked(!newTaskClicked))
    }
  return (
    <div className='flexCenter'>
        {nameAndLogoArray.map((item, i) => (
            <div className='flexCenter newTaskPanelItems'>
                {item.logo}
                <p className='itemName'>{item.name}</p>
                {i === nameAndLogoArray.length-1 ? undefined : (<div className='verticalLine'>|</div>)}
            </div>
        ))}
        <div className='newTaskContainer' onClick={newTaskHandler}>
            <div className='plusContainer flexCenter'>+</div>
            <div className='newTaskText'>New Task</div>
        </div>
        <div className='threeDots flexCenter'><ThreeDots /></div>
    </div>
  )
}

export default NewTaskPanel