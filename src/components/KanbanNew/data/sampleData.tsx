export const getItems = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: k,
    title: `item ${k}`,
    color: ["#32a852","#c4c4c4","#542b2b"][k] 
  }));

  export const getListItems = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: k,
    title: `draggableChild ${k}`,
    color: ["#32a852","#c4c4c4","#542b2b"][k%3] 
  }));

  

