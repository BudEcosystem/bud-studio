import React from 'react'
import { GroupBy, Sort, ThreeDots, Union, Views } from '../ListViewIcons'

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
  return (
    <div className='flexCenter'>
        {nameAndLogoArray.map((item, i) => (
            <div className='flexCenter newTaskPanelItems'>
                {item.logo}
                <p className='itemName'>{item.name}</p>
                {i === nameAndLogoArray.length-1 ? undefined : (<div className='verticalLine'>|</div>)}
            </div>
        ))}
        <div className='newTaskContainer'>
            <div className='plusContainer flexCenter'>+</div>
            <div className='newTaskText'>New Task</div>
        </div>
        <div className='threeDots flexCenter'><ThreeDots /></div>
    </div>
  )
}

export default NewTaskPanel