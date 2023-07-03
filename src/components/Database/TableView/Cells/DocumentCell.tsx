import {
  CustomCell,
  measureTextCached,
  CustomRenderer,
  getMiddleCenterBias,
  GridCellKind,
  blend,
} from '@glideapps/glide-data-grid';

interface DocumentCellProps {
  readonly kind: 'document-cell';
  readonly title: string;
  readonly uuid: string;
  readonly onOpenClick: () => void;
}

export type DocumentCell = CustomCell<DocumentCellProps>;

const renderer: CustomRenderer<DocumentCell> = {
  kind: GridCellKind.Custom,
  isMatch: (cell: CustomCell): cell is DocumentCell =>
    (cell.data as any).kind === 'document-cell',
  onClick: (e) => {
    console.log(e);
    return undefined;
  },
  draw: (args, cell) => {
    const { ctx, rect, theme, col, row, imageLoader } = args;

    ctx.font = `${theme.baseFontStyle} ${theme.fontFamily}`;
    ctx.fillStyle = theme.textDark;

    const xPad = theme.cellHorizontalPadding;

    const radius = Math.min(12, rect.height / 2 - theme.cellVerticalPadding);

    const drawX = rect.x + xPad;

    ctx.save();
    ctx.font = `${theme.baseFontStyle} ${theme.fontFamily}`;
    ctx.fillStyle = theme.textDark;
    ctx.fillText(
      cell.data.title,
      drawX,
      rect.y + rect.height / 2 + getMiddleCenterBias(ctx, theme)
    );

    const tWidth = ctx.measureText(cell.data.title).width;

    const imageResult = imageLoader.loadOrGetImage(
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' fill='none' xmlns:v='https://vecta.io/nano'%3E%3Cpath d='M7.157 1a.5.5 0 0 0-.5-.5h-4.5a.5.5 0 0 0 0 1h4v4a.5.5 0 1 0 1 0V1zM1.354 7.01L7.01 1.353 6.303.646.646 6.303l.707.707z' fill='%23939aff'/%3E%3C/svg%3E",
      col,
      row
    );
    if (imageResult !== undefined) {
      ctx.save();
      ctx.beginPath();
      ctx.drawImage(
        imageResult,
        drawX + tWidth + 6,
        rect.y + rect.height / 2 + getMiddleCenterBias(ctx, theme) - 4,
        10,
        10
      );

      ctx.restore();
    }

    ctx.restore();

    return true;
  },
  provideEditor: () => (p) => {
    const { value, onChange } = p;
    const { title, onOpenClick } = value.data;

    return (
      <div
        style={{
          width: '200px',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          alignContent: 'space-around',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '30px',
          color: '#fff',
        }}
        onClick={onOpenClick}
      >
        {title}{' '}
        <div style={{ cursor: 'pointer', color: '#939aff' }}>
          Open
          <svg
            style={{ marginLeft: '3px' }}
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            fill="none"
            xmlns:v="https://vecta.io/nano"
          >
            <path
              d="M7.157 1a.5.5 0 0 0-.5-.5h-4.5a.5.5 0 0 0 0 1h4v4a.5.5 0 1 0 1 0V1zM1.354 7.01L7.01 1.353 6.303.646.646 6.303l.707.707z"
              fill="#939aff"
            />
          </svg>
        </div>
      </div>
    );
  },
  onPaste: (_v, d) => d,
};

export default renderer;
