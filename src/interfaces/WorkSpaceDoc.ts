interface WorkSpaceDoc {
  name: string;
  childOf: null | string;
  workSpaceId: string;
  type: string;
  uuid: string;
  workSpaceUUID: string;
  properties: any[]; // Replace 'any' with the appropriate type for properties
}

export default WorkSpaceDoc;
