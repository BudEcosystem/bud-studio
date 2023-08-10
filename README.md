## Bud Studio

<p>
Making the world truly Intelligent, one fork at a time
</p>

<br>

<div align="center">

<!-- [![Build Status][github-actions-status]][github-actions-url]
[![Github Tag][github-tag-image]][github-tag-url]
[![Discord](https://badgen.net/badge/icon/discord?icon=discord&label)](https://discord.gg/Fjy3vfgy5q)

[![OpenCollective](https://opencollective.com/electron-react-boilerplate-594/backers/badge.svg)](#backers)
[![OpenCollective](https://opencollective.com/electron-react-boilerplate-594/sponsors/badge.svg)](#sponsors)
[![StackOverflow][stackoverflow-img]][stackoverflow-url] -->

</div>

## Install

Clone the repo and install dependencies:

```bash
git clone --depth 1 --branch main https://github.com/electron-react-boilerplate/electron-react-boilerplate.git your-project-name
cd your-project-name
npm install
```

**Having issues installing? See our [debugging guide](https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/400)**

## Starting Development

Start the app in the `dev` environment:

```bash
npm start
```

## Packaging for Production

To package apps for the local platform:

```bash
npm run package
```

## Docs

See our [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation)

## Community

Join our Discord: https://discord.gg/Fjy3vfgy5q

## Donations

**Donations will ensure the following:**

- 🔨 Long term maintenance of the project
- 🛣 Progress on the [roadmap](https://electron-react-boilerplate.js.org/docs/roadmap)
- 🐛 Quick responses to bug reports and help requests

## Backers

## Maintainers

- [Amila Welihinda](https://github.com/amilajack)
- [John Tran](https://github.com/jooohhn)
- [C. T. Lin](https://github.com/chentsulin)
- [Jhen-Jie Hong](https://github.com/jhen0409)

## License

MIT © [Electron React Boilerplate](https://github.com/electron-react-boilerplate)

[github-actions-status]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/workflows/Test/badge.svg
[github-actions-url]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/actions
[github-tag-image]: https://img.shields.io/github/tag/electron-react-boilerplate/electron-react-boilerplate.svg?label=version
[github-tag-url]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/releases/latest
[stackoverflow-img]: https://img.shields.io/badge/stackoverflow-electron_react_boilerplate-blue.svg
[stackoverflow-url]: https://stackoverflow.com/questions/tagged/electron-react-boilerplate

## SHORTCUT LISTS

### GENERAL

Dashboard : Ctrl + N
Main Search : Ctrl + F
Favourites: Ctrl + L (Current Workspace gets favourited)
New Workspace : Ctrl + N (COLLISION WITH DASHBOARD)
Workspace Flyout Menu : Ctrl + Alt + index number (of that workspace, starts from 0 for private)
Launcher: Ctrl + L
OmniSearch : Ctrl + O
Mini Searches (in flyout menus) : Ctrl + S
Group By : Ctrl + G

### OMNISEARCH

OmniSearch Scroll through : Up & Down Arrows
New Task in Omni Search : Ctrl + T
Reload in OmniSearch : Ctrl + L
Add new member (omnisearch) : Ctrl + M

### EDITOR

/ (in editor) : Editor Block
@ in editor: Bud Menu

### TASKVIEW

/ : for commands
@ : Ask Bud anything

## SHORTCUTS COULD BE ADDED FOR:

Sort By: ??
Views: ??
Collapse Sidebar: ??
Notifications: ??
Adding new task / columns in each database: ??
Milestone sliding: ??
Add Cover (For databases): ??
Share: ??
View Mode: ??

## KANBAN MODULE

### files

- path : `src/Database/KanbanNew`
- entry point : `src/Database/KanbanNew/index.tsx`

### file structure

- [KanbanNew](#kanban-module)
  - [Components / folder](#components)
    - [FilterComponent / folder]()
      - [Components]()
        - [CustomDropDown.tsx / file](#custom-drop-down)
        - [PopOver.tsx / file](#popover)
      - [DropdownData /folder]()
      - [index.tsx / file]()
    - [SortComponent / folder]()
      - [Components]()
        - [CustomDropDown.tsx / file]()
        - [PopOver.tsx / file]()
      - [DropdownData /folder]()
      - [index.tsx / file]()
    - [SVGs / folder]()
    - [column.tsx / file](#kanban-column)
    - [Kanban.css / file]()
    - [RightClickMenu / file]()
    - [tasks.tsx / file](#kanban-task)
  - [Data / folder](#data)
  - [Styled components / folder](#styled-components)
  - [Index.tsx / file ](#index---entry-point)
  - [KanbanBoard.tsx / file ](#kanban-board)

### index - entry point

> In this file we are checking whether there's an entry inside database slice so that we can render that particular document details with using kanban board or we can display a fresh kanban board here

Slice name - `database`

> in this file we are also showing how much number of doc's are we displaying this particular section

Component Used

```
      <Kanban
        dbId={id}
        showSubtask={showSubtask}
        setShowSubtask={setShowSubtask}
        setTaskCount={setTaskCount}
        taskCount={taskCount}
      />
```

<details>
<summary>
Props passed
</summary>

- [dbId - database Id]()
- [ showSubtask - function]()
- [setShowSubtask - callback function]()
- [setTaskCount - callback function]()
- [taskCount - task count calculated ]()
</details>

### Kanban Board

> as we can see we have used `react-beautiful-dnd` package by `atlassian` for implementing this kanban board

> refer this tutorial for more implementation details of `react-beautiful-dnd`

```
https://egghead.io/courses/beautiful-and-accessible-drag-and-drop-with-react-beautiful-dnd
```

> for styling we are using `styled-components` through out the component

for implementing filter functionalit we have used [kanban-filter](#kanban-filter) component

<details>
<summary>
Props passed
</summary>

- [filterRules]()
- [callBackOnNewFilter - callback function]()
- [filterType - if it is chain or group]()
</details>

for implementing sort functionality we have used [kanban-Sort](#kanban-sort) component

<details>
<summary>
Props passed
</summary>

- [sortRules]()
- [callBackOnNewFilter - callback function]()
- [filterType - if it is chain or group]()
</details>

### Kanban Filter

> This particular component is used to handle the filter operations that are taking place through out the UI
> CRUD operations such as adding new filter ,adding a group of filters those kind of things are happening inside this UI

- entry point : `src/components/Database/KanbanNew/components/FilterComponent/index.tsx`
  >

#### functions

<details>
<summary>
Determine Icons
</summary>

> used to determine which icons to show related to type of data is selected to filter

```
switch (tag) {
      case 'Assign':
        return <AssignIcon style={{ marginLeft: '9px' }} />;
      case 'Name':
        return <SelectorChar style={{ marginLeft: '9px' }} />;
      case 'Priority':
        return <PriorityIcon style={{ marginLeft: '9px' }} />;
      case 'Status':
        return <STatusIcon style={{ marginLeft: '9px' }} />;
      default:
        return <SelectorChar style={{ marginLeft: '9px' }} />;
    }
```

</details>

<details>
<summary>
Add new conditions to chain
</summary>

> used to add new filter conditions to the chain or group array

```
  const addNewConditionToChain = (value: string) => {
    const copyOfFilterRules = Array.from(filterRules);
    const filterRuleObject = {
      key: value,
      query: '',
      op: 'is',
      condition: null,
    };
    copyOfFilterRules.push(filterRuleObject);
    callBackOnNewFilter(copyOfFilterRules);
  };
```

</details>

<details>
<summary>
Render Add new Drop down
</summary>

> used to determine which all filter types are remaining to show when we click on Add new button for filter
> please not that if you are making any changes in filter items do make changes here also

```
  const renderAddNewDropDown = () => {
    const filterRulesKeys = filterRules.map((data: any) => data.key);
    let displayFlag =
      [
        { value: 'Assign', label: 'Assign' },
        { value: 'Name', label: 'Name' },
        { value: 'Priority', label: 'Priority' },
        { value: 'Status', label: 'Status' },
      ].filter((eachSet) => !filterRulesKeys.includes(eachSet.value)).length >
      0;
    return (
      <AddNewWrapper>
        {displayFlag && (
          <Select
            bordered={false}
            suffixIcon={<PlusOutlined rev={undefined} />}
            popupClassName="condition-key-select"
            defaultValue="Add New"
            value="Add New"
            showArrow
            dropdownRender={(menu) => CustomDropDown({ menu, test: true })}
            onSelect={(value) => addNewConditionToChain(value)}
            options={[
              { value: 'Assign', label: 'Assign' },
              { value: 'Name', label: 'Name' },
              { value: 'Priority', label: 'Priority' },
              { value: 'Status', label: 'Status' },
            ]
              .filter((eachSet) => !filterRulesKeys.includes(eachSet.value))
              .map((data) => {
                return {
                  value: data.value,
                  label: (
                    <div
                      // onKeyDown={addNewConditionToChain(data.label)}
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          width: '30px',
                        }}
                      >
                        {deterMineIcons(data.label)}
                      </div>
                      <span>{data.label}</span>
                    </div>
                  ),
                };
              })}
          />
        )}
      </AddNewWrapper>
    );
  };
```

</details>

#### components used

##### Custom Drop down

> this UI component is used to display extra UI components such as add group etc

- entry point : `src/components/Database/KanbanNew/components/FilterComponent/Components/CustomDropDown.tsx`

##### PopOver

> this UI compoent is used to show different filter popups based on the type of filter whether it is `chain ` or `group`

- entry point:`src/components/Database/KanbanNew/components/FilterComponent/Components/PopOver.tsx`

### Kanban Sort

> This particular component is used to handle the sort operations that are taking place through out the UI
> CRUD operations such as adding new sort ,adding a group of sort those kind of things are happening inside this UI

- entry point : `src/components/Database/KanbanNew/components/SortComponent/index.tsx`
  >

#### functions

<details>
<summary>
Determine Icons
</summary>

> used to determine which icons to show related to type of data is selected to filter

```
switch (tag) {
      case 'Assign':
        return <AssignIcon style={{ marginLeft: '9px' }} />;
      case 'Name':
        return <SelectorChar style={{ marginLeft: '9px' }} />;
      case 'Priority':
        return <PriorityIcon style={{ marginLeft: '9px' }} />;
      case 'Status':
        return <STatusIcon style={{ marginLeft: '9px' }} />;
      default:
        return <SelectorChar style={{ marginLeft: '9px' }} />;
    }
```

</details>
#### components used

##### Custom Drop down

> this UI component is used to display extra UI components such as add group etc

- entry point : `src/components/Database/KanbanNew/components/SortComponent/Components/CustomDropDown.tsx`

##### PopOver

> this UI compoent is used to show different sort popups based on the type of sort whether it is `chain ` or `group`

- entry point:`src/components/Database/KanbanNew/components/SortComponent/Components/PopOver.tsx`

```

```

### Kanban Column

> In this component listing and grouping of doc's based on the status of the particular doc is happening
> we can add new Documents right from the current column which will add new doc with that particular status

> also the logic for sort and filter is happening in the same component's useEffect

- entry point : `src/components/Database/KanbanNew/components/column.tsx`

- reux slices used in this component - `workspace` [ src/redux/slices/workspace.tsx ]

> filterRules are fetched from the props passed from Kanban Component and that array is processed to create
> arrays containing WHERE conditions,AND conditions and OR conditions using a useEffect hook using this code block given below

```
useEffect(() => {
   if (filterRules.length > 0) {
   const filterRulesWhere = filterRules.filter(
   (data: any) => data.condition === null);
   setFilterRulesWhere(filterRulesWhere);
   const filterRulesAnd = filterRules.filter(
   (data: any) => data.condition === 'and');
    setFilterRulesAnd(filterRulesAnd);
    const filterRulesOr = filterRules.filter(
    (data: any) => data.condition === 'or');
    setFilterRulesOr(filterRulesOr);
    }
    else if (filterRules.length === 0) {
        setFilterRulesAnd([]);
        setFilterRulesOr([]);
        setFilterRulesWhere([]);
    }
}, [filterRules]);

```

> in the next UseEffect hook provided we are processing the column data and also doing the filter and sort functionality for the same

#### actions used

##### addNewWorkSpaceDocument

> this action is used to create new document to the particular status provided

##### triggerDefaultNewTask

> this action is used to create a default document when the user tries to create a doc and then clicks `ESC` key

### Kanban Task

> This particular component is used to display the Doc section for each column available

<details>
<summary>
props passed
</summary>
    key={mappedTask.id} task={mappedTask}
</details>
