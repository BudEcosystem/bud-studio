import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import Kanban from './kanbanBoard';

const KanbanSection = styled.div`
  height: auto;
  padding: 47px;
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
const KanbanBoardHeadingLogo = styled.img``;
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
`;
const KanbanHeaderBottomSectionFirstHalf = styled.div`
  width: 50%;
  height: 20px;
  display: flex;
`;
const KanbanHeaderBottomSectionSecondHalf = styled.div`
  width: 50%;
  height: 20px;
  display: flex;
  justify-content: flex-end;
`;
const KanbanKanbanHeaderBottomSectionFirstHalfDateIconWrapper = styled.div`
  width: 12px;
  height: 12px;
`;
const KanbanKanbanHeaderBottomSectionFirstHalfDateIcon = styled.img``;
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
const BUttonGroupLogo = styled.img`
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
const NewTaskButtonIcon = styled.img``;
const NewTaskButtonLabel = styled.span`
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
  margin-left: 6px;
`;
const ThreeDotVerticalIcon = styled.img`
  height: 14.75px;
  margin-left: 25px;
  margin-top: 3px;
`;

// ThreeDotVerticalIcon
function HeaderButtons({ label, icon }: any) {
  return (
    <ButtonGroup>
      <BUttonGroupLogo src={`/images/other/${icon}.svg`} alt="#" />
      <ButtonGroupLabel>{label}</ButtonGroupLabel>
    </ButtonGroup>
  );
}
function KanbanUI() {
  const [date, setDate] = useState<String>('');
  useEffect(() => setDate('13 June 2022'), []);
  return (
    <KanbanSection>
      <KanbanHeader>
        <div>
          <KanbanBoardHeading>
            <KanbanBoardHeadingLogoWrap>
              <KanbanBoardHeadingLogo
                src="/images/other/HeadingLogo.svg"
                alt="#"
              />
            </KanbanBoardHeadingLogoWrap>
            <KanbanBoardHeadingText>Kabuni</KanbanBoardHeadingText>
          </KanbanBoardHeading>
          <KanbanBoardHeadingSecondarySection>
            <KanbanBoardSecondaryHeadingText>
              Make note of any appointments or meetings.
            </KanbanBoardSecondaryHeadingText>
          </KanbanBoardHeadingSecondarySection>
        </div>
        <KanbanHeaderBottomSection>
          <KanbanHeaderBottomSectionFirstHalf>
            <KanbanKanbanHeaderBottomSectionFirstHalfDateIconWrapper>
              <KanbanKanbanHeaderBottomSectionFirstHalfDateIcon
                src="/images/other/DateIcon.svg"
                alt="#"
              />
            </KanbanKanbanHeaderBottomSectionFirstHalfDateIconWrapper>
            <KanbanKanbanHeaderBottomSectionFirstHalfDate>
              {date}
            </KanbanKanbanHeaderBottomSectionFirstHalfDate>
          </KanbanHeaderBottomSectionFirstHalf>
          <KanbanHeaderBottomSectionSecondHalf>
            <HeaderButtons label="Search" icon="SearchIcon" />
            <HeaderButtons label="Sort" icon="SortIcon" />
            <HeaderButtons label="Group By" icon="GroupByIcon" />
            <HeaderButtons label="Views" icon="ViewIcon" />
            <NewTaskButtonWrap>
              <NewTaskButtonIconWrap>
                <NewTaskButtonIcon
                  src="/images/other/NewPlusIcon.svg"
                  alt="#"
                />
              </NewTaskButtonIconWrap>
              <NewTaskButtonLabel>New Task</NewTaskButtonLabel>
            </NewTaskButtonWrap>
            <ThreeDotVerticalIcon
              src="/images/other/ThreeDotVerticalIcon.svg"
              alt="#"
            />
          </KanbanHeaderBottomSectionSecondHalf>
        </KanbanHeaderBottomSection>
      </KanbanHeader>
      <Kanban />
    </KanbanSection>
  );
}
export default KanbanUI;
