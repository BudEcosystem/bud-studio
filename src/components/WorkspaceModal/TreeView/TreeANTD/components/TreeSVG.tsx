/* eslint-disable import/prefer-default-export */
export function FolderIcon({ style }: any) {
  return (
    <svg
      style={style}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={style?.color}
        d="M0.500109 1.58565L0.500026 3.22033L7.20936 3.22034L5.73531 1.38824C5.67552 1.31393 5.58529 1.27072 5.48992 1.27072H0.815057C0.641123 1.27072 0.500118 1.41171 0.500109 1.58565Z"
      />
      <mask id="path-2-inside-1_3213_6967" fill="white">
        <path
          fill={style?.color}
          d="M0 3.72034H11.1851C11.6351 3.72034 12 4.0852 12 4.53529V10.4143C12 10.8644 11.6351 11.2293 11.1851 11.2293H0.814948C0.364865 11.2293 0 10.8644 0 10.4143V3.72034Z"
        />
      </mask>
      <path
        fill={style?.color}
        d="M0 3.72034H11.1851C11.6351 3.72034 12 4.0852 12 4.53529V10.4143C12 10.8644 11.6351 11.2293 11.1851 11.2293H0.814948C0.364865 11.2293 0 10.8644 0 10.4143V3.72034Z"
        // stroke="#8A8EE9"
        // strokeWidth="2"
        // mask="url(#path-2-inside-1_3213_6967)"
      />
    </svg>
  );
}

export function FileIcon({ style }: any) {
  return (
    <svg
      style={style}
      width="12"
      height="14"
      viewBox="0 0 12 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={style?.color}
        d="M6.97573 0.5H2.74121C1.50343 0.5 0.5 1.50343 0.5 2.74121V11.2588C0.5 12.4966 1.50343 13.5 2.74121 13.5H9.22092C10.4587 13.5 11.4621 12.4966 11.4621 11.2588V4.90909C11.4621 4.30107 11.2151 3.71914 10.7777 3.2968L8.5325 1.12892C8.11467 0.725479 7.55654 0.5 6.97573 0.5Z"
        stroke="#C6C6C6"
      />
      <path
        fill={style?.color}
        d="M7.32422 1.15039V2.70252C7.32422 3.66417 8.10379 4.44374 9.06543 4.44374H10.6775"
        stroke="#C6C6C6"
      />
      <path
        fill={style?.color}
        d="M7.32412 10.6616L3.10352 10.6616"
        stroke="#C6C6C6"
        stroke-linecap="round"
      />
      <path
        fill={style?.color}
        d="M3.10406 8.67456L5.46387 8.67456"
        stroke="#C6C6C6"
        stroke-linecap="round"
      />
    </svg>
  );
}
