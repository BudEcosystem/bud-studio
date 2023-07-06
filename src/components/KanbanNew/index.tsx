import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import Kanban from './kanbanBoard';
import HeaderSection from 'components/ListView/HeaderSection';
import GroupByComponent from 'components/GroupByComponent/GroupByComponent';
import SortByComponent from 'components/SortByComponent/SortByComponent';

const KanbanSection = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  background: #101010;
`;
const KanbanHeader = styled.div`
  width: 100%;
  height: 173px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
`;
const KanbanBoardHeading = styled.div`
  display: flex;
  flex-direction: row;
`;
const KanbanBoardHeadingLogoWrap = styled.div`
  width: 24px;
  height: 24px;
  margin-top: 5px;
`;
function KanbanBoardHeadingLogo() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect x="0.453125" width="23.5469" height="24" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_1049_30975"
            transform="translate(-0.171875 -0.15625) scale(0.00553385)"
          />
        </pattern>
        <image
          id="image0_1049_30975"
          width="240"
          height="240"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}
const KanbanBoardHeadingText = styled.span`
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 100%;
  /* identical to box height, or 32px */
  color: #ffffff;
  margin-left: 10px;
`;
const KanbanBoardHeadingSecondarySection = styled.div`
  display: flex;
  flex-direction: row;
`;
const KanbanBoardSecondaryHeadingText = styled.span`
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 100%;
  /* identical to box height, or 12px */
  color: #bbbbbb;
  margin-top: 10px;
`;
const KanbanHeaderBottomSection = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const KanbanHeaderBottomSectionFirstHalf = styled.div`
  width: auto;
  height: 20px;
  display: flex;
`;
const KanbanHeaderBottomSectionSecondHalf = styled.div`
  width: auto;
  height: 20px;
  display: flex;
  justify-content: flex-end;
`;
const KanbanKanbanHeaderBottomSectionFirstHalfDateIconWrapper = styled.div`
  width: 12px;
  height: 12px;
`;
function KanbanKanbanHeaderBottomSectionFirstHalfDateIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.79068 1.00004H2.53485C2.12791 1.00044 1.73771 1.17027 1.45 1.47198C1.16221 1.77381 1.00036 2.18295 1 2.60981V11.3903C1.00037 11.8171 1.16221 12.2263 1.45 12.5281C1.73769 12.8299 2.12791 12.9996 2.53485 13H8.21217C8.42484 12.9995 8.635 12.9524 8.82926 12.8617C8.83925 12.8575 8.84738 12.851 8.85691 12.8461C9.02034 12.7682 9.16946 12.6606 9.29739 12.5284L12.5504 9.11684C12.8392 8.8156 13.0011 8.40567 13 7.97841V2.60977C12.9996 2.18288 12.8378 1.77376 12.55 1.47194C12.2623 1.17022 11.8721 1.00038 11.4651 1H10.2093L9.37209 1L7.41854 1H6.58132H4.62776L3.79068 1.00004ZM11.9586 8.49603L9.09317 11.5012V9.04885C9.0941 8.96849 9.15606 8.90352 9.23268 8.90254H10.9071C11.0567 8.90254 11.1949 8.81885 11.2697 8.68303C11.3444 8.54721 11.3444 8.37983 11.2697 8.24401C11.1949 8.10818 11.0567 8.02449 10.9071 8.02449H9.23268C8.97376 8.02479 8.72549 8.13288 8.54235 8.32486C8.3593 8.51693 8.25623 8.77731 8.25595 9.04885V12.113C8.241 12.114 8.22735 12.1221 8.21231 12.1221H2.53498C2.35006 12.1219 2.1727 12.0448 2.0419 11.9076C1.91111 11.7704 1.83755 11.5844 1.83736 11.3905V4.8051H12.1632V7.97862L12.1631 7.97852C12.1637 8.17285 12.09 8.35925 11.9587 8.49615L11.9586 8.49603ZM6.5815 1.87804H7.41872H9.37228H10.2093H10.2095H11.4653C11.6503 1.87824 11.8276 1.95536 11.9584 2.09256C12.0892 2.22976 12.1628 2.41576 12.163 2.60978V3.92686H1.83736V2.60978C1.83755 2.41575 1.91108 2.22976 2.0419 2.09256C2.17272 1.95536 2.35007 1.87824 2.53498 1.87804H3.79081H4.62803H6.5815Z"
        fill="#BBBBBB"
        stroke="#BBBBBB"
        strokeWidth="0.5"
      />
    </svg>
  );
}
const KanbanKanbanHeaderBottomSectionFirstHalfDate = styled.span`
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */
  margin-left: 9px;

  color: #ffffff;
`;
const ButtonGroup = styled.div`
  height: auto;
  display: flex;
  padding-right: 14px;
  padding-left: 10px;
  border-right: 1px solid #595959;
  > *:not(:last-child) {
    // margin-left: 10px;
  }
`;
const BUttonGroupLogo = styled.div`
  height: 12px;
  width: auto;
  margin-top: 3px;
  margin-right: 5px;
`;

const ButtonGroupLabel = styled.span`
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  /* identical to box height */
  color: #8a8b8b;
`;

const NewTaskButtonWrap = styled.div`
  height: 32px;
  width: 98px;
  background: #212023;
  border-radius: 6px;
  margin-top: -5px;
  margin-left: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const NewTaskButtonIconWrap = styled.div`
  width: 27px;
  height: 26px;
  background: #0f0f0f;
  border-radius: 5px;
  margin: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NewTaskButtonIcon = styled.div``;
const NewTaskButtonLabel = styled.span`
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
  margin-left: 6px;
`;
const ThreeDotVerticalIcon = styled.div`
  height: 14.75px;
  margin-left: 25px;
  margin-top: 3px;
`;

// ThreeDotVerticalIcon
function HeaderButtons({ label, icon }: any) {
  return (
    <ButtonGroup>
      <BUttonGroupLogo>{icon}</BUttonGroupLogo>
      <ButtonGroupLabel>{label}</ButtonGroupLabel>
    </ButtonGroup>
  );
}
function KanbanUI() {
  const [date, setDate] = useState<String>('');
  const [title, setTitle] = useState('');
  useEffect(() => setDate('13 June 2022'), []);
  // const onNewTaskButtonClicked = () => {
  //   dispatch(triggerDefaultNewTask({ triggerTaskCreation: true }));
  // };

  return (
    <KanbanSection>
      {/* <HeaderSection
        view="kanban"
        updateCurrentTitle={updateCurrentTitle}
        title={title}
      /> */}
        {/* <div style={{ marginLeft: '38px', marginRight: '63px' }}>
          <GroupByComponent />
        </div> */}
      <Kanban />
    </KanbanSection>
  );
}
export default KanbanUI;
