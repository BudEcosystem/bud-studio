import React, { useRef } from 'react'

const HoverEffect = () => {
    const refHoverBar = useRef();

    const onItemsMouseEnter = (e: any) => {
        const top = e.currentTarget.offsetTop + 10;
        refHoverBar.current.style.transform = `translateY(${top}px)`;
      };

  return (
    
    // THIS DIV CONTAINS THE EDITOR BLOCK OPTIONS 
    <div className="editorOptionDiv">
        
            <div className="hoverMovement" ref={refHoverBar} /> // THE HOVER EFFECT DIV
            {/* {editorOptions.map((option) => (
              <EditorOptionComponent
                opt={option.key}
                icon={option.icon}             // THESE ARE THE EDITOR OPTIONS BEING MAPPED, NO NEED TO WORRY ABOUT THIS CODE
                title={option.title}
                subTitle={option.subTitle}
                id={option.id}
                onItemsMouseEnter={onItemsMouseEnter} // THE ON MOUSE ENTER FUNCTION IS CALLED HERE WHICH TRIGGERS THE HOVER EFFECT
              />
            ))} */}
          </div>
  )
}

export default HoverEffect


// THE CSS

// .hoverMovement {
//     position: absolute;
//     right: 0;
//     left: 0;
//     background: #1F1E22;
//     height: 45px;
//     transition: transform .2s ease;
//     transform: translateY(9px);
//     z-index: -1;
//     border-radius: 12px;
//   }


// .EditorOptionComponent {
//     height: 45px;
//     display: flex;
//     align-items: center;
//     cursor: pointer;
//     transform: translateY(10px);
//     transition: all 0.4s ease-in-out;
//   }