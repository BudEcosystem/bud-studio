/* eslint-disable prettier/prettier */
import GridView from "./components/Grid";
import { useSelector} from 'react-redux';

function TableView() {
  const { workspace }: any = useSelector((state) => state);
  const { color } = workspace;
  return (
    <div>
        <div style={{paddingTop: "15px", paddingBottom: "15px", margin: "auto", width: "75vw", borderRadius: "12px", border: `1px dashed ${color}`, display: "grid", placeItems: "center"}}>
        <GridView />
      </div>
    </div>
  );
}
export default TableView;
