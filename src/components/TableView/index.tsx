/* eslint-disable prettier/prettier */
import HeaderSection from 'components/ListView/HeaderSection';
import GridView from './components/Grid';
import { useSelector } from 'react-redux';

function TableView() {
  const { workspace }: any = useSelector((state) => state);
  const { color } = workspace;
  return (
    <div>
      <HeaderSection view={undefined} updateCurrentTitle={() => {}} />
      <div
        style={{
          paddingTop: '15px',
          paddingBottom: '15px',
          marginLeft: '36px',
          marginRight: '33px',
          // width: '100',
          borderRadius: '12px',
          border: `1px dashed ${color}`,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <GridView />
      </div>
    </div>
  );
}
export default TableView;
