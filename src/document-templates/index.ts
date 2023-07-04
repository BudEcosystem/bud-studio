import { v4 as uuid4 } from 'uuid';

// generates new document template
const newDocTemplate = ({ name = 'untitled' }) => {
  const docID = uuid4();

  return {
    uuid: docID,
    name,
    childOf: null,
  };
};
