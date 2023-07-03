import {
  CustomCell,
  ProvideEditorCallback,
  CustomRenderer,
  getMiddleCenterBias,
  useTheme,
  GridCellKind,
} from '@glideapps/glide-data-grid';
import * as React from 'react';
import Select, { MenuProps, components } from 'react-select';

interface CustomMenuProps extends MenuProps<any> {}

const CustomMenu: React.FC<CustomMenuProps> = (p) => {
  const { Menu } = components;
  const { children, ...rest } = p;
  return <Menu {...rest}>{children}</Menu>;
};

interface PriorityCellProps {
  readonly kind: 'dropdown-cell';
  readonly value: string;
  readonly allowedValues: readonly string[];
  readonly readonly?: boolean;
}

export type PriorityCell = CustomCell<PriorityCellProps>;

// const Wrap = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: stretch;
//
//   .glide-select {
//     font-family: var(--gdg-font-family);
//     font-size: var(--gdg-editor-font-size);
//   }
// `;

// const PortalWrap = styled.div`
//   font-family: var(--gdg-font-family);
//   font-size: var(--gdg-editor-font-size);
//   color: var(--gdg-text-dark);
//
//   > div {
//     border-radius: 4px;
//     border: 1px solid var(--gdg-border-color);
//   }
// `;

const Editor: ReturnType<ProvideEditorCallback<PriorityCell>> = (p) => {
  const { value: cell, onFinishedEditing, initialValue } = p;
  const { allowedValues, value: valueIn } = cell.data;

  const [value, setValue] = React.useState(valueIn);
  const [inputValue, setInputValue] = React.useState(initialValue ?? '');

  const theme = useTheme();

  const values = React.useMemo(
    () =>
      allowedValues.map((x) => ({
        value: x,
        label: x,
      })),
    [allowedValues]
  );

  const { Option } = components;
  function IconOption(props) {
    return (
      <Option {...props}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ marginTop: '3px' }}>
            <svg
              width="12"
              height="17"
              viewBox="0 0 12 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="Vector"
                d="M11.9288 8.32337L10.0637 4.32082L11.944 0.68738C12.0193 0.541494 12.0134 0.366692 11.9279 0.226193C11.8424 0.0858247 11.6899 0.000131302 11.5255 0.000131302L0.471046 0C0.210813 0 0 0.210813 0 0.471046V15.78C0 16.0403 0.210813 16.2511 0.471046 16.2511C0.731278 16.2511 0.942092 16.0403 0.942092 15.78V9.04408H11.5251C11.5266 9.04421 11.528 9.04421 11.529 9.04408C11.7892 9.04408 12 8.83326 12 8.57303C12 8.48129 11.974 8.396 11.9288 8.32358L11.9288 8.32337ZM0.942043 8.10165V0.941752H10.7512L9.12031 4.09345C9.05341 4.22304 9.04999 4.37642 9.11176 4.50878L10.7861 8.10185L0.942043 8.10165Z"
                fill="#E14F21"
              />
            </svg>
          </div>
          <div
            style={{
              marginLeft: '5px',
              color: '#fff',
              fontFamily: 'Noto Sans',
              fontSize: '14px',
              fontWeight: '400',
              cursor: 'pointer',
            }}
          >
            {props.data.label}
          </div>
        </div>
      </Option>
    );
  }

  return (
    <div>
      <Select
        className="glide-select"
        inputValue={inputValue}
        onInputChange={setInputValue}
        menuPlacement="auto"
        value={values.find((x) => x.value === value)}
        styles={{
          control: (base) => ({
            ...base,
            border: 0,
            boxShadow: 'none',
            fontFamily: 'Nano Sans',
          }),
        }}
        theme={(t) => {
          return {
            ...t,
            colors: {
              ...t.colors,
              neutral0: theme.bgCell, // this is both the background color AND the fg color of
              // the selected item because of course it is.
              neutral5: theme.bgCell,
              neutral10: theme.bgCell,
              neutral20: theme.bgCellMedium,
              neutral30: theme.bgCellMedium,
              neutral40: theme.bgCellMedium,
              neutral50: theme.textLight,
              neutral60: theme.textMedium,
              neutral70: theme.textMedium,
              neutral80: theme.textDark,
              neutral90: theme.textDark,
              neutral100: theme.textDark,
              primary: theme.accentColor,
              primary75: theme.accentColor,
              primary50: theme.accentColor,
              primary25: theme.accentLight, // prelight color
            },
          };
        }}
        menuPortalTarget={document.getElementById('portal')}
        autoFocus
        openMenuOnFocus
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
          Option: IconOption,
          Menu: (props) => (
            <div>
              <CustomMenu className="click-outside-ignore" {...props} />
            </div>
          ),
        }}
        options={values}
        onChange={async (e) => {
          if (e === null) return;
          setValue(e.value);
          await new Promise((r) => window.requestAnimationFrame(r));
          onFinishedEditing({
            ...cell,
            data: {
              ...cell.data,
              value: e.value,
            },
          });
        }}
      />
    </div>
  );
};

const renderer: CustomRenderer<PriorityCell> = {
  kind: GridCellKind.Custom,
  isMatch: (c): c is PriorityCell => (c.data as any).kind === 'priority-cell',
  draw: (args, cell) => {
    const { ctx, theme, rect } = args;
    const { value } = cell.data;
    ctx.fillStyle = theme.textDark;
    ctx.fillText(
      value,
      rect.x + theme.cellHorizontalPadding,
      rect.y + rect.height / 2 + getMiddleCenterBias(ctx, theme)
    );

    return true;
  },
  provideEditor: () => ({
    editor: Editor,
    disablePadding: true,
    deletedValue: (v) => ({
      ...v,
      copyData: '',
      data: {
        ...v.data,
        value: '',
      },
    }),
  }),
  onPaste: (v, d) => ({
    ...d,
    value: d.allowedValues.includes(v) ? v : d.value,
  }),
};

export default renderer;
