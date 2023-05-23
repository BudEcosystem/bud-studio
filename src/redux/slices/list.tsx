/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const generateInitialState = (): any => {
  const panelArray = [
    {
      status: 'todo',
      headerText: 'To-do',
      colorIcon: '#939AFF',
      items: [
        {
          title: 'Check for meetings 1',
          description:
            'Make note of any appointments or meetings that you have scheduled for the day and ensure that you have the necessary information and materials.',
          siconValue: 2,
          checklist: {
            checked: 2,
            total: 6,
          },
          childs: [
            {
              title: 'Check for sub-meetings 1',
              description: '',
              siconValue: 2,
              checklist: {
                checked: 2,
                total: 6,
              },
            },
            {
              title: 'Check for sub-meetings 2',
              description: '',
              siconValue: 2,
              checklist: {
                checked: 2,
                total: 6,
              },
            },
          ],
        },
        {
          title: 'Check for meetings 2',
          description:
            'Make note of any appointments or meetings that you have scheduled for the day and ensure that you have the necessary information and materials.',
          siconValue: 1,
          checklist: {
            checked: 4,
            total: 6,
          },
          childs: [],
        },
        {
          title: 'Check for meetings 3',
          description:
            'Make note of any appointments or meetings that you have scheduled for the day and ensure that you have the necessary information and materials.',
          siconValue: 3,
          checklist: {
            checked: 3,
            total: 6,
          },
          childs: [],
        }
      ],
    },
    {
      status: 'inprogress',
      headerText: 'In-progress',
      colorIcon: '#FFD976',
      items: [
        {
          title: 'In progress meetings 1',
          description:
            'Make note of any appointments or meetings that you have scheduled for the day and ensure that you have the necessary information and materials.',
          siconValue: 2,
          checklist: {
            checked: 2,
            total: 6,
          },
          childs: [
            {
              title: 'In progress sub-meetings 1',
              description: '',
              siconValue: 2,
              checklist: {
                checked: 2,
                total: 6,
              },
            },
            {
              title: 'In progress sub-meetings 2',
              description: '',
              siconValue: 2,
              checklist: {
                checked: 2,
                total: 6,
              },
            },
          ],
        },
        {
          title: 'In progress meetings 2',
          description:
            'Make note of any appointments or meetings that you have scheduled for the day and ensure that you have the necessary information and materials.',
          siconValue: 1,
          checklist: {
            checked: 4,
            total: 6,
          },
          childs: [],
        },
        {
          title: 'In progress meetings 3',
          description:
            'Make note of any appointments or meetings that you have scheduled for the day and ensure that you have the necessary information and materials.',
          siconValue: 3,
          checklist: {
            checked: 3,
            total: 6,
          },
          childs: [],
        }
      ],
    },
    {
      status: 'inreview',
      headerText: 'In-review',
      colorIcon: '#4184E9',
      items: [
        {
          title: 'In-review meetings 1',
          description:
            'Make note of any appointments or meetings that you have scheduled for the day and ensure that you have the necessary information and materials.',
          siconValue: 2,
          checklist: {
            checked: 2,
            total: 6,
          },
          childs: [
            {
              title: 'In-review sub-meetings 1',
              description: '',
              siconValue: 2,
              checklist: {
                checked: 2,
                total: 6,
              },
            },
            {
              title: 'In-review sub-meetings 2',
              description: '',
              siconValue: 2,
              checklist: {
                checked: 2,
                total: 6,
              },
            },
          ],
        },
        {
          title: 'In-review meetings 2',
          description:
            'Make note of any appointments or meetings that you have scheduled for the day and ensure that you have the necessary information and materials.',
          siconValue: 1,
          checklist: {
            checked: 4,
            total: 6,
          },
          childs: [],
        },
        {
          title: 'In-review meetings 3',
          description:
            'Make note of any appointments or meetings that you have scheduled for the day and ensure that you have the necessary information and materials.',
          siconValue: 3,
          checklist: {
            checked: 3,
            total: 6,
          },
          childs: [],
        }
      ],
    },
    {
      status: 'completed',
      headerText: 'Completed',
      colorIcon: '#36D95A',
      items: [
        {
          title: 'Completed meetings 1',
          description:
            'Make note of any appointments or meetings that you have scheduled for the day and ensure that you have the necessary information and materials.',
          siconValue: 2,
          checklist: {
            checked: 2,
            total: 6,
          },
          childs: [
            {
              title: 'Completed sub-meetings 1',
              description: '',
              siconValue: 2,
              checklist: {
                checked: 2,
                total: 6,
              },
            },
            {
              title: 'Completed sub-meetings 2',
              description: '',
              siconValue: 2,
              checklist: {
                checked: 2,
                total: 6,
              },
            },
          ],
        },
        {
          title: 'Completed meetings 2',
          description:
            'Make note of any appointments or meetings that you have scheduled for the day and ensure that you have the necessary information and materials.',
          siconValue: 1,
          checklist: {
            checked: 4,
            total: 6,
          },
          childs: [],
        },
        {
          title: 'Completed meetings 3',
          description:
            'Make note of any appointments or meetings that you have scheduled for the day and ensure that you have the necessary information and materials.',
          siconValue: 3,
          checklist: {
            checked: 3,
            total: 6,
          },
          childs: [],
        }
      ],
    },
  ];

  const newTaskClicked = false
  const initialData = {
    panelArray,
    newTaskClicked
  };
  return initialData;
};

export const listSlice = createSlice({
  name: 'list',
  initialState: generateInitialState,
  reducers: {
    setNewTaskClicked: (state, action: PayloadAction<any>) => {
      state.newTaskClicked = action.payload
    },
    createNewTask: (state, action: PayloadAction<any>) => {
      state.newTaskClicked = action.payload
    },
  },
});

export const { setNewTaskClicked, createNewTask } = listSlice.actions;
export default listSlice.reducer;
