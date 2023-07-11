import { styled } from 'styled-components';

export const Container = styled.div`
  margin: 10px;
  border-radius: 5px;
  border: 0.5px dashed #2f2f2f;
  background: #101010;
  max-width: 238px;
  min-width: 238px;
  height: auto;
`;
export const TitleHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 12px;
  align-items: center;
  justify-content: space-between;
`;
export const TitleHeaderFirst = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const TitleHeaderSecond = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const TitleHeaderDragable = styled.div``;
export const TitleHeaderThreedot = styled.div`
  margin-left: 13px;
  margin-right: 13px;
`;

export const TitleHeaderColoured = styled.div`
  width: 12px;
  height: 12px;
  background: ${(props) => props.color};
  border-radius: 4px;
  margin-left: 7px;
  color: white;
`;
export const Title = styled.h3`
  padding: 10px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 154.5%;
  /* identical to box height, or 22px */
  color: #ffffff;
`;
export const TitleHeaderPlusIconWrapper = styled.div`
  width: 22px;
  height: 22px;
  background: #151517;
  border-radius: 5.67742px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  // margin-left: 107px;
`;
export const TitleHeaderPlusIcon = styled.div``;

export const TaskList = styled.div`
  padding: 10px;
`;
export const AddNewTaskWrapper = styled.div`
  width: 214px;
  height: 44px;
  background: #141414;
  border: 0.5px dashed #2f2f2f;
  border-radius: 8px;
  margin: 0px auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
export const AddNewTaskColoredBorderLeft = styled.div`
  width: 0px;
  height: 17.64px;
  border: 1.25336px solid #f9d45d;
  border-radius: 0.313339px;
  margin-left: 14px;
`;
export const AddNewTaskinput = styled.input`
  width: 105px;
  height: 21px;
  left: 331px;
  top: 327px;
  background: rgba(217, 217, 217, 0.05);
  border-radius: 2px;
  text-align: left;
  color: #bbbbbb;
  outline: none;
  border: none;
  margin-left: 5px;
  &::placeholder,
  &::-webkit-input-placeholder {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 154.5%;
    /* identical to box height, or 22px */

    color: #bbbbbb;
  }
  &:-ms-input-placeholder {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 154.5%;
    /* identical to box height, or 22px */
    color: #bbbbbb;
  }
`;
export const ColumnMenuWrapper = styled.div`
  width: 100px;
  background: #101010;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding-top: 5px;
  padding-bottom: 5px;
`;
export const ColumnMenuItems = styled.div`
  height: 25px;
  width: 100px;
  // background: #2c2b30;
  display: flex;
  flex-direction: column;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
export const ColumnMenuLabel = styled.span`
  width: 70px;
  margin-left: 5px;
`;
export const EditColumnWrapper = styled.div`
  width: auto;
  height: auto;
  margin-top: 15px;
  border: 0.5px dashed #2f2f2f;
  padding-right: 5px;
  margin-left: 15px;
  position: relative;
`;
export const EditColumnNameInput = styled.input`
  // position: absolute;
  // margin-top: -5px;
  width: 90px;
  height: 20px;
  background: #101010;
  border-radius: 2px;
  text-align: left;
  color: #bbbbbb;
  outline: none;
  border: none;
  margin-left: 15px;
  &::placeholder,
  &::-webkit-input-placeholder {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 154.5%;
    /* identical to box height, or 22px */
    text-align: left;
    color: #bbbbbb;
  }
  &:-ms-input-placeholder {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 154.5%;
    /* identical to box height, or 22px */
    color: #bbbbbb;
  }
`;

export const TaskHeader = styled.div`
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
export const TaskHeading = styled.div`
  width: 119px;
  &:first-letter {
    text-transform: uppercase;
  }
`;
export const TaskProgressBar = styled.div`
  width: 94px;
  height: 4px;
  left: 321px;
  top: 386px;
  margin-top: 13px;
  margin-bottom: 15px;
  background: #0f0f0f;
  border-radius: 21px;
`;
export const TaskProgress = styled.div`
  width: 64px;
  height: 4px;
  background: #939aff;
  border-radius: 21px;
`;
export const TaskUserUI = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  padding-bottom: 15px;
  margin-bottom: 15px;
  > *:not(:first-child) {
    left: 10px;
  }
`;
export const TaskUser = styled.div`
  border-radius: 50%;
  background: grey;
  width: 18px;
  height: 18px;
  position: absolute;
  border: 0.5px solid #fbf3f3;
`;

export const TaskDescription = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  letter-spacing: -0.02em;
  color: #bbbbbb;
  // margin-top: 13px;
  margin-bottom: 20px;
`;

export const TaskFooterSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  > *:not(:first-child) {
    margin-left: 10px;
  }
`;

export const TaskFooterTagsWrapper = styled.div`
  // width: 51.71px;
  height: 24px;
  background: #1b1c1e;
  border-radius: 7.03826px;
  display: flex;
  align-items: center;
  padding: 3.5px 7px 3.5px 7px;
`;

export const TaskFooterDueDetails = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  text-align: right;
  color: #c6c6c6;
`;

export const TaskBrancDetailsWrapper = styled.div`
  height: 17px;
  display: flex;
  align-items: center;
`;
export const TaskBranchImage = styled.div``;
export const TaskBranchCount = styled.span`
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
export const TaskBrancDetailsSeperator = styled.div`
  width: 7.64px;
  height: 0px;
  left: 32.88px;
  border: 0.848362px solid rgba(255, 255, 255, 0.25);
  transform: rotate(90deg);
  margin-left: 7px;
`;
export const TaskImageSection = styled.div`
  width: 184px;
  height: 120px;
  background: url(${(props: any) => props.image});
  border-radius: 6px;
  margin-top: 14px;
`;

export const TaskType = styled.div`
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
export const TaskTypeSpan = styled.span`
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 100%;
  /* identical to box height, or 10px */

  color: #c6c6c6;
`;
export const PopOverWrapper = styled.div`
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
export const PopOveSearchWrapper = styled.div`
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
export const PopOverSearchIcon = styled.img`
  margin-left: 15px;
`;
export const PopOverSearchInput = styled.input`
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
export const PopOverSearchKeybordCommandWrapper = styled.div`
  width: 20px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 15.59px;
`;
export const PopOverSearchKeybordCommand = styled.img``;
