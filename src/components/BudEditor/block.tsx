/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import Header from './Blocks/Header';
import Kanban from './Blocks/Kanban';
import Paragraph from './Blocks/Paragraph';

function Block({ data, handleChange, handleKeyDown }) {
  return (
    <>
      {data.type === 'header' && (
        <Header
          data={data}
          handleChange={handleChange}
          handleKeyDown={handleKeyDown}
        />
      )}

      {data.type === 'paragraph' && (
        <Paragraph
          data={data}
          handleChange={handleChange}
          handleKeyDown={handleKeyDown}
        />
      )}

      {data.type === 'kanban' && (
        <Kanban
          data={data}
          handleChange={handleChange}
          handleKeyDown={handleKeyDown}
        />
      )}
    </>
  );
}


export default Block;
