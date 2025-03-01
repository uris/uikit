import { useTheme } from 'styled-components';
import React, { useMemo } from 'react';

type Icon = {
  name: string;
  line?: any;
  lineOn?: any;
};

export enum Icons {
  home = 'home',
  inbox = 'inbox',
  sparkle = 'sparkle',
  people = 'people',
  wallet = 'wallet',
  invoice = 'invoice',
  payment = 'payment',
  heart = 'heart',
  clock = 'clock',
  book = 'book',
  search = 'search',
  filter = 'filter',
  more = 'more',
  unchecked = 'unchecked',
  checked = 'checked',
  partial = 'partial',
  chevronDown = 'chevron down',
  chevronUp = 'chevron up',
  plus = 'plus',
  plusCircle = 'plus circle',
  x = 'x',
  gpAssist = 'g-p assist',
  upload = 'upload',
  download = 'download',
  share = 'share',
  checkCircle = 'check circle',
  person = 'person',
  ctrlKey = 'ctrl key',
  commandKey = 'cmd key',
  gKey = 'g key',
  attach = 'attach',
  menu = 'menu',
  help = 'help',
  blank = 'blank',
  check = 'check',
  message = 'message',
  info = 'info',
  alert = 'alert',
  notification = 'notification',
  arrowUp = 'arrow up',
  arrowLeft = 'arrow left',
  arrowRight = 'arrow right',
  gpMark = 'gpMark',
  navigate = 'navigate',
  document = 'document',
  refresh = 'refresh',
  recentChats = 'recent chats',
  trashBin = 'trash bin',
  dollar = 'dollar',
  apple = 'apple',
  view = 'view',
  openCircle = 'open circle',
  expanded = 'expanded',
  concise = 'concise',
  moderate = 'moderate',
  mail = 'mail',
  textDocument = 'text document',
  complianceCheck = 'compliance check',
  edit = 'edit',
  characterBeam = 'character beam',
  undo = 'undo',
  chat = 'chat',
  exclamation = 'exclamation',
  chart = 'chart',
  lightBulb = 'light bulb',
  settings = 'settings',
  documentEditor = 'document editor',
  chartArrow = 'chart arrow',
  focus = 'focus',
  briefcase = 'briefcase',
  globeLocation = 'globe location',
  barChart = 'bar chart',
  fontSmaller = 'font smaller',
  fontLarger = 'font larger',
  copy = 'copy',
  stop = 'stop',
  like = 'like',
  unlike = 'unlike',
  bold = 'bold',
  italic = 'italic',
  underline = 'underline',
  strike = 'strike',
  bulletList = 'bullet list',
  numberedList = 'numbered list',
  sink = 'sink',
  lift = 'lift',
  code = 'code',
  taskList = 'task list',
  hilight = 'hilight',
  chevronLeft = 'chevron left',
  chevronRight = 'chevron right',
  text = 'text',
  link = 'link',
  googleDrive = 'google drive',
  drive = 'drive',
  return = 'return',
  insert = 'insert',
}

export interface IconProps {
  name?: string | Icons;
  size?: number;
  stroke?: number;
  strokeColor?: string;
  accentColor?: string;
  fillColor?: string;
  type?: 'line' | 'dualtone';
  toggle?: boolean;
  pointer?: boolean;
  theme?: any;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
}

export function UIIcon(props: IconProps) {
  const theme = useTheme();
  const {
    name = 'home',
    size = 20,
    stroke = 1.5,
    strokeColor = theme.lyraColors['core-icon-primary'],
    fillColor = 'transparent',
    toggle = false,
    pointer = true,
    disabled = false,
    onClick = () => null,
  } = props;

  const opacity = disabled ? 0.5 : 1;

  const GPIcons: Icon[] = useMemo(() => {
    return [
      {
        name: 'insert',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill={'none'}
          >
            <path d="M 1 1 L 19 1 L 19 19 L 1 19 Z" fill="transparent"></path>
            <path
              d="M 7.55 12.428 L 7.55 11.678 L 16.55 11.678 L 16.55 13.178 L 7.552 13.178 L 7.551 12.428 Z M 1.75 3.377 L 3.25 3.377 L 3.25 6.838 C 3.25 9.545 5.336 11.678 7.838 11.678 L 7.838 13.178 C 4.443 13.178 1.75 10.308 1.75 6.838 Z"
              fill={strokeColor}
            ></path>
            <path
              d="M 13.812 17.15 L 18.534 12.427 L 13.812 7.705 L 12.751 8.765 L 16.413 12.427 L 12.751 16.089 L 13.811 17.149 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'return',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill={'none'}
          >
            <path d="M 1 1 L 19 1 L 19 19 L 1 19 Z" fill="transparent"></path>
            <path
              d="M 18.034 6.838 C 18.034 10.308 15.341 13.178 11.946 13.178 L 11.946 11.678 C 14.448 11.678 16.534 9.545 16.534 6.838 L 16.534 3.377 L 18.034 3.377 Z M 11.946 12.428 L 11.946 11.678 L 3.124 11.678 L 3.124 13.178 L 11.944 13.178 L 11.945 12.428 Z"
              fill={strokeColor}
            ></path>
            <path
              d="M 5.972 17.15 L 1.25 12.427 L 5.972 7.705 L 7.033 8.765 L 3.371 12.427 L 7.033 16.089 L 5.973 17.149 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'drive',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill={'none'}
          >
            <g transform="translate(2 3)">
              <path
                d="M 0 8.048 L 16 8.048"
                fill="transparent"
                strokeWidth={stroke}
                stroke={strokeColor}
                strokeLinejoin="round"
                strokeDasharray=""
              ></path>
              <path
                d="M 14.171 10.705 C 14.171 11.21 13.762 11.619 13.257 11.619 C 12.752 11.619 12.343 11.21 12.343 10.705 C 12.343 10.2 12.752 9.79 13.257 9.79 C 13.762 9.79 14.171 10.2 14.171 10.705 Z"
                fill={strokeColor}
              ></path>
              <path
                d="M 13.592 14.4 L 2.4 14.4 C 1.075 14.4 0 13.325 0 12 L 0 8 L 1.886 1.71 C 2.19 0.695 3.125 0 4.185 0 L 11.807 0 C 12.867 0 13.802 0.695 14.106 1.71 L 15.992 8 L 15.992 12 C 15.992 13.325 14.917 14.4 13.592 14.4 Z"
                fill="transparent"
                strokeWidth={stroke}
                stroke={strokeColor}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray=""
              ></path>
            </g>
          </svg>
        ),
      },
      {
        name: 'google drive',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill={'none'}
          >
            <g transform="translate(1 2)">
              <path
                d="M 1.361 13.713 L 2.155 15.077 C 2.32 15.364 2.557 15.59 2.835 15.754 L 5.67 10.872 L 0 10.872 C 0 11.19 0.082 11.508 0.247 11.795 Z"
                fill="rgb(0,102,218)"
              ></path>
              <path
                d="M 9 5.128 L 6.165 0.246 C 5.887 0.41 5.649 0.636 5.485 0.923 L 0.247 9.949 C 0.086 10.23 0 10.548 0 10.872 L 5.67 10.872 Z"
                fill="rgb(0,172,71)"
              ></path>
              <path
                d="M 15.165 15.754 C 15.443 15.59 15.68 15.364 15.845 15.077 L 16.175 14.513 L 17.753 11.795 C 17.918 11.508 18 11.19 18 10.872 L 12.329 10.872 L 13.536 13.231 Z"
                fill="rgb(234,67,53)"
              ></path>
              <path
                d="M 9 5.128 L 11.835 0.246 C 11.557 0.082 11.237 0 10.907 0 L 7.093 0 C 6.763 0 6.443 0.092 6.165 0.246 Z"
                fill="rgb(0,131,45)"
              ></path>
              <path
                d="M 12.33 10.872 L 5.67 10.872 L 2.835 15.754 C 3.113 15.918 3.433 16 3.763 16 L 14.237 16 C 14.567 16 14.887 15.908 15.165 15.754 Z"
                fill="rgb(38,132,252)"
              ></path>
              <path
                d="M 15.134 5.436 L 12.515 0.923 C 12.351 0.636 12.113 0.41 11.835 0.246 L 9 5.128 L 12.33 10.872 L 17.99 10.872 C 17.99 10.554 17.907 10.236 17.742 9.949 Z"
                fill="rgb(255,186,0)"
              ></path>
            </g>
          </svg>
        ),
      },
      {
        name: 'link',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill={'none'}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.8232 3.37528C11.6782 1.52029 14.6857 1.52029 16.5407 3.37528C18.3957 5.23027 18.3957 8.23781 16.5407 10.0928L15.1265 11.507L14.0658 10.4464L15.4801 9.03214C16.7493 7.76293 16.7493 5.70515 15.4801 4.43594C14.2108 3.16674 12.1531 3.16674 10.8839 4.43594L9.46964 5.85016L8.40898 4.7895L9.8232 3.37528Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.1767 16.4568C8.32176 18.3117 5.31423 18.3117 3.45924 16.4568C1.60425 14.6018 1.60425 11.5942 3.45924 9.73924L4.87345 8.32503L5.93411 9.38569L4.5199 10.7999C3.25069 12.0691 3.25069 14.1269 4.5199 15.3961C5.7891 16.6653 7.84689 16.6653 9.11609 15.3961L10.5303 13.9819L11.591 15.0425L10.1767 16.4568Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.34832 13.6283L13.0052 7.97148L11.9445 6.91082L6.28766 12.5677L7.34832 13.6283Z"
              fill={strokeColor}
            />
          </svg>
        ),
      },
      {
        name: 'text',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill={'none'}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9 15.75V3.75H10.5V15.75H9Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3 3H16.5V5.75H15V4.5H4.5V5.75H3V3Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.75 16.5H5.75V15H13.75V16.5Z"
              fill={strokeColor}
            />
          </svg>
        ),
      },
      {
        name: 'chevron left',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill={'none'}
          >
            <path
              d="M 11.97 3.97 L 13.03 5.03 L 8.56 9.5 L 13.03 13.97 L 11.97 15.03 L 6.44 9.5 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'chevron right',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill={'none'}
          >
            <path
              d="M 8.03 15.03 L 6.97 13.97 L 11.44 9.5 L 6.97 5.03 L 8.03 3.97 L 13.56 9.5 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'task list',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill={'none'}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.53033 9.28033H19.5303V10.7803H7.53033V9.28033Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.53033 3.28033H19.5303V4.78033H7.53033V3.28033Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.53033 15.2803H19.5303V16.7803H7.53033V15.2803Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.53033 4.96967L5.5 2L6.56066 3.06066L2.53033 7.09099L0 4.56066L1.06066 3.5L2.53033 4.96967Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.53033 15.9697L5.5 13L6.56066 14.0607L2.53033 18.091L0 15.5607L1.06066 14.5L2.53033 15.9697Z"
              fill={strokeColor}
            />
          </svg>
        ),
      },
      {
        name: 'hilight',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill={'none'}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.4965 3L5.94948 7.62044L7.22685 8.92086L5.0472 11.1174L5.73239 11.8136L2 15.6063L8.23696 17.9994L10.0453 16.1958L10.7194 16.8807L12.8845 14.6807L14.069 15.8864L18.9958 10.8801L17.9267 9.82796L14.07 13.7469L8.05305 7.62142L11.5656 4.05213L10.4965 3ZM11.8333 13.6104L10.7193 14.7423L7.15608 11.1217L8.27807 9.99105L11.8333 13.6104ZM7.86628 16.2505L8.99306 15.1267L6.78469 12.8828L4.67538 15.0262L7.86628 16.2505Z"
              fill={strokeColor}
            />
          </svg>
        ),
      },
      {
        name: 'bold',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill={'none'}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 10.5H5V9H12V10.5Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 17.5H3V16H12V17.5Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.9642 6.75C13.9642 5.59915 12.8612 4.5 11.2856 4.5V3C13.4952 3 15.4642 4.58885 15.4642 6.75C15.4642 8.91115 13.4952 10.5 11.2856 10.5V9C12.8612 9 13.9642 7.90085 13.9642 6.75Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.9644 13.25C14.9644 11.8232 13.6053 10.5 11.7144 10.5V9C14.2394 9 16.4644 10.8128 16.4644 13.25C16.4644 15.6872 14.2394 17.5 11.7144 17.5V16C13.6053 16 14.9644 14.6768 14.9644 13.25Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.47607 16.75V3.75H5.97607V16.75H4.47607Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.5 4.5H3V3H11.5V4.5Z"
              fill={strokeColor}
            />
          </svg>
        ),
      },
      {
        name: 'italic',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.16961 15.4475L12.1334 3.48983L13.5187 4.06492L8.555 16.0226L7.16961 15.4475Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17 4.5H8V3H17V4.5Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13 16.5H4V15H13V16.5Z"
              fill={strokeColor}
            />
          </svg>
        ),
      },
      {
        name: 'underline',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.25 10V3H15.75V10H14.25Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.25 10V3H5.75V10H4.25Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.75 9.5C5.75 11.8525 7.64755 13.75 10 13.75C12.3525 13.75 14.25 11.8525 14.25 9.5H15.75C15.75 12.6809 13.1809 15.25 10 15.25C6.81912 15.25 4.25 12.6809 4.25 9.5H5.75Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 17.7499H4V16.2499H16V17.7499Z"
              fill={strokeColor}
            />
          </svg>
        ),
      },
      {
        name: 'strike',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9 9.75V3.75H10.5V9.75H9Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9 15.75V11.75H10.5V15.75H9Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3 3H16.5V5.75H15V4.5H4.5V5.75H3V3Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.75 16.5H5.75V15H13.75V16.5Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.75 10.5H4.75V9H14.75V10.5Z"
              fill={strokeColor}
            />
          </svg>
        ),
      },
      {
        name: 'link',
        line: (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
          >
            <path d="M 0 0 L 24 0 L 24 24 L 0 24 Z" fill="transparent"></path>
            <path
              d="M 12.251 18.425 C 15.169 18.425 17.041 16.923 17.041 14.629 C 17.041 12.8 15.925 11.834 13.323 11.219 L 11.891 10.876 C 10.106 10.445 9.35 9.9 9.35 8.924 C 9.35 7.694 10.562 6.824 12.241 6.824 C 13.753 6.824 14.834 7.509 15.265 8.722 C 15.405 9.056 15.616 9.214 15.968 9.214 C 16.425 9.214 16.706 8.951 16.706 8.511 C 16.706 8.379 16.688 8.239 16.653 8.107 C 16.26 6.507 14.501 5.4 12.242 5.4 C 9.597 5.4 7.69 6.912 7.69 9.039 C 7.69 10.77 8.78 11.781 11.17 12.343 L 12.788 12.73 C 14.616 13.17 15.381 13.767 15.381 14.822 C 15.381 16.087 14.089 17.01 12.252 17.01 C 10.626 17.01 9.404 16.263 8.956 15.015 C 8.798 14.637 8.605 14.47 8.236 14.47 C 7.761 14.47 7.471 14.76 7.471 15.217 C 7.471 15.376 7.497 15.543 7.541 15.71 C 8.007 17.37 9.835 18.425 12.252 18.425 Z"
              fill={strokeColor}
              opacity={opacity}
            ></path>
            <path
              d="M 5.36 11.75 L 19.15 11.75 C 19.352 11.75 19.51 11.592 19.51 11.39 C 19.511 11.294 19.474 11.202 19.406 11.134 C 19.338 11.066 19.246 11.029 19.15 11.03 L 5.36 11.03 C 5.264 11.029 5.172 11.066 5.104 11.134 C 5.037 11.202 4.999 11.294 5 11.39 C 5 11.592 5.158 11.75 5.36 11.75 Z"
              fill={strokeColor}
              opacity={opacity}
            ></path>
          </svg>
        ),
      },
      {
        name: 'bullet list',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4 9.25H20V10.75H4V9.25Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4 3.25H20V4.75H4V3.25Z"
              fill={strokeColor}
            />
            <path
              d="M2 4C2 4.552 1.552 5 1 5C0.448 5 0 4.552 0 4C0 3.448 0.448 3 1 3C1.552 3 2 3.448 2 4Z"
              fill={strokeColor}
            />
            <path
              d="M2 10C2 10.552 1.552 11 1 11C0.448 11 0 10.552 0 10C0 9.448 0.448 9 1 9C1.552 9 2 9.448 2 10Z"
              fill={strokeColor}
            />
            <path
              d="M2 16C2 16.552 1.552 17 1 17C0.448 17 0 16.552 0 16C0 15.448 0.448 15 1 15C1.552 15 2 15.448 2 16Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4 15.25H20V16.75H4V15.25Z"
              fill={strokeColor}
            />
          </svg>
        ),
      },
      {
        name: 'numbered list',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.00049 8.75497H20.0005V10.255H4.00049V8.75497Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.00049 2.75497H20.0005V4.25497H4.00049V2.75497Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.00049 14.755H20.0005V16.255H4.00049V14.755Z"
              fill={strokeColor}
            />
            <path
              d="M0.10078 10.9947V10.4272L1.19539 9.51502C1.19539 9.51502 1.33728 9.39339 1.37782 9.35285C1.43863 9.29204 1.47916 9.2515 1.49943 9.19069C1.5197 9.12988 1.53995 9.06907 1.53995 9.00826C1.53995 8.92718 1.53997 8.86637 1.49943 8.80555C1.45889 8.74474 1.41834 8.7042 1.35753 8.68393C1.29672 8.66366 1.23595 8.64339 1.15487 8.64339C1.07379 8.64339 1.01297 8.64339 0.952158 8.68393C0.891348 8.72447 0.850812 8.76501 0.830542 8.80555C0.810271 8.86637 0.789961 8.92718 0.789961 9.00826H0.0196814C0.0196814 8.80556 0.0602367 8.62312 0.161588 8.48123C0.262939 8.33934 0.384586 8.21772 0.567018 8.13664C0.72918 8.05556 0.9319 8.01501 1.15487 8.01501C1.37785 8.01501 1.60079 8.05556 1.76296 8.13664C1.92512 8.21772 2.06704 8.31907 2.16839 8.46096C2.26974 8.60285 2.31023 8.76501 2.31023 8.94745C2.31023 9.06907 2.28996 9.17042 2.24942 9.29204C2.20888 9.41366 2.10754 9.53528 2.00619 9.65691C1.88457 9.7988 1.70212 9.96096 1.47914 10.1434L1.19539 10.3664H2.35081V11.015H0.0805516L0.10078 10.9947Z"
              fill={strokeColor}
            />
            <path
              d="M1.20001 16.995C0.960012 16.995 0.760017 16.955 0.580017 16.875C0.400017 16.795 0.260034 16.695 0.160034 16.555C0.0600342 16.415 0 16.255 0 16.075H0.799988C0.799988 16.075 0.799985 16.175 0.859985 16.235C0.899985 16.275 0.94 16.315 1 16.335C1.06 16.355 1.12001 16.375 1.20001 16.375C1.28001 16.375 1.34002 16.375 1.40002 16.335C1.46002 16.315 1.50002 16.275 1.52002 16.235C1.54002 16.195 1.56 16.135 1.56 16.075C1.56 16.015 1.56 15.975 1.5 15.915C1.46 15.875 1.42003 15.835 1.34003 15.815C1.28003 15.795 1.2 15.775 1.12 15.775H0.820007V15.235H1.12C1.12 15.235 1.26001 15.235 1.32001 15.195C1.38001 15.155 1.42002 15.135 1.46002 15.095C1.50002 15.055 1.52 14.995 1.5 14.935C1.5 14.875 1.50002 14.835 1.46002 14.775C1.44002 14.735 1.40003 14.695 1.34003 14.675C1.30003 14.655 1.24003 14.635 1.16003 14.635C1.08003 14.635 1.02002 14.635 0.960022 14.675C0.900022 14.715 0.860007 14.735 0.820007 14.775C0.780007 14.815 0.780029 14.875 0.780029 14.935H0.0200195C0.0200195 14.755 0.0600342 14.595 0.160034 14.455C0.260034 14.315 0.399998 14.215 0.559998 14.135C0.719998 14.055 0.920015 14.015 1.14001 14.015C1.36001 14.015 1.54003 14.055 1.72003 14.115C1.88003 14.195 2.02004 14.295 2.10004 14.415C2.18004 14.535 2.23999 14.695 2.23999 14.855C2.23999 15.015 2.18002 15.155 2.08002 15.255C1.96002 15.355 1.82003 15.415 1.66003 15.435C1.90003 15.475 2.07999 15.555 2.17999 15.675C2.27999 15.795 2.35999 15.935 2.35999 16.115C2.35999 16.295 2.32001 16.435 2.20001 16.575C2.10001 16.715 1.96003 16.815 1.78003 16.895C1.60003 16.975 1.38003 17.015 1.16003 17.015L1.20001 16.995Z"
              fill={strokeColor}
            />
            <path
              d="M1.88503 2V5H1.0781V2.74483L0.416016 3.13793V2.45517L1.16088 2H1.90567H1.88503Z"
              fill={strokeColor}
            />
          </svg>
        ),
      },
      {
        name: 'sink',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.42426 7.25H13.4243V8.75H8.42426V7.25Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.42426 11.25H17.4243V12.75H8.42426V11.25Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.42426 3.25H18.4243V4.75H8.42426V3.25Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.42426 15.25H12.4243V16.75H8.42426V15.25Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.67426 18V2H7.17426V18H5.67426Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.84853 7.57574L4.27279 10L1.84853 12.4243L1 11.5757L2.57574 10L1 8.42426L1.84853 7.57574Z"
              fill={strokeColor}
            />
          </svg>
        ),
      },
      {
        name: 'lift',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11 7.25H6V8.75H11V7.25Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11 11.25H2V12.75H11V11.25Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11 3.25H1V4.75H11V3.25Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11 15.25H7V16.75H11V15.25Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.75 18V2H12.25V18H13.75Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.5757 7.57574L15.1515 10L17.5757 12.4243L18.4243 11.5757L16.8485 10L18.4243 8.42426L17.5757 7.57574Z"
              fill={strokeColor}
            />
          </svg>
        ),
      },
      {
        name: 'code',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.57152 17.8989L12.5715 3.39889L11.1255 3L7.12553 17.5L8.57152 17.8989Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.42426 7.77518L2 10.1994L4.42426 12.6237L5.27279 11.7752L3.69706 10.1994L5.27279 8.62371L4.42426 7.77518Z"
              fill={strokeColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.2728 7.77518L17.6971 10.1994L15.2728 12.6237L14.4243 11.7752L16 10.1994L14.4243 8.62371L15.2728 7.77518Z"
              fill={strokeColor}
            />
          </svg>
        ),
      },
      {
        name: 'info',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path d="M 1 1 L 19 1 L 19 19 L 1 19 Z" fill="transparent"></path>
            <path
              d="M 1 10 C 1 5.029 5.029 1 10 1 C 14.971 1 19 5.029 19 10 C 19 14.971 14.971 19 10 19 C 5.029 19 1 14.971 1 10 Z M 10 17.5 C 14.142 17.5 17.5 14.142 17.5 10 C 17.5 5.858 14.142 2.5 10 2.5 C 5.858 2.5 2.5 5.858 2.5 10 C 2.5 14.142 5.858 17.5 10 17.5 Z"
              fill={strokeColor}
            ></path>
            <path
              d="M 10.75 14 L 10.75 8.5 L 9.25 8.5 L 9.25 14 Z"
              fill={strokeColor}
            ></path>
            <path
              d="M 11 6.5 C 11 7.052 10.552 7.5 10 7.5 C 9.448 7.5 9 7.052 9 6.5 C 9 5.948 9.448 5.5 10 5.5 C 10.552 5.5 11 5.948 11 6.5 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'like',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 13.447 16.354 C 13.167 16.759 12.706 17 12.214 17 L 3.5 17 C 2.672 17 2 16.328 2 15.5 L 2 8.5 C 2 7.672 2.672 7 3.5 7 L 4.343 7 C 4.762 7 5.161 6.825 5.445 6.517 L 9.265 2.379 C 9.883 1.71 11 2.147 11 3.058 L 11 7 L 16 7 C 16.828 7 17.5 7.672 17.5 8.5 L 17.5 10.031 C 17.5 10.336 17.407 10.634 17.233 10.885 Z M 5 6.5 L 5 17"
              fill="transparent"
              strokeWidth={stroke}
              stroke={strokeColor}
              strokeMiterlimit="10"
              strokeDasharray=""
            ></path>
          </svg>
        ),
      },
      {
        name: 'unlike',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 6.053 4.646 C 6.333 4.241 6.794 4 7.286 4 L 16 4 C 16.828 4 17.5 4.672 17.5 5.5 L 17.5 12.5 C 17.5 13.328 16.828 14 16 14 L 15.157 14 C 14.738 14 14.339 14.175 14.055 14.483 L 10.235 18.621 C 9.617 19.29 8.5 18.853 8.5 17.942 L 8.5 14 L 3.5 14 C 2.672 14 2 13.328 2 12.5 L 2 10.969 C 2 10.664 2.093 10.366 2.267 10.115 Z M 14.5 14.5 L 14.5 4"
              fill="transparent"
              strokeWidth={stroke}
              stroke={strokeColor}
              strokeMiterlimit="10"
              strokeDasharray=""
            ></path>
          </svg>
        ),
      },
      {
        name: 'stop',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 3 7.5 C 3 5.015 5.015 3 7.5 3 L 12.5 3 C 14.985 3 17 5.015 17 7.5 L 17 12.5 C 17 14.985 14.985 17 12.5 17 L 7.5 17 C 5.015 17 3 14.985 3 12.5 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'copy',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path d="M 0 0 L 20 0 L 20 20 L 0 20 Z" fill="transparent"></path>
            <path
              d="M 5 15 L 3.5 15 C 2.672 15 2 14.328 2 13.5 L 2 3.5 C 2 2.672 2.672 2 3.5 2 L 13.5 2 C 14.328 2 15 2.672 15 3.5 L 15 5"
              fill="transparent"
              strokeWidth={stroke}
              stroke={strokeColor}
              strokeLinejoin="round"
              strokeMiterlimit={'10'}
            ></path>
            <path
              d="M 5 6.5 C 5 5.672 5.672 5 6.5 5 L 16.5 5 C 17.328 5 18 5.672 18 6.5 L 18 16.5 C 18 17.328 17.328 18 16.5 18 L 6.5 18 C 5.672 18 5 17.328 5 16.5 Z"
              fill="transparent"
              strokeWidth={stroke}
              stroke={strokeColor}
              strokeLinejoin="round"
              strokeMiterlimit={'10'}
            ></path>
          </svg>
        ),
      },
      {
        name: 'font smaller',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path d="M 0 0 L 20 0 L 20 20 L 0 20 Z" fill="transparent"></path>
            <path
              d="M 9.081 5 L 10.746 5 L 14.321 14.824 L 14.321 15.015 L 12.833 15.015 L 11.919 12.232 L 7.854 12.232 L 6.899 15.015 L 5.5 15.015 L 5.5 14.824 Z M 11.503 11.017 L 9.913 6.542 L 9.858 6.542 L 8.282 11.017 L 11.502 11.017 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'font larger',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path d="M 0 0 L 20 0 L 20 20 L 0 20 Z" fill="transparent"></path>
            <path
              d="M 8.872 3 L 11.137 3 L 16 16.733 L 16 17 L 13.976 17 L 12.733 13.109 L 7.202 13.109 L 5.903 17 L 4 17 L 4 16.733 Z M 12.167 11.411 L 10.004 5.155 L 9.929 5.155 L 7.785 11.411 L 12.166 11.411 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'bar chart',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path d="M 0 0 L 20 0 L 20 20 L 0 20 Z" fill="transparent"></path>
            <path
              d="M 2 2.5 L 2 17 L 18.5 17"
              fill="transparent"
              strokeWidth={stroke}
              stroke={strokeColor}
              strokeLinejoin="round"
            ></path>
            <path
              d="M 6.5 9 L 6.5 14"
              fill="transparent"
              strokeWidth={stroke}
              stroke={strokeColor}
            ></path>
            <path
              d="M 10.451 5 L 10.451 14"
              fill="transparent"
              strokeWidth={stroke}
              stroke={strokeColor}
            ></path>
            <path
              d="M 14.5 7 L 14.5 14"
              fill="transparent"
              strokeWidth={stroke}
              stroke={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'briefcase',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 5 12 C 5 12.552 5.448 13 6 13 C 6.552 13 7 12.552 7 12 C 7 11.448 6.552 11 6 11 C 5.448 11 5 11.448 5 12 Z M 14 13 C 13.448 13 13 12.552 13 12 C 13 11.448 13.448 11 14 11 C 14.552 11 15 11.448 15 12 C 15 12.552 14.552 13 14 13 Z"
              fill={strokeColor}
            ></path>
            <path
              d="M 5.25 5 L 5.25 3.5 C 5.25 2.257 6.257 1.25 7.5 1.25 L 12.5 1.25 C 13.743 1.25 14.75 2.257 14.75 3.5 L 14.75 5 L 17.5 5 C 18.328 5 19 5.672 19 6.5 L 19 15.5 C 19 16.328 18.328 17 17.5 17 L 2.5 17 C 1.672 17 1 16.328 1 15.5 L 1 6.5 C 1 5.672 1.672 5 2.5 5 Z M 6.75 5 L 13.25 5 L 13.25 3.5 C 13.25 3.086 12.914 2.75 12.5 2.75 L 7.5 2.75 C 7.086 2.75 6.75 3.086 6.75 3.5 Z M 2.5 6.5 L 2.5 15.5 L 17.5 15.5 L 17.5 6.5 L 14.75 6.5 L 14.75 9 L 13.25 9 L 13.25 6.5 L 6.75 6.5 L 6.75 9 L 5.25 9 L 5.25 6.5 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'globe location',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <g transform="translate(2 2.5)">
              <path
                d="M 7.619 15.238 C 3.411 15.238 0 11.827 0 7.619 C -0.003 5.575 0.819 3.616 2.278 2.185 M 2.921 13.601 C 2.663 12.725 3.136 12.29 3.812 12.007 C 4.85 11.57 4.85 11.57 5.63 10.534 C 6.412 9.497 7.393 9.476 9.239 11.547 C 10.068 12.479 11.796 11.666 12.728 13.066 M 7.619 15.238 C 9.503 15.238 11.228 14.554 12.558 13.421 C 13.222 12.855 13.789 12.176 14.227 11.414 C 14.446 11.033 14.634 10.631 14.785 10.213 C 14.861 10.003 14.928 9.79 14.985 9.572 M 1.785 2.916 C 2.6 2.938 3.261 3.5 3.132 4.374 C 2.921 5.801 4.248 5.459 4.199 6.75 C 4.167 7.611 3.509 8.55 1.892 8.936 C 1.041 9.139 0.559 9.279 0.176 9.806 M 6.874 0.036 C 6.628 0.06 6.383 0.095 6.142 0.143 C 5.658 0.238 5.187 0.38 4.733 0.566 C 3.825 0.937 2.99 1.484 2.278 2.185"
                fill="transparent"
                strokeWidth={stroke}
                stroke={strokeColor}
                strokeLinejoin="round"
                strokeDasharray=""
              ></path>
              <path
                d="M 12.19 0 C 14.252 0 16 1.69 16 3.741 C 16 5.823 14.224 7.285 12.583 8.279 C 12.339 8.415 12.042 8.415 11.798 8.279 C 10.16 7.276 8.381 5.831 8.381 3.741 C 8.381 1.691 10.129 0 12.19 0 Z"
                fill="transparent"
                strokeWidth={stroke}
                stroke={strokeColor}
                strokeLinejoin="round"
                strokeDasharray=""
              ></path>
              <path
                d="M 12.952 3.81 C 12.952 4.23 12.611 4.571 12.19 4.571 C 11.77 4.571 11.429 4.23 11.429 3.81 C 11.429 3.389 11.77 3.048 12.19 3.048 C 12.611 3.048 12.952 3.389 12.952 3.81 Z"
                fill={strokeColor}
              ></path>
            </g>
          </svg>
        ),
      },
      {
        name: 'focus',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path d="M 0 0 L 20 0 L 20 20 L 0 20 Z" fill="transparent"></path>
            <path
              d="M 9.75 2.641 C 13.666 2.641 16.859 5.834 16.859 9.75 C 16.859 13.666 13.666 16.859 9.75 16.859 C 5.834 16.859 2.641 13.666 2.641 9.75 C 2.641 5.834 5.834 2.641 9.75 2.641 M 9.75 1 C 4.916 1 1 4.916 1 9.75 C 1 14.584 4.916 18.5 9.75 18.5 C 14.584 18.5 18.5 14.584 18.5 9.75 C 18.5 4.916 14.584 1 9.75 1 Z"
              fill={strokeColor}
            ></path>
            <path
              d="M 5.492 12.657 L 6.03 11.706 L 13.892 16.157 L 13.353 17.109 Z"
              fill={strokeColor}
            ></path>
            <path
              d="M 5.112 7.527 L 6.206 7.519 L 6.282 16.553 L 5.188 16.562 Z"
              fill={strokeColor}
            ></path>
            <path
              d="M 1.573 9.2 L 9.36 4.62 L 9.914 5.563 L 2.127 10.144 Z"
              fill={strokeColor}
            ></path>
            <path
              d="M 5.605 3.344 L 6.143 2.392 L 14.005 6.844 L 13.465 7.795 Z"
              fill={strokeColor}
            ></path>
            <path
              d="M 13.223 2.953 L 14.316 2.945 L 14.392 11.979 L 13.298 11.988 Z"
              fill={strokeColor}
            ></path>
            <path
              d="M 9.579 13.946 L 17.366 9.365 L 17.92 10.308 L 10.133 14.888 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'chart arrow',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path d="M 0 0 L 20 0 L 20 20 L 0 20 Z" fill="transparent"></path>
            <g transform="translate(3.5 6)">
              <path
                d="M 0 8 L 4.5 3.5 L 7.5 6 L 12.5 0.5"
                fill="transparent"
                strokeWidth={stroke}
                stroke={strokeColor}
                strokeLinecap="square"
                strokeMiterlimit="10"
                strokeDasharray=""
              ></path>
              <path
                d="M 0.876 5.957 L 3.387 2.87 L 0 0"
                transform="translate(10.018 -1.785) rotate(-40 1.694 2.978)"
                fill="transparent"
                strokeWidth={stroke}
                stroke={strokeColor}
                strokeLinecap="square"
                strokeMiterlimit="10"
                strokeDasharray=""
              ></path>
            </g>
          </svg>
        ),
      },
      {
        name: 'document editor',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <g>
              <defs>
                <path
                  d="M 3 3 C 3 1.895 3.895 1 5 1 L 15 1 C 16.105 1 17 1.895 17 3 L 17 17 C 17 18.105 16.105 19 15 19 L 5 19 C 3.895 19 3 18.105 3 17 Z"
                  id="a1000z"
                ></path>
                <clipPath id="a1001z">
                  <use xlinkHref="#a1000z"></use>
                </clipPath>
              </defs>
              <use
                xlinkHref="#a1000z"
                fill="transparent"
                clipPath="url(#a1001z)"
                strokeWidth="3.1"
                stroke={strokeColor}
              ></use>
            </g>
            <g transform="translate(7 9.25)">
              <path
                d="M 0 1.5 L 4.5 1.5 L 4.5 0 L 0 0 Z"
                fill={strokeColor}
              ></path>
              <path d="M 6 5.5 L 0 5.5 L 0 4 L 6 4 Z" fill={strokeColor}></path>
            </g>
          </svg>
        ),
      },
      {
        name: 'settings',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 2 5.25 L 4.07 5.25 C 4.024 5.493 4 5.744 4 6 C 4 6.256 4.024 6.507 4.07 6.75 L 2 6.75 Z M 18 5.25 L 18 6.75 L 11.93 6.75 C 11.976 6.507 12 6.256 12 6 C 12 5.744 11.976 5.493 11.93 5.25 Z"
              fill={strokeColor}
            ></path>
            <path
              d="M 2 13.25 L 8.07 13.25 C 8.024 13.493 8 13.744 8 14 C 8 14.256 8.024 14.507 8.07 14.75 L 2 14.75 Z M 18 13.25 L 18 14.75 L 15.93 14.75 C 15.976 14.507 16 14.256 16 14 C 16 13.744 15.976 13.493 15.93 13.25 Z"
              fill={strokeColor}
            ></path>
            <path
              d="M 12 12 C 12.966 12 13.75 12.784 13.75 13.75 C 13.75 14.716 12.966 15.5 12 15.5 C 11.034 15.5 10.25 14.716 10.25 13.75 C 10.25 12.784 11.034 12 12 12 Z"
              fill="transparent"
              strokeWidth={stroke}
              stroke={strokeColor}
              strokeMiterlimit="10"
              strokeDasharray=""
            ></path>
            <path
              d="M 8 4.25 C 8.966 4.25 9.75 5.034 9.75 6 C 9.75 6.966 8.966 7.75 8 7.75 C 7.034 7.75 6.25 6.966 6.25 6 C 6.25 5.034 7.034 4.25 8 4.25 Z"
              fill="transparent"
              strokeWidth={stroke}
              stroke={strokeColor}
              strokeMiterlimit="10"
              strokeDasharray=""
            ></path>
          </svg>
        ),
      },
      {
        name: 'light bulb',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 5.05 13.95 C 3.784 12.683 3 10.933 3 9 C 3 7.067 3.784 5.317 5.05 4.05 C 6.317 2.784 8.067 2 10 2 C 11.933 2 13.683 2.784 14.95 4.05 C 16.216 5.317 17 7.067 17 9 C 17 10.933 16.216 12.683 14.95 13.95"
              fill="transparent"
              strokeWidth={stroke}
              stroke={strokeColor}
            ></path>
            <path
              d="M 10 10 C 10.552 10 11 9.552 11 9 C 11 8.448 10.552 8 10 8 C 9.448 8 9 8.448 9 9 C 9 9.552 9.448 10 10 10 Z"
              fill={strokeColor}
            ></path>
            <path
              d="M 6.5 15 L 13.5 15"
              fill="transparent"
              strokeWidth={stroke}
              stroke={strokeColor}
            ></path>
            <path
              d="M 7.5 18 L 12.5 18"
              fill="transparent"
              strokeWidth={stroke}
              stroke={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'issue',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 10 11.667 L 10.008 11.667"
              fill="transparent"
              strokeWidth={stroke}
              stroke={strokeColor}
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M 10 9.167 L 10 5.833"
              fill="transparent"
              strokeWidth={stroke}
              stroke={strokeColor}
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M 2 4.503 C 2 3.581 2.748 2.833 3.67 2.833 L 16.33 2.833 C 17.252 2.833 18 3.581 18 4.503 L 18 13.163 C 18 14.086 17.252 14.833 16.33 14.833 L 3.67 14.833 C 2.748 14.833 2 14.086 2 13.163 Z"
              fill="transparent"
              strokeWidth={stroke}
              stroke={strokeColor}
            ></path>
            <path
              d="M 3.383 18.336 C 5.417 17.476 7.653 17 10 17 C 12.347 17 14.583 17.476 16.617 18.336"
              fill="transparent"
              strokeWidth={stroke}
              stroke={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'chart',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path d="M 0 0 L 20 0 L 20 20 L 0 20 Z" fill="transparent"></path>
            <path
              d="M 5 12 L 9 8 L 12.5 11.5 L 16.5 7.5"
              fill="transparent"
              strokeWidth={stroke}
              stroke={strokeColor}
              strokeLinecap="square"
              strokeMiterlimit="10"
              strokeDasharray=""
            ></path>
            <path
              d="M 2 2.5 L 2 17 L 18.5 17"
              fill="transparent"
              strokeWidth={stroke}
              stroke={strokeColor}
              strokeLinejoin="round"
            ></path>
          </svg>
        ),
      },
      {
        name: 'chat',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 17.75 5 C 17.75 2.929 16.071 1.25 14 1.25 L 6 1.25 C 3.929 1.25 2.25 2.929 2.25 5 L 2.25 19 L 3.75 19 C 3.75 17.757 4.757 16.75 6 16.75 L 14 16.75 C 16.071 16.75 17.75 15.071 17.75 13 Z M 3.75 16 L 3.75 5 C 3.75 3.757 4.757 2.75 6 2.75 L 14 2.75 C 15.243 2.75 16.25 3.757 16.25 5 L 16.25 13 C 16.25 14.243 15.243 15.25 14 15.25 L 6 15.25 C 5.156 15.25 4.377 15.529 3.75 16 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'exclamation',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path d="M 1 1 L 19 1 L 19 19 L 1 19 Z" fill="transparent"></path>
            <g transform="translate(8.75 4)">
              <path
                d="M 2.471 7.765 L 2.471 0 L 0.353 0 L 0.353 7.765 Z"
                fill={strokeColor}
              ></path>
              <path
                d="M 2.824 10.588 C 2.824 11.368 2.191 12 1.412 12 C 0.632 12 0 11.368 0 10.588 C 0 9.809 0.632 9.176 1.412 9.176 C 2.191 9.176 2.824 9.809 2.824 10.588 Z"
                fill={strokeColor}
              ></path>
            </g>
          </svg>
        ),
      },
      {
        name: 'redo',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <g transform="translate(2 4)">
              <path
                d="M 0 0 L 16 0 L 16 11.207 L 0 11.207 Z"
                fill="transparent"
              ></path>
              <path
                d="M 14.113 4.78 L 6.176 4.78 C 3.227 4.78 0.838 7.28 0.838 10.369 L 0.838 11.179"
                fill="transparent"
                strokeWidth={stroke}
                stroke={strokeColor}
                strokeMiterlimit="10"
                strokeDasharray=""
              ></path>
              <path
                d="M 10.62 8.972 L 14.81 4.78 L 10.62 0.588"
                fill="transparent"
                strokeWidth={stroke}
                stroke={strokeColor}
                strokeMiterlimit="10"
                strokeDasharray=""
              ></path>
            </g>
          </svg>
        ),
      },
      {
        name: 'undo',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <g transform="translate(2 4)">
              <path
                d="M 16 0 L 0 0 L 0 11.207 L 16 11.207 Z"
                fill="transparent"
              ></path>
              <path
                d="M 1.887 4.78 L 9.824 4.78 C 12.773 4.78 15.162 7.28 15.162 10.369 L 15.162 11.179"
                fill="transparent"
                strokeWidth={stroke}
                stroke={strokeColor}
                strokeMiterlimit="10"
                strokeDasharray=""
              ></path>
              <path
                d="M 5.38 8.972 L 1.19 4.78 L 5.38 0.588"
                fill="transparent"
                strokeWidth={stroke}
                stroke={strokeColor}
                strokeMiterlimit="10"
                strokeDasharray=""
              ></path>
            </g>
          </svg>
        ),
      },
      {
        name: 'character beam',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path d="M 0 0 L 24 0 L 24 24 L 0 24 Z" fill="transparent"></path>
            <g transform="translate(2 3.5)">
              <path
                d="M 3.987 1.4 L 5.841 1.4 L 9.821 12.338 L 9.821 12.55 L 8.165 12.55 L 7.147 9.452 L 2.621 9.452 L 1.558 12.55 L 0 12.55 L 0 12.338 Z M 6.684 8.099 L 4.913 3.116 L 4.852 3.116 L 3.098 8.099 L 6.683 8.099 Z"
                fill={strokeColor}
              ></path>
              <path
                d="M 10.733 0 L 16.333 0 M 10.733 14 L 16.333 14 M 13.533 0 L 13.533 14"
                fill="transparent"
                strokeWidth={stroke}
                stroke={strokeColor}
              ></path>
            </g>
          </svg>
        ),
      },
      {
        name: 'edit',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.0272 0.966797L14.5303 1.46995L16.5303 3.46995L17.0893 4.02893L16.5017 4.55775L6.50172 13.5577L6.2878 13.7503H6H4H3.25V13.0003V11.0003V10.6663L3.49828 10.4428L13.4983 1.44281L14.0272 0.966797ZM4.75 11.3343V12.2503H5.7122L14.9107 3.97163L13.9728 3.03376L4.75 11.3343ZM17 16.7503H5V15.2503H17V16.7503ZM2 17.0003C2.55228 17.0003 3 16.5526 3 16.0003C3 15.448 2.55228 15.0003 2 15.0003C1.44772 15.0003 1 15.448 1 16.0003C1 16.5526 1.44772 17.0003 2 17.0003Z"
              fill={strokeColor}
            />
          </svg>
        ),
      },
      {
        name: 'compliance check',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M3 3.313a1.5 1.5 0 0 1 1.302-1.487L10.5 1l5.228.804A1.5 1.5 0 0 1 17 3.287v10.875a1.5 1.5 0 0 1-.714 1.277L10.5 19l-6.706-3.576A1.5 1.5 0 0 1 3 14.1V3.313Z"
              stroke={strokeColor}
              strokeWidth={stroke}
            />
            <path
              d="M7.385 9.25a4.48 4.48 0 0 0 2.865-2.865 4.48 4.48 0 0 0 2.865 2.865 4.48 4.48 0 0 0-2.865 2.865A4.48 4.48 0 0 0 7.385 9.25Z"
              stroke={strokeColor}
              strokeWidth={stroke}
            />
          </svg>
        ),
      },
      {
        name: 'text document',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 12.5 5.5 L 12.5 2.5 L 4.5 2.5 L 4.5 17.5 L 15.5 17.5 L 15.5 5.5 Z M 15.5 19 L 4.5 19 C 3.672 19 3 18.328 3 17.5 L 3 2.5 C 3 1.672 3.672 1 4.5 1 L 12.5 1 C 13.328 1 14 1.672 14 2.5 L 14 4 L 15.5 4 C 16.328 4 17 4.672 17 5.5 L 17 17.5 C 17 18.328 16.328 19 15.5 19 Z M 14 14.75 L 6 14.75 L 6 13.25 L 14 13.25 Z M 6 10.75 L 12 10.75 L 12 9.25 L 6 9.25 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'mail',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 2 5 C 2 4.448 2.448 4 3 4 L 17 4 C 17.552 4 18 4.448 18 5 L 18 15 C 18 15.552 17.552 16 17 16 L 3 16 C 2.448 16 2 15.552 2 15 Z"
              fill="transparent"
              strokeWidth={stroke}
              stroke={strokeColor}
            ></path>
            <path
              d="M 15.5 8 C 15.5 8.552 15.052 9 14.5 9 C 13.948 9 13.5 8.552 13.5 8 C 13.5 7.448 13.948 7 14.5 7 C 15.052 7 15.5 7.448 15.5 8 Z"
              fill={strokeColor}
            ></path>
            <path
              d="M 11.5 8 L 4.5 8"
              fill="transparent"
              strokeWidth={stroke}
              stroke={strokeColor}
            ></path>
            <path
              d="M 9.75 11 L 4.5 11"
              fill="transparent"
              strokeWidth={stroke}
              stroke={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'concise',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 18 7 L 2 7 L 2 8.5 L 18 8.5 Z M 14 12 L 2 12 L 2 13.5 L 14 13.5 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'moderate',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 2 4 L 14 4 L 14 5.5 L 2 5.5 Z M 2 9 L 18 9 L 18 10.5 L 2 10.5 Z M 10 14 L 2 14 L 2 15.5 L 10 15.5 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'expanded',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 2 2 L 14 2 L 14 3.5 L 2 3.5 Z M 18 7 L 2 7 L 2 8.5 L 18 8.5 Z M 16 12 L 2 12 L 2 13.5 L 16 13.5 Z M 10 17 L 2 17 L 2 18.5 L 10 18.5 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'open circle',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 17.371 6.886 C 17.776 7.843 18 8.895 18 10 C 18 14.418 14.418 18 10 18 C 5.582 18 2 14.418 2 10 C 2 5.582 5.582 2 10 2"
              fill="transparent"
              strokeWidth="1.5"
              stroke="rgb(0, 0, 0)"
            ></path>
          </svg>
        ),
      },
      {
        name: 'view',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path d="M 1 1 L 19 1 L 19 19 L 1 19 Z" fill="transparent"></path>
            <path
              d="M 10 2.75 C 5.996 2.75 2.75 5.996 2.75 10 C 2.75 14.004 5.996 17.25 10 17.25 C 14.004 17.25 17.25 14.004 17.25 10 C 17.25 5.996 14.004 2.75 10 2.75 Z M 1.25 10 C 1.25 5.168 5.168 1.25 10 1.25 C 14.832 1.25 18.75 5.168 18.75 10 C 18.75 14.832 14.832 18.75 10 18.75 C 5.168 18.75 1.25 14.832 1.25 10 Z"
              fill={strokeColor}
            ></path>
            <path
              d="M 11 10 C 11 10.552 10.552 11 10 11 C 9.448 11 9 10.552 9 10 C 9 9.448 9.448 9 10 9 C 10.552 9 11 9.448 11 10 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
        lineOn: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path d="M 1 1 L 19 1 L 19 19 L 1 19 Z" fill="transparent"></path>
            <path
              d="M 10 2.75 C 5.996 2.75 2.75 5.996 2.75 10 C 2.75 14.004 5.996 17.25 10 17.25 C 14.004 17.25 17.25 14.004 17.25 10 C 17.25 5.996 14.004 2.75 10 2.75 Z M 1.25 10 C 1.25 5.168 5.168 1.25 10 1.25 C 14.832 1.25 18.75 5.168 18.75 10 C 18.75 14.832 14.832 18.75 10 18.75 C 5.168 18.75 1.25 14.832 1.25 10 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'apple',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 9.643 5.355 C 10.635 5.355 11.505 4.967 12.253 4.19 C 13.001 3.414 13.376 2.511 13.376 1.482 C 13.376 1.369 13.367 1.208 13.349 1 C 13.218 1.018 13.12 1.033 13.055 1.045 C 12.14 1.176 11.336 1.625 10.641 2.392 C 9.946 3.16 9.599 3.981 9.599 4.855 C 9.599 4.956 9.613 5.123 9.643 5.355 Z M 13.197 19 C 13.904 19 14.685 18.515 15.54 17.545 C 16.395 16.576 17.049 15.436 17.5 14.127 C 15.819 13.259 14.979 12.012 14.979 10.388 C 14.979 9.032 15.659 7.872 17.019 6.908 C 16.075 5.724 14.828 5.132 13.278 5.132 C 12.624 5.132 12.027 5.23 11.487 5.426 L 11.149 5.551 L 10.694 5.73 C 10.397 5.843 10.127 5.899 9.884 5.899 C 9.694 5.899 9.444 5.834 9.135 5.703 L 8.788 5.56 L 8.458 5.426 C 7.977 5.224 7.461 5.123 6.908 5.123 C 5.43 5.123 4.242 5.623 3.345 6.622 C 2.448 7.622 2 8.94 2 10.576 C 2 12.878 2.719 15.005 4.156 16.956 C 5.153 18.319 6.065 19 6.891 19 C 7.241 19 7.588 18.932 7.933 18.795 L 8.369 18.616 L 8.717 18.491 C 9.204 18.319 9.652 18.233 10.062 18.233 C 10.495 18.233 10.994 18.343 11.558 18.563 L 11.834 18.67 C 12.411 18.89 12.865 19 13.197 19 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'linkedin',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 16.4 16.259 L 13.766 16.259 L 13.766 12.133 C 13.766 11.15 13.748 9.883 12.396 9.883 C 11.023 9.883 10.813 10.955 10.813 12.061 L 10.813 16.258 L 8.18 16.258 L 8.18 7.775 L 10.709 7.775 L 10.709 8.933 L 10.743 8.933 C 11.259 8.052 12.218 7.525 13.239 7.563 C 15.909 7.563 16.401 9.319 16.401 11.603 L 16.4 16.258 Z M 5.208 6.615 C 4.652 6.63 4.132 6.343 3.849 5.863 C 3.567 5.384 3.567 4.79 3.849 4.311 C 4.132 3.832 4.652 3.544 5.208 3.559 C 6.036 3.581 6.695 4.259 6.695 5.087 C 6.695 5.915 6.036 6.593 5.208 6.615 Z M 6.524 16.259 L 3.888 16.259 L 3.888 7.775 L 6.524 7.775 Z M 17.713 1.111 L 2.564 1.111 C 1.848 1.103 1.261 1.677 1.252 2.393 L 1.252 17.604 C 1.256 17.948 1.396 18.277 1.642 18.518 C 1.888 18.759 2.219 18.892 2.563 18.889 L 17.713 18.889 C 18.431 18.898 19.02 18.324 19.03 17.606 L 19.03 2.392 C 19.02 1.675 18.43 1.102 17.713 1.111"
              fill="rgb(10, 102, 194)"
            ></path>
          </svg>
        ),
      },
      {
        name: 'google',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <g transform="translate(1.05 1.197)">
              <path
                d="M 8.995 3.569 C 10.269 3.549 11.524 4.039 12.446 4.922 L 15.014 2.334 C 13.387 0.804 11.23 -0.019 8.995 0 C 5.583 0 2.485 1.922 0.956 4.961 L 3.936 7.275 C 4.662 5.137 6.642 3.569 8.995 3.569 Z"
                fill="rgb(229,67,53)"
              ></path>
              <path
                d="M 3.936 10.726 C 3.564 9.608 3.564 8.392 3.936 7.275 L 0.956 4.961 C -0.319 7.51 -0.319 10.51 0.956 13.039 Z"
                fill="rgb(246,183,4)"
              ></path>
              <path
                d="M 8.995 18 C 11.426 18 13.465 17.196 14.956 15.824 L 12.054 13.588 C 11.25 14.137 10.211 14.451 8.995 14.451 C 6.642 14.451 4.662 12.863 3.936 10.745 L 0.956 13.039 C 2.485 16.078 5.583 18 8.995 18 Z"
                fill="rgb(52,163,83)"
              ></path>
              <path
                d="M 17.642 9.216 C 17.642 8.608 17.583 7.981 17.485 7.392 L 8.995 7.392 L 8.995 10.863 L 13.858 10.863 C 13.662 11.981 13.014 12.961 12.054 13.588 L 14.956 15.843 C 16.661 14.255 17.642 11.941 17.642 9.216 Z"
                fill="rgb(66,128,239)"
              ></path>
            </g>
          </svg>
        ),
      },
      {
        name: 'dollar',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path d="M 1 1 L 19 1 L 19 19 L 1 19 Z" fill="transparent"></path>
            <path
              d="M 1 10 C 1 5.029 5.029 1 10 1 C 14.971 1 19 5.029 19 10 C 19 14.971 14.971 19 10 19 C 5.029 19 1 14.971 1 10 Z M 10 17.5 C 14.142 17.5 17.5 14.142 17.5 10 C 17.5 5.858 14.142 2.5 10 2.5 C 5.858 2.5 2.5 5.858 2.5 10 C 2.5 14.142 5.858 17.5 10 17.5 Z"
              fill={strokeColor}
            ></path>
            <path
              d="M 10 6.75 C 10.69 6.75 11.25 7.31 11.25 8 L 12.75 8 C 12.75 6.77 11.933 5.689 10.75 5.354 L 10.75 4.5 L 9.25 4.5 L 9.25 5.354 C 7.932 5.731 7.093 7.02 7.281 8.378 C 7.47 9.735 8.629 10.747 10 10.75 C 10.69 10.75 11.25 11.31 11.25 12 C 11.25 12.69 10.69 13.25 10 13.25 C 9.31 13.25 8.75 12.69 8.75 12 L 7.25 12 C 7.25 13.23 8.067 14.311 9.25 14.646 L 9.25 15.5 L 10.75 15.5 L 10.75 14.646 C 12.068 14.269 12.907 12.98 12.719 11.622 C 12.53 10.265 11.371 9.253 10 9.25 C 9.31 9.25 8.75 8.69 8.75 8 C 8.75 7.31 9.31 6.75 10 6.75 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'trash bin',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 17 0.5 L 3 0.5 L 3 2 L 17 2 Z M 5.5 16.75 L 14.5 16.75 L 14.5 5.75 L 5.5 5.75 Z M 14.8 18.25 L 5.2 18.25 C 4.537 18.25 4 17.713 4 17.05 L 4 5.45 C 4 4.787 4.537 4.25 5.2 4.25 L 14.8 4.25 C 15.463 4.25 16 4.787 16 5.45 L 16 17.05 C 16 17.713 15.463 18.25 14.8 18.25 Z M 7.25 14.25 L 7.25 8.25 L 8.75 8.25 L 8.75 14.25 Z M 11.25 8.25 L 11.25 14.25 L 12.75 14.25 L 12.75 8.25 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'recent chats',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 2 4.25 L 10 4.25 L 10 5.75 L 2 5.75 Z M 18 9.25 L 18 10.75 L 2 10.75 L 2 9.25 Z M 14 14.25 L 2 14.25 L 2 15.75 L 14 15.75 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'refresh',
        line: (
          <svg
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 9 1.25 L 5 1.25 L 5 2.75 L 7.255 2.75 C 4.108 3.943 2.089 7.03 2.259 10.391 C 2.429 13.753 4.748 16.621 8 17.49 L 8 15.923 C 5.415 15.048 3.695 12.598 3.753 9.869 C 3.81 7.14 5.63 4.764 8.25 3.998 L 8.25 6 L 9.75 6 L 9.75 1.25 Z M 12.745 17.25 C 15.892 16.057 17.911 12.97 17.741 9.609 C 17.571 6.247 15.252 3.379 12 2.51 L 12 4.077 C 14.585 4.952 16.305 7.402 16.247 10.131 C 16.19 12.86 14.37 15.236 11.75 16.002 L 11.75 14 L 10.25 14 L 10.25 18.75 L 15 18.75 L 15 17.25 Z M 11 10 C 11 10.552 10.552 11 10 11 C 9.448 11 9 10.552 9 10 C 9 9.448 9.448 9 10 9 C 10.552 9 11 9.448 11 10 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'document',
        line: (
          <svg
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 13.25 4 L 13.25 4.75 L 15.5 4.75 C 15.914 4.75 16.25 5.086 16.25 5.5 L 16.25 17.5 C 16.25 17.914 15.914 18.25 15.5 18.25 L 4.5 18.25 C 4.086 18.25 3.75 17.914 3.75 17.5 L 3.75 2.5 C 3.75 2.086 4.086 1.75 4.5 1.75 L 12.5 1.75 C 12.914 1.75 13.25 2.086 13.25 2.5 Z"
              fill="transparent"
              strokeWidth={stroke}
              stroke={strokeColor}
              strokeMiterlimit="10"
              strokeDasharray=""
            ></path>
          </svg>
        ),
      },
      {
        name: 'navigate',
        line: (
          <svg
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <g transform="translate(2 4)">
              <path
                d="M 0 0 L 16 0 L 16 11.207 L 0 11.207 Z"
                fill="transparent"
              ></path>
              <path
                d="M 14.113 4.78 L 6.176 4.78 C 3.227 4.78 0.838 7.28 0.838 10.369 L 0.838 11.179"
                fill="transparent"
                strokeWidth={stroke}
                stroke={strokeColor}
                strokeMiterlimit="10"
                strokeDasharray=""
              ></path>
              <path
                d="M 10.62 8.972 L 14.81 4.78 L 10.62 0.588"
                fill="transparent"
                strokeWidth={stroke}
                stroke={strokeColor}
                strokeMiterlimit="10"
                strokeDasharray=""
              ></path>
            </g>
          </svg>
        ),
      },
      {
        name: 'arrow right',
        line: (
          <svg
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 10.53 3.469 L 16.53 9.469 L 17.06 9.999 L 16.53 10.529 L 10.53 16.529 L 9.47 15.469 L 14.19 10.749 L 4 10.749 L 4 9.249 L 14.19 9.249 L 9.47 4.53 L 10.53 3.47 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'arrow left',
        line: (
          <svg
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 9.47 3.469 L 3.47 9.469 L 2.94 9.999 L 3.47 10.529 L 9.47 16.529 L 10.53 15.469 L 5.81 10.749 L 16 10.749 L 16 9.249 L 5.81 9.249 L 10.53 4.529 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: '',
        line: (
          <svg
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 10.53 3.469 L 16.53 9.469 L 17.06 9.999 L 16.53 10.529 L 10.53 16.529 L 9.47 15.469 L 14.19 10.749 L 4 10.749 L 4 9.249 L 14.19 9.249 L 9.47 4.53 L 10.53 3.47 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'gpMark',
        line: (
          <svg
            width={size}
            height={size}
            viewBox="0 0 822 822"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 420.713 710.359 C 423.857 709.278 426.95 708.145 430.043 706.963 L 430.043 821.081 C 426.95 821.232 423.832 821.333 420.713 821.408 C 417.62 821.484 414.502 821.534 411.384 821.534 C 408.265 821.534 405.147 821.484 402.054 821.408 C 398.936 821.333 395.817 821.232 392.724 821.081 L 392.724 718.586 C 395.842 717.831 398.961 717.026 402.054 716.171 L 402.054 633.45 C 405.147 633.576 408.265 633.677 411.384 633.677 C 414.502 633.677 417.62 633.576 420.713 633.45 L 420.713 710.384 Z M 477.999 623.513 C 475.032 624.444 472.04 625.274 469.022 626.079 C 466.029 626.884 462.986 627.613 459.944 628.268 L 475.258 685.503 C 472.492 687.113 469.676 688.648 466.834 690.157 L 499.45 811.974 C 505.539 810.661 511.593 809.193 517.607 807.571 C 520.625 806.766 523.617 805.936 526.585 805.055 C 529.577 804.175 532.57 803.269 535.512 802.338 L 499.978 669.628 C 497.288 671.54 494.547 673.377 491.805 675.213 L 477.949 623.488 Z M 530.684 598.958 C 528.068 600.619 525.403 602.254 522.712 603.814 C 520.021 605.374 517.305 606.883 514.539 608.317 L 533.953 641.979 C 531.639 644.168 529.275 646.306 526.886 648.419 L 600.267 775.57 C 603.033 774.136 605.774 772.677 608.515 771.167 C 611.256 769.658 613.947 768.148 616.663 766.588 C 619.354 765.029 622.045 763.444 624.685 761.833 C 627.351 760.223 629.991 758.563 632.607 756.877 L 554.272 621.123 C 552.109 623.563 549.896 625.978 547.658 628.343 L 530.709 598.958 Z M 575.27 561.673 C 573.158 563.963 571.02 566.227 568.833 568.441 C 566.62 570.63 564.356 572.768 562.068 574.882 L 578.011 590.832 C 576.226 593.423 574.39 595.989 572.504 598.53 L 688.082 714.158 C 690.371 712.07 692.659 709.932 694.897 707.793 C 697.135 705.655 699.373 703.466 701.586 701.277 C 703.799 699.063 705.962 696.849 708.1 694.585 C 710.262 692.346 712.375 690.057 714.462 687.742 L 593.226 566.454 C 591.641 569.246 590.032 572.039 588.372 574.806 L 575.245 561.673 Z M 608.691 514.099 C 607.233 516.866 605.749 519.583 604.19 522.275 C 602.631 524.967 601.021 527.634 599.336 530.251 L 608.54 535.559 C 607.308 538.427 606.026 541.295 604.718 544.138 L 757.163 632.192 C 758.847 629.576 760.482 626.934 762.117 624.267 C 763.726 621.601 765.31 618.934 766.869 616.242 C 768.429 613.55 769.963 610.833 771.446 608.116 C 772.93 605.399 774.414 602.631 775.847 599.864 L 618.549 508.992 C 617.568 512.011 616.537 515.005 615.481 517.999 L 608.716 514.099 Z M 628.658 459.48 C 627.98 462.524 627.25 465.568 626.446 468.562 C 625.641 471.581 624.811 474.575 623.88 477.544 L 626.823 478.324 C 626.169 481.368 625.465 484.412 624.71 487.431 L 802.68 535.131 C 803.61 532.163 804.515 529.194 805.396 526.2 C 806.276 523.206 807.106 520.212 807.91 517.193 C 809.531 511.177 810.998 505.12 812.311 499.029 L 631.576 450.574 C 631.191 453.684 630.755 456.787 630.268 459.883 L 628.658 459.455 Z M 821.691 401.566 C 821.616 398.446 821.515 395.326 821.364 392.232 L 633.462 392.232 C 633.638 395.326 633.789 398.446 633.889 401.566 L 633.789 401.566 C 633.839 403.05 633.914 404.534 633.94 406.044 C 634.041 409.297 634.041 412.552 633.94 415.805 L 633.789 420.283 L 633.889 420.283 C 633.789 423.403 633.663 426.523 633.462 429.617 L 821.364 429.617 C 821.515 426.523 821.616 423.403 821.691 420.283 C 821.767 417.189 821.817 414.069 821.817 410.95 C 821.817 407.83 821.767 404.71 821.691 401.616 Z M 623.88 344.255 C 624.811 347.224 625.641 350.217 626.446 353.236 C 627.25 356.23 627.98 359.274 628.658 362.319 L 630.268 361.891 C 630.746 364.985 631.173 368.08 631.576 371.199 L 812.311 322.744 C 810.998 316.653 809.531 310.597 807.91 304.58 C 807.106 301.561 806.276 298.567 805.396 295.573 C 804.517 292.588 803.611 289.611 802.68 286.642 L 624.71 334.342 C 625.465 337.361 626.169 340.406 626.823 343.45 L 623.88 344.23 Z M 599.336 291.548 C 600.996 294.165 602.631 296.831 604.19 299.523 C 605.749 302.215 607.258 304.932 608.691 307.7 L 615.456 303.8 C 616.537 306.769 617.543 309.788 618.524 312.807 L 775.847 221.935 C 774.414 219.167 772.955 216.425 771.446 213.683 C 768.455 208.231 765.345 202.846 762.117 197.531 C 760.507 194.865 758.847 192.223 757.163 189.606 L 604.718 277.661 C 606.026 280.504 607.308 283.346 608.54 286.24 Z M 562.068 246.942 C 564.356 249.056 566.62 251.194 568.833 253.383 C 571.046 255.572 573.158 257.861 575.27 260.15 L 588.397 247.018 C 590.057 249.76 591.667 252.553 593.251 255.37 L 714.487 134.082 C 712.375 131.792 710.262 129.503 708.125 127.239 C 705.987 125 703.799 122.761 701.612 120.547 C 699.399 118.358 697.186 116.169 694.922 114.031 C 692.684 111.867 690.396 109.754 688.107 107.666 L 572.529 223.293 C 574.39 225.834 576.226 228.401 578.037 230.992 L 562.093 246.942 Z M 514.514 213.482 C 517.28 214.941 519.996 216.425 522.687 217.985 C 525.378 219.545 528.043 221.155 530.658 222.841 L 547.608 193.456 C 549.846 195.821 552.059 198.236 554.222 200.676 L 632.556 64.922 C 629.941 63.236 627.301 61.601 624.635 59.965 C 621.969 58.355 619.304 56.77 616.613 55.21 C 613.922 53.651 611.206 52.141 608.49 50.632 C 605.774 49.147 603.008 47.663 600.242 46.229 L 526.861 173.379 C 529.25 175.493 531.614 177.631 533.928 179.82 Z M 459.918 193.506 C 462.961 194.185 466.004 194.915 468.997 195.695 C 472.014 196.5 475.007 197.33 477.974 198.261 L 491.831 146.535 C 494.572 148.347 497.313 150.208 500.004 152.12 L 535.537 19.41 C 532.569 18.478 529.594 17.572 526.61 16.693 C 520.638 14.942 514.626 13.332 508.579 11.863 C 505.561 11.133 502.518 10.429 499.476 9.749 L 466.859 131.566 C 469.676 133.076 472.492 134.635 475.284 136.22 L 459.969 193.456 Z M 402.029 188.374 C 405.122 188.248 408.24 188.147 411.359 188.147 C 414.477 188.147 417.595 188.248 420.688 188.374 L 420.688 111.439 C 423.832 112.521 426.925 113.653 430.018 114.836 L 430.018 0.717 C 426.925 0.566 423.807 0.466 420.688 0.39 C 417.595 0.315 414.477 0.265 411.359 0.265 C 408.24 0.265 405.122 0.315 402.029 0.39 C 398.91 0.466 395.792 0.566 392.699 0.717 L 392.699 103.213 C 395.817 103.967 398.936 104.772 402.029 105.628 L 402.029 188.348 Z M 344.743 198.286 C 347.71 197.355 350.703 196.525 353.72 195.72 C 356.713 194.915 359.756 194.185 362.799 193.531 L 336.368 94.81 C 339.663 95.011 342.957 95.263 346.226 95.539 L 323.267 9.825 C 320.224 10.504 317.181 11.183 314.163 11.938 C 311.145 12.668 308.128 13.448 305.11 14.253 C 302.092 15.058 299.1 15.888 296.132 16.768 C 293.14 17.649 290.172 18.555 287.205 19.486 L 307.273 94.432 C 310.467 94.332 313.66 94.256 316.879 94.256 L 344.743 198.336 Z M 292.059 222.841 C 294.674 221.18 297.339 219.545 300.03 217.985 C 302.721 216.425 305.437 214.916 308.203 213.482 L 244.278 102.709 C 247.447 101.955 250.615 101.25 253.834 100.596 L 222.475 46.254 C 219.709 47.688 216.968 49.147 214.227 50.657 C 208.777 53.649 203.394 56.761 198.082 59.991 C 195.416 61.601 192.776 63.261 190.161 64.947 L 216.54 110.659 C 219.558 109.653 222.601 108.697 225.644 107.766 L 292.059 222.866 Z M 247.472 260.125 C 249.584 257.836 251.722 255.572 253.91 253.358 C 256.123 251.144 258.386 249.03 260.674 246.917 L 153.646 139.843 C 156.387 138.183 159.179 136.573 161.995 134.988 L 134.66 107.64 C 132.372 109.754 130.083 111.867 127.82 114.006 C 125.582 116.144 123.344 118.333 121.131 120.522 C 118.918 122.71 116.755 124.949 114.617 127.214 C 112.455 129.453 110.342 131.742 108.255 134.057 L 129.957 155.768 C 132.497 153.907 135.062 152.07 137.653 150.259 Z M 214.051 307.7 C 215.509 304.932 216.993 302.215 218.552 299.523 C 220.111 296.831 221.721 294.165 223.406 291.548 L 75.865 206.337 C 77.927 203.922 79.989 201.531 82.127 199.167 L 65.605 189.606 C 63.92 192.223 62.285 194.865 60.651 197.531 C 59.041 200.198 57.457 202.865 55.898 205.557 C 54.339 208.249 52.83 210.966 51.321 213.683 C 49.837 216.4 48.354 219.167 46.92 221.935 L 58.589 228.677 C 60.399 226.111 62.235 223.57 64.096 221.08 L 214.076 307.7 Z M 194.084 362.319 C 194.763 359.274 195.492 356.23 196.271 353.236 C 197.076 350.217 197.906 347.224 198.837 344.255 L 22.074 296.882 C 23.206 293.963 24.363 291.045 25.57 288.152 L 20.037 286.667 C 19.106 289.636 18.2 292.613 17.321 295.599 C 16.441 298.592 15.611 301.586 14.807 304.605 C 14.002 307.599 13.248 310.618 12.493 313.662 C 11.764 316.681 11.06 319.725 10.381 322.77 L 13.097 323.499 C 13.952 320.505 14.857 317.512 15.813 314.568 L 194.033 362.344 Z M 188.954 420.233 C 188.828 417.139 188.727 414.019 188.727 410.899 C 188.727 407.78 188.828 404.66 188.954 401.566 L 1.051 401.566 L 1.051 402.723 C 1.001 405.44 0.95 408.157 0.95 410.899 C 0.95 413.642 1.001 416.359 1.051 419.076 L 1.051 420.233 Z M 198.862 477.544 C 197.931 474.575 197.101 471.581 196.297 468.562 C 195.492 465.568 194.788 462.524 194.109 459.48 L 15.863 507.256 C 14.907 504.287 14.002 501.319 13.147 498.325 L 10.431 499.054 C 11.11 502.098 11.789 505.143 12.543 508.162 C 13.273 511.181 14.052 514.2 14.857 517.219 C 15.662 520.238 16.492 523.231 17.372 526.225 C 18.252 529.219 19.157 532.188 20.088 535.157 L 25.62 533.672 C 24.413 530.779 23.256 527.886 22.125 524.942 L 198.887 477.569 Z M 223.406 530.251 C 221.746 527.634 220.111 524.967 218.552 522.275 C 216.993 519.583 215.484 516.866 214.051 514.099 L 64.071 600.719 C 62.185 598.229 60.349 595.688 58.563 593.121 L 46.895 599.864 C 48.328 602.631 49.787 605.374 51.296 608.116 C 54.287 613.568 57.397 618.953 60.626 624.267 C 62.235 626.934 63.895 629.576 65.58 632.192 L 82.102 622.632 C 79.989 620.267 77.902 617.877 75.84 615.462 L 223.381 530.251 Z M 260.674 574.856 C 258.386 572.743 256.123 570.605 253.91 568.416 C 251.697 566.227 249.584 563.938 247.472 561.648 L 137.653 671.515 C 135.062 669.729 132.497 667.892 129.957 666.005 L 108.255 687.717 C 110.367 690.006 112.48 692.296 114.617 694.56 C 116.755 696.799 118.943 699.038 121.131 701.252 C 123.318 703.441 125.557 705.63 127.82 707.768 C 130.058 709.932 132.346 712.045 134.635 714.133 L 161.97 686.786 C 159.179 685.201 156.387 683.591 153.621 681.93 L 260.649 574.856 Z M 308.228 608.317 C 305.462 606.858 302.746 605.374 300.055 603.814 C 297.365 602.254 294.699 600.644 292.084 598.958 L 225.669 714.058 C 222.626 713.127 219.583 712.171 216.566 711.164 L 190.186 756.877 C 192.801 758.563 195.442 760.198 198.107 761.833 C 200.773 763.444 203.439 765.029 206.129 766.588 C 208.82 768.148 211.536 769.658 214.252 771.167 C 216.968 772.651 219.734 774.136 222.5 775.57 L 253.859 721.228 C 250.666 720.574 247.472 719.869 244.303 719.115 L 308.228 608.342 Z M 362.824 628.293 C 359.781 627.614 356.738 626.884 353.745 626.104 C 350.728 625.299 347.735 624.469 344.768 623.538 L 316.904 727.618 C 313.685 727.618 310.492 727.543 307.298 727.442 L 287.23 802.389 C 290.198 803.32 293.165 804.225 296.158 805.106 C 305.119 807.729 314.169 810.037 323.292 812.024 L 346.252 726.31 C 342.982 726.612 339.688 726.863 336.394 727.039 L 362.824 628.318 Z M 414.2 421.466 L 414.15 421.315 M 406.53 428.938 L 407.461 425.416 M 408.517 421.466 L 408.567 421.315"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'arrow up',
        line: (
          <svg
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 16.53 9.47 L 10.53 3.47 L 10 2.94 L 9.469 3.47 L 3.469 9.47 L 4.529 10.53 L 9.249 5.81 L 9.249 16 L 10.749 16 L 10.749 5.81 L 15.469 10.53 L 16.529 9.47 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'notification',
        line: (
          <svg
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 1 3.5 C 1 2.119 2.119 1 3.5 1 L 16.5 1 C 17.881 1 19 2.119 19 3.5 L 19 16.5 C 19 17.881 17.881 19 16.5 19 L 3.5 19 C 2.119 19 1 17.881 1 16.5 Z"
              strokeWidth={stroke}
              stroke={strokeColor}
            ></path>
            <path
              d="M 14 12 L 6 12"
              fill="transparent"
              strokeWidth={stroke}
              stroke={strokeColor}
            ></path>
            <path
              d="M 12 8 L 6 8"
              fill="transparent"
              strokeWidth={stroke}
              stroke={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'alert',
        line: (
          <svg
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 10.25 3 C 6.246 3 3 6.246 3 10.25 C 3 14.254 6.246 17.5 10.25 17.5 C 14.254 17.5 17.5 14.254 17.5 10.25 C 17.5 6.246 14.254 3 10.25 3 Z M 1.5 10.25 C 1.5 5.418 5.418 1.5 10.25 1.5 C 15.082 1.5 19 5.418 19 10.25 C 19 15.082 15.082 19 10.25 19 C 5.418 19 1.5 15.082 1.5 10.25 Z M 11.25 13.25 C 11.25 13.802 10.802 14.25 10.25 14.25 C 9.698 14.25 9.25 13.802 9.25 13.25 C 9.25 12.698 9.698 12.25 10.25 12.25 C 10.802 12.25 11.25 12.698 11.25 13.25 Z M 11 11.25 L 11 5.75 L 9.5 5.75 L 9.5 11.25 Z"
              fill={strokeColor}
            ></path>
            <path d="M 1 1 L 19 1 L 19 19 L 1 19 Z" fill="transparent"></path>
          </svg>
        ),
      },
      {
        name: 'message',
        line: (
          <svg
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 17.75 5 C 17.75 2.929 16.071 1.25 14 1.25 L 6 1.25 C 3.929 1.25 2.25 2.929 2.25 5 L 2.25 19 L 3.75 19 C 3.75 17.757 4.757 16.75 6 16.75 L 14 16.75 C 16.071 16.75 17.75 15.071 17.75 13 Z M 3.75 16 L 3.75 5 C 3.75 3.757 4.757 2.75 6 2.75 L 14 2.75 C 15.243 2.75 16.25 3.757 16.25 5 L 16.25 13 C 16.25 14.243 15.243 15.25 14 15.25 L 6 15.25 C 5.156 15.25 4.377 15.529 3.75 16 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'blank',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          ></svg>
        ),
      },
      {
        name: 'check',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 14.5 6 L 8.53 11.97 L 6.06 9.5 L 5 10.56 L 8 13.56 L 8.53 14.09 L 9.06 13.56 L 15.56 7.06 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'help',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 10 18 C 14.418 18 18 14.418 18 10 C 18 5.582 14.418 2 10 2 C 5.582 2 2 5.582 2 10 C 2 14.418 5.582 18 10 18 Z"
              fill={fillColor}
            ></path>
            <path
              d="M 11 13 C 11 13.552 10.552 14 10 14 C 9.448 14 9 13.552 9 13 C 9 12.448 9.448 12 10 12 C 10.552 12 11 12.448 11 13 Z M 8.75 8 C 8.75 7.31 9.31 6.75 10 6.75 C 10.69 6.75 11.25 7.31 11.25 8 C 11.25 8.69 10.69 9.25 10 9.25 L 9.25 9.25 L 9.25 11 L 10.75 11 L 10.75 10.646 C 12.118 10.259 12.966 8.893 12.706 7.496 C 12.446 6.098 11.163 5.129 9.748 5.26 C 8.332 5.39 7.249 6.578 7.25 8 Z"
              fill={strokeColor}
            ></path>
            <path
              d="M 1 10 C 1 5.029 5.029 1 10 1 C 14.971 1 19 5.029 19 10 C 19 14.971 14.971 19 10 19 C 5.029 19 1 14.971 1 10 Z M 10 17.5 C 14.142 17.5 17.5 14.142 17.5 10 C 17.5 5.858 14.142 2.5 10 2.5 C 5.858 2.5 2.5 5.858 2.5 10 C 2.5 14.142 5.858 17.5 10 17.5 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'menu',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18 6.25H2v1.5h16v-1.5Zm0 6H2v1.5h16v-1.5Z"
              fill={strokeColor}
            />
          </svg>
        ),
      },
      {
        name: 'attach',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <g clipPath="url(#a)">
              <path
                d="m8 13 4-4a1.414 1.414 0 1 0-2-2l-6 6a2.828 2.828 0 1 0 4 4l7.5-7.5a4.243 4.243 0 1 0-6-6L4 9"
                stroke={strokeColor}
                strokeWidth={stroke}
              />
            </g>
            <defs>
              <clipPath id="a">
                <path
                  fill="transparent"
                  transform="translate(1 1)"
                  d="M0 0h18v18H0z"
                />
              </clipPath>
            </defs>
          </svg>
        ),
      },
      {
        name: 'ctrl key',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height={size}
            viewBox="0 0 33 24"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
          >
            <path d="M 0 0 L 33 0 L 33 24 L 0 24 Z" fill="transparent"></path>
            <g transform="translate(3 2.998)">
              <path
                d="M 8.646 12.49 C 9.898 12.49 10.445 11.717 10.879 11.717 C 11.125 11.717 11.288 11.911 11.288 12.213 C 11.288 12.757 10.107 13.409 8.646 13.409 C 6.239 13.409 5 11.268 5 9.032 C 5 6.795 6.239 4.654 8.705 4.654 C 10.178 4.654 11.112 5.475 11.112 5.911 C 11.112 6.188 10.949 6.42 10.691 6.42 C 10.224 6.42 9.99 5.574 8.705 5.574 C 6.86 5.574 6.098 7.387 6.098 9.032 C 6.098 10.677 6.882 12.49 8.644 12.49 Z M 13.062 5.513 C 13.062 5.163 13.262 4.944 13.576 4.944 C 13.89 4.944 14.089 5.161 14.089 5.513 L 14.089 6.904 L 14.511 6.904 C 14.849 6.904 15.024 7.072 15.024 7.362 C 15.024 7.652 14.849 7.82 14.511 7.82 L 14.089 7.82 L 14.089 12.838 C 14.089 13.188 13.89 13.407 13.576 13.407 C 13.262 13.407 13.062 13.19 13.062 12.838 L 13.062 7.823 L 12.641 7.823 C 12.303 7.823 12.127 7.654 12.127 7.364 C 12.127 7.075 12.303 6.906 12.641 6.906 L 13.062 6.906 L 13.062 5.516 Z M 16.263 7.4 C 16.263 7.05 16.463 6.83 16.777 6.83 C 17.091 6.83 17.29 7.047 17.29 7.4 L 17.29 7.944 L 17.315 7.944 C 17.549 7.448 18.121 6.83 18.717 6.83 C 19.08 6.83 19.289 7.072 19.289 7.375 C 19.289 7.677 19.08 7.871 18.646 7.954 C 18.038 8.062 17.29 8.533 17.29 9.78 L 17.29 12.84 C 17.29 13.19 17.091 13.409 16.777 13.409 C 16.463 13.409 16.263 13.193 16.263 12.84 Z M 21.463 12.84 C 21.463 13.19 21.263 13.409 20.949 13.409 C 20.635 13.409 20.436 13.193 20.436 12.84 L 20.436 4.571 C 20.436 4.221 20.635 4.002 20.949 4.002 C 21.263 4.002 21.463 4.219 21.463 4.571 Z"
                fill={strokeColor}
                strokeWidth="0.5"
                stroke={strokeColor}
                strokeMiterlimit="10"
                strokeDasharray=""
              ></path>
              <path
                d="M 0 14.98 L 0 3.032 C 0 1.018 1.026 0.001 3.07 0 L 7 0 L 7 0.002 L 21.965 0 L 23.93 0 C 25.983 0 27 1.017 27 3.031 L 27 14.981 C 27 16.994 25.984 18.001 23.93 18.001 L 21.965 18.001 L 7 18.002 L 7 18.001 L 3.07 18.001 C 1.026 18.001 0 16.994 0 14.98 Z M 3.09 1.576 C 2.112 1.576 1.574 2.104 1.574 3.12 L 1.574 14.891 C 1.574 15.909 2.112 16.426 3.09 16.426 L 7 16.427 L 7 16.43 L 21.955 16.428 L 23.91 16.428 C 24.878 16.428 25.426 15.909 25.426 14.893 L 25.426 3.12 C 25.426 2.104 24.878 1.576 23.91 1.576 L 21.955 1.576 L 7 1.58 L 7 1.576 Z"
                fill={strokeColor}
                opacity={opacity}
              ></path>
            </g>
          </svg>
        ),
      },
      {
        name: 'g key',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
          >
            <path d="M 0 0 L 24 0 L 24 24 L 0 24 Z" fill="transparent"></path>
            <g transform="translate(3 2.998)">
              <path
                d="M 3.07 18.001 L 14.93 18.001 C 16.984 18.001 18 16.994 18 14.981 L 18 3.031 C 18 1.017 16.983 0 14.93 0 L 3.07 0 C 1.026 0.001 0 1.018 0 3.032 L 0 14.98 C 0 16.994 1.026 18.001 3.07 18.001 Z M 3.09 16.426 C 2.112 16.426 1.574 15.909 1.574 14.891 L 1.574 3.12 C 1.574 2.104 2.112 1.576 3.09 1.576 L 14.91 1.576 C 15.878 1.576 16.426 2.104 16.426 3.12 L 16.426 14.893 C 16.426 15.909 15.878 16.428 14.91 16.428 Z"
                fill={strokeColor}
                opacity={opacity}
              ></path>
              <path
                d="M 9.044 13.581 C 11.43 13.581 12.847 12.184 12.847 10.169 L 12.847 9.456 C 12.847 8.927 12.534 8.615 12.026 8.615 L 9.513 8.615 C 9.152 8.615 8.937 8.849 8.937 9.182 C 8.937 9.475 9.152 9.739 9.513 9.739 L 11.293 9.739 L 11.293 10.375 C 11.293 11.528 10.54 12.291 9.063 12.291 C 7.49 12.291 6.444 10.952 6.444 8.908 C 6.444 6.884 7.48 5.515 9.034 5.515 C 10.139 5.515 10.961 6.043 11.362 7.011 C 11.527 7.344 11.713 7.481 12.016 7.481 C 12.417 7.481 12.681 7.226 12.681 6.816 C 12.681 6.649 12.662 6.522 12.593 6.365 C 12.134 5.134 10.833 4.224 9.014 4.224 C 6.483 4.224 4.859 6.053 4.859 8.908 C 4.859 11.773 6.483 13.581 9.044 13.581 Z"
                fill={strokeColor}
                opacity={opacity}
              ></path>
            </g>
          </svg>
        ),
      },
      {
        name: 'cmd key',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
          >
            <path d="M 0 0 L 24 0 L 24 24 L 0 24 Z" fill="transparent"></path>
            <g transform="translate(3 2.998)">
              <path
                d="M 3.07 18.001 L 14.93 18.001 C 16.984 18.001 18 16.994 18 14.981 L 18 3.031 C 18 1.017 16.983 0 14.93 0 L 3.07 0 C 1.026 0.001 0 1.018 0 3.032 L 0 14.98 C 0 16.994 1.026 18.001 3.07 18.001 Z M 3.09 16.426 C 2.112 16.426 1.574 15.909 1.574 14.891 L 1.574 3.12 C 1.574 2.104 2.112 1.576 3.09 1.576 L 14.91 1.576 C 15.878 1.576 16.426 2.104 16.426 3.12 L 16.426 14.893 C 16.426 15.909 15.878 16.428 14.91 16.428 Z"
                fill={strokeColor}
                opacity={opacity}
              ></path>
              <path
                d="M 6.708 8.096 L 6.708 9.905 L 5.974 9.905 C 5.426 9.901 4.9 10.116 4.511 10.501 C 4.122 10.886 3.902 11.411 3.901 11.959 C 3.898 12.51 4.115 13.04 4.504 13.431 C 4.893 13.823 5.422 14.042 5.974 14.041 C 7.119 14.033 8.044 13.104 8.047 11.959 L 8.047 11.216 L 9.826 11.216 L 9.826 11.959 C 9.826 13.105 10.753 14.036 11.899 14.041 C 12.45 14.04 12.979 13.82 13.367 13.43 C 13.756 13.039 13.974 12.51 13.972 11.959 C 13.972 10.824 13.043 9.906 11.899 9.906 L 11.157 9.906 L 11.157 8.096 L 11.899 8.096 C 12.448 8.097 12.975 7.881 13.364 7.494 C 13.752 7.107 13.971 6.581 13.972 6.032 C 13.971 4.888 13.044 3.961 11.899 3.96 C 10.756 3.963 9.83 4.889 9.826 6.032 L 9.826 6.776 L 8.047 6.776 L 8.047 6.033 C 8.04 4.891 7.116 3.967 5.974 3.96 C 5.424 3.958 4.896 4.176 4.507 4.566 C 4.118 4.955 3.9 5.483 3.901 6.033 C 3.9 6.582 4.119 7.109 4.508 7.497 C 4.897 7.884 5.425 8.1 5.974 8.096 Z M 8.047 9.915 L 8.047 8.086 L 9.826 8.086 L 9.826 9.914 Z M 5.974 6.787 C 5.774 6.788 5.581 6.709 5.44 6.568 C 5.298 6.426 5.219 6.233 5.221 6.033 C 5.221 5.633 5.563 5.281 5.974 5.281 C 6.374 5.281 6.708 5.633 6.708 6.033 L 6.708 6.787 Z M 11.899 6.787 L 11.157 6.787 L 11.157 6.033 C 11.157 5.633 11.499 5.281 11.899 5.281 C 12.3 5.281 12.652 5.633 12.652 6.033 C 12.652 6.454 12.31 6.787 11.899 6.787 Z M 5.974 11.196 L 6.708 11.196 L 6.708 11.949 C 6.708 12.359 6.375 12.692 5.965 12.692 C 5.554 12.692 5.221 12.359 5.221 11.949 C 5.221 11.548 5.563 11.196 5.974 11.196 Z M 11.899 11.196 C 12.3 11.196 12.652 11.548 12.652 11.949 C 12.652 12.369 12.31 12.702 11.899 12.702 C 11.487 12.697 11.155 12.361 11.157 11.949 L 11.157 11.196 Z"
                fill={strokeColor}
                opacity={opacity}
              ></path>
            </g>
          </svg>
        ),
      },
      {
        name: 'person',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.5 5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM14 5a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM3.5 13v-.5h13v.5a4.5 4.5 0 0 1-4.5 4.5H8A4.5 4.5 0 0 1 3.5 13ZM2 13v-.5A1.5 1.5 0 0 1 3.5 11h13a1.5 1.5 0 0 1 1.5 1.5v.5a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6Z"
              fill={strokeColor}
            />
          </svg>
        ),
      },
      {
        name: 'upload',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <g transform="translate(1 0.94)">
              <path
                d="M 0 0.06 L 18 0.06 L 18 18.06 L 0 18.06 Z"
                fill="transparent"
              ></path>
              <path
                d="M 9.53 0.53 L 14.53 5.53 L 13.47 6.59 L 9.75 2.87 L 9.75 13.06 L 8.25 13.06 L 8.25 2.87 L 4.53 6.59 L 3.47 5.53 L 8.47 0.53 L 9 0 Z M 1 13.06 L 1 15.56 C 1 16.388 1.672 17.06 2.5 17.06 L 15.5 17.06 C 16.328 17.06 17 16.388 17 15.56 L 17 13.06 L 15.5 13.06 L 15.5 15.56 L 2.5 15.56 L 2.5 13.06 Z"
                fill={strokeColor}
              ></path>
            </g>
          </svg>
        ),
      },
      {
        name: 'download',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="m10.75 12.19 3.72-3.72 1.06 1.06-5 5-.53.53-.53-.53-5-5 1.06-1.06 3.72 3.72V2h1.5v10.19ZM2 14v2.5A1.5 1.5 0 0 0 3.5 18h13a1.5 1.5 0 0 0 1.5-1.5V14h-1.5v2.5h-13V14H2Z"
              fill={strokeColor}
            />
          </svg>
        ),
      },
      {
        name: 'check circle',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path d="M 1 1 L 19 1 L 19 19 L 1 19 Z" fill="transparent"></path>
            <path
              d="M 12.97 6.97 L 9 10.94 L 7.03 8.97 L 5.97 10.03 L 8.47 12.53 L 9 13.06 L 9.53 12.53 L 14.03 8.03 Z"
              fill={strokeColor}
            ></path>
            <path
              d="M 19 10 C 19 14.971 14.971 19 10 19 C 5.029 19 1 14.971 1 10 C 1 5.029 5.029 1 10 1 C 14.971 1 19 5.029 19 10 Z M 10 2.5 C 5.858 2.5 2.5 5.858 2.5 10 C 2.5 14.142 5.858 17.5 10 17.5 C 14.142 17.5 17.5 14.142 17.5 10 C 17.5 5.858 14.142 2.5 10 2.5 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'share',
        line: (
          <svg
            width="20"
            height="20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 7c-5.063 0-8 4.03-8 9 1.222-1.2 3-3 8-3v3l6-6-6-6v3Z"
              stroke={strokeColor}
              strokeWidth={stroke}
            />
          </svg>
        ),
      },
      {
        name: 'g-p assist',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 22 22"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <g>
              <defs>
                <linearGradient
                  id="iddX7xoI2TUg1057052775"
                  x1="0.49751243781094523"
                  x2="0.5024875621890548"
                  y1="0"
                  y2="1"
                >
                  <stop
                    offset="0"
                    stopColor={
                      theme.name === 'lightMode'
                        ? 'rgba(106, 245, 255,1)'
                        : 'rgba(0,200,244,1)'
                    }
                    stopOpacity="1"
                  ></stop>
                  <stop
                    offset="0.50"
                    stopColor={
                      theme.name === 'lightMode'
                        ? 'rgb(0, 0, 255)'
                        : theme.lyraColors['core-button-primary']
                    }
                    stopOpacity="1"
                  ></stop>
                  <stop
                    offset="1"
                    stopColor={
                      theme.name === 'lightMode'
                        ? 'rgba(106, 245, 255,1)'
                        : 'rgba(0,200,244,1)'
                    }
                    stopOpacity="1"
                  ></stop>
                </linearGradient>
              </defs>
              <path
                d="M 10.5 0.016 C 10.509 4.815 14.401 8.7 19.2 8.7 L 19.2 10.5 C 14.395 10.5 10.5 14.395 10.5 19.2 L 8.7 19.2 C 8.7 14.401 4.815 10.509 0.016 10.5 L 0 10.5 L 0 8.7 L 0.016 8.7 C 4.808 8.691 8.691 4.808 8.7 0.016 L 8.7 0 L 10.5 0 Z M 9.6 14.94 C 10.659 12.562 12.562 10.659 14.94 9.6 C 12.562 8.541 10.659 6.638 9.6 4.26 C 8.541 6.639 6.639 8.541 4.26 9.6 C 6.638 10.659 8.541 12.562 9.6 14.94 Z"
                transform="translate(1.4 1.4) rotate(90 9.6 9.6)"
                fill="url(#iddX7xoI2TUg1057052775)"
              ></path>
            </g>
            <path
              d="M 18.2 5 C 18.863 5 19.4 4.463 19.4 3.8 C 19.4 3.137 18.863 2.6 18.2 2.6 C 17.537 2.6 17 3.137 17 3.8 C 17 4.463 17.537 5 18.2 5 Z"
              fill={
                theme.name === 'lightMode'
                  ? theme.lyraColors['core-button-primary']
                  : 'rgba(0,200,244,1)'
              }
            ></path>
            <path
              d="M 3.8 19.4 C 4.463 19.4 5 18.863 5 18.2 C 5 17.537 4.463 17 3.8 17 C 3.137 17 2.6 17.537 2.6 18.2 C 2.6 18.863 3.137 19.4 3.8 19.4 Z"
              fill={
                theme.name === 'lightMode'
                  ? theme.lyraColors['core-button-primary']
                  : 'rgba(0,200,244,1)'
              }
            ></path>
          </svg>
        ),
      },
      {
        name: 'search',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 10 9 C 10 9.552 9.552 10 9 10 C 8.448 10 8 9.552 8 9 C 8 8.448 8.448 8 9 8 C 9.552 8 10 8.448 10 9 Z"
              fill={strokeColor}
            ></path>
            <path
              d="M 18.53 17.47 L 17.47 18.531 L 13.392 14.451 C 10.495 16.785 6.278 16.445 3.793 13.677 C 1.307 10.909 1.42 6.681 4.051 4.05 C 6.682 1.419 10.91 1.306 13.678 3.792 C 16.446 6.277 16.786 10.494 14.452 13.391 Z M 9 14.5 C 12.038 14.5 14.5 12.038 14.5 9 C 14.5 5.962 12.038 3.5 9 3.5 C 5.962 3.5 3.5 5.962 3.5 9 C 3.5 12.038 5.962 14.5 9 14.5 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'x',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <g transform="translate(1 1)">
              <path d="M 0 0 L 18 0 L 18 18 L 0 18 Z" fill="transparent"></path>
              <path
                d="M 7.94 9 L 3.47 13.47 L 4.53 14.53 L 9 10.06 L 13.47 14.53 L 14.53 13.47 L 10.06 9 L 14.53 4.53 L 13.47 3.47 L 9 7.94 L 4.53 3.47 L 3.47 4.53 Z"
                fill={strokeColor}
              ></path>
            </g>
          </svg>
        ),
      },
      {
        name: 'plus',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 9.25 10.75 L 9.25 16 L 10.75 16 L 10.75 10.75 L 16 10.75 L 16 9.25 L 10.75 9.25 L 10.75 4 L 9.25 4 L 9.25 9.25 L 4 9.25 L 4 10.75 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'plus circle',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 1 10 C 1 5.029 5.029 1 10 1 C 14.971 1 19 5.029 19 10 C 19 14.971 14.971 19 10 19 C 5.029 19 1 14.971 1 10 Z M 10 17.5 C 14.142 17.5 17.5 14.142 17.5 10 C 17.5 5.858 14.142 2.5 10 2.5 C 5.858 2.5 2.5 5.858 2.5 10 C 2.5 14.142 5.858 17.5 10 17.5 Z"
              fill={strokeColor}
            ></path>
            <path
              d="M 10.75 9.25 L 14 9.25 L 14 10.75 L 10.75 10.75 L 10.75 14 L 9.25 14 L 9.25 10.75 L 6 10.75 L 6 9.25 L 9.25 9.25 L 9.25 6 L 10.75 6 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'chevron down',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path d="m5 8 5 5 5-5" stroke={strokeColor} strokeWidth={stroke} />
          </svg>
        ),
      },
      {
        name: 'chevron up',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="m15 12-5-5-5 5"
              stroke={strokeColor}
              strokeWidth={stroke}
            />
          </svg>
        ),
      },
      {
        name: 'checked',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.5 2A1.5 1.5 0 0 0 2 3.5v13A1.5 1.5 0 0 0 3.5 18h13a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 16.5 2h-13Zm9.47 4.97L9 10.94 7.03 8.97l-1.06 1.06 2.5 2.5.53.53.53-.53 4.5-4.5-1.06-1.06Z"
              fill={strokeColor}
            />
          </svg>
        ),
      },
      {
        name: 'unchecked',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <rect
              x="2.75"
              y="2.75"
              width="14.5"
              height="14.5"
              rx=".75"
              stroke={strokeColor}
              strokeWidth={stroke}
            />
          </svg>
        ),
      },
      {
        name: 'partial',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <rect
              x="2"
              y="2"
              width="16"
              height="16"
              rx="1.5"
              fill={strokeColor}
            />
            <path
              d="M14 10H6"
              stroke={theme.lyraColors['core-surface-primary']}
              strokeWidth={stroke}
            />
          </svg>
        ),
      },
      {
        name: 'search',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9 14.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Zm5.452-1.109a7 7 0 1 0-1.06 1.06l4.078 4.08 1.06-1.061-4.078-4.079ZM10 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
              fill={strokeColor}
            />
          </svg>
        ),
      },
      {
        name: 'filter',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 4.25h16v1.5H2v-1.5Zm3 5h10v1.5H5v-1.5Zm7 5H8v1.5h4v-1.5Z"
              fill={strokeColor}
            />
          </svg>
        ),
      },
      {
        name: 'more',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 4 11.5 C 3.31 11.5 2.75 10.94 2.75 10.25 C 2.75 9.56 3.31 9 4 9 C 4.69 9 5.25 9.56 5.25 10.25 C 5.25 10.94 4.69 11.5 4 11.5 Z M 10 11.5 C 9.31 11.5 8.75 10.94 8.75 10.25 C 8.75 9.56 9.31 9 10 9 C 10.69 9 11.25 9.56 11.25 10.25 C 11.25 10.94 10.69 11.5 10 11.5 Z M 14.75 10.25 C 14.75 10.94 15.31 11.5 16 11.5 C 16.69 11.5 17.25 10.94 17.25 10.25 C 17.25 9.56 16.69 9 16 9 C 15.31 9 14.75 9.56 14.75 10.25 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'people',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <g clipPath="url(#a)">
              <path
                d="M11 18v.75V18Zm.003 0v.75V18ZM10 18h-.75v.75H10V18Zm8-4.124.656.364.094-.17v-.194H18Zm-7 4.874h.002v-1.5H11v1.5Zm-1 0h1v-1.5h-1v1.5Zm-.75-6.25V18h1.5v-5.5h-1.5Zm1.25-1.25c-.69 0-1.25.56-1.25 1.25h1.5a.25.25 0 0 1-.25.25v-1.5Zm7 0h-7v1.5h7v-1.5Zm1.25 1.25c0-.69-.56-1.25-1.25-1.25v1.5a.25.25 0 0 1-.25-.25h1.5Zm0 1.376V12.5h-1.5v1.376h1.5Zm-7.747 4.874a8.748 8.748 0 0 0 7.653-4.51l-1.312-.728a7.248 7.248 0 0 1-6.342 3.738v1.5Z"
                fill={strokeColor}
              />
              <path
                d="M9 18v.75V18Zm-.004 0v.75V18ZM10 18h.75v.75H10V18ZM2 9.5h-.75H2Zm0 4.376-.656.364-.094-.17v-.194H2Zm7 4.874h-.004v-1.5H9v1.5Zm1 0H9v-1.5h1v1.5Zm.75-9.25V18h-1.5V9.5h1.5ZM9.5 8.25c.69 0 1.25.56 1.25 1.25h-1.5c0 .138.112.25.25.25v-1.5Zm-7 0h7v1.5h-7v-1.5ZM1.25 9.5c0-.69.56-1.25 1.25-1.25v1.5a.25.25 0 0 0 .25-.25h-1.5Zm0 4.376V9.5h1.5v4.376h-1.5Zm7.746 4.874a8.748 8.748 0 0 1-7.652-4.51l1.312-.728a7.248 7.248 0 0 0 6.34 3.738v1.5Z"
                fill={strokeColor}
              />
              <circle
                cx="6"
                cy="4"
                r="2"
                stroke={strokeColor}
                strokeWidth={stroke}
              />
              <circle
                cx="14"
                cy="6"
                r="2"
                stroke={strokeColor}
                strokeWidth={stroke}
              />
            </g>
            <defs>
              <clipPath id="a">
                <path
                  fill="#fff"
                  transform="translate(1 1)"
                  d="M0 0h18v18H0z"
                />
              </clipPath>
            </defs>
          </svg>
        ),
      },
      {
        name: 'wallet',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 18 18"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 7 8 C 7.552 8 8 8.448 8 9 C 8 9.552 7.552 10 7 10 C 6.448 10 6 9.552 6 9 C 6 8.448 6.448 8 7 8 Z"
              fill={strokeColor}
            ></path>
            <path
              d="M 15.5 2 L 2.5 2 C 2.224 2 2 2.224 2 2.5 L 2 15.5 C 2 15.776 2.224 16 2.5 16 L 15.5 16 C 15.776 16 16 15.776 16 15.5 L 16 2.5 C 16 2.224 15.776 2 15.5 2 Z"
              fill="transparent"
              strokeWidth={stroke}
              stroke={strokeColor}
              strokeMiterlimit="10"
              strokeDasharray=""
            ></path>
            <path
              d="M 17 10.6 L 17 7.4 C 17 7.179 16.821 7 16.6 7 L 13 7 C 11.895 7 11 7.895 11 9 C 11 10.105 11.895 11 13 11 L 16.6 11 C 16.821 11 17 10.821 17 10.6 Z"
              fill={theme.lyraColors['core-surface-primary']}
              strokeWidth={stroke}
              stroke={strokeColor}
              strokeMiterlimit="10"
              strokeDasharray=""
            ></path>
          </svg>
        ),
      },
      {
        name: 'invoice',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.5 5.5v-3h-8v15h11v-12h-3Zm3 13.5h-11A1.5 1.5 0 0 1 3 17.5v-15A1.5 1.5 0 0 1 4.5 1h8A1.5 1.5 0 0 1 14 2.5V4h1.5A1.5 1.5 0 0 1 17 5.5v12a1.5 1.5 0 0 1-1.5 1.5Zm-5-4.25H6v-1.5h4.5v1.5Zm-4.5-4h4.5v-1.5H6v1.5Zm8-.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-1 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
              fill={strokeColor}
            />
          </svg>
        ),
      },
      {
        name: 'payment',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.5 4.5h15v2.75h-15V4.5Zm0 4.25v6.75h15V8.75h-15ZM17.5 3h-15A1.5 1.5 0 0 0 1 4.5v11A1.5 1.5 0 0 0 2.5 17h15a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 17.5 3ZM14 13a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm-2 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
              fill={strokeColor}
            />
          </svg>
        ),
      },
      {
        name: 'heart',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <g clipPath="url(#a)">
              <path
                d="M11 10a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                fill={strokeColor}
              />
              <path
                d="M2 7c0 6 8 11 8 11s8-5 8-11c0-3-1.79-5-4-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4C3.79 2 2 4 2 7Z"
                stroke={strokeColor}
                strokeWidth={stroke}
              />
            </g>
            <defs>
              <clipPath id="a">
                <path
                  fill="transparent"
                  transform="translate(1 1)"
                  d="M0 0h18v18H0z"
                />
              </clipPath>
            </defs>
          </svg>
        ),
      },
      {
        name: 'clock',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path d="M 1 1 L 19 1 L 19 19 L 1 19 Z" fill="transparent"></path>
            <path
              d="M 10.75 5 L 10.75 9.69 L 13.53 12.47 L 12.47 13.53 L 9.47 10.53 L 9.25 10.31 L 9.25 5 Z"
              fill={strokeColor}
            ></path>
            <path
              d="M 19 10 C 19 14.971 14.971 19 10 19 C 5.029 19 1 14.971 1 10 C 1 5.029 5.029 1 10 1 C 14.971 1 19 5.029 19 10 Z M 10 2.5 C 5.858 2.5 2.5 5.858 2.5 10 C 2.5 14.142 5.858 17.5 10 17.5 C 14.142 17.5 17.5 14.142 17.5 10 C 17.5 5.858 14.142 2.5 10 2.5 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
      {
        name: 'book',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 3.25h-.75v13.5H7A2.25 2.25 0 0 1 9.25 19h1.5A2.25 2.25 0 0 1 13 16.75h5.75V3.25H13a3.744 3.744 0 0 0-3 1.5 3.744 3.744 0 0 0-3-1.5H2ZM9.25 7A2.25 2.25 0 0 0 7 4.75H2.75v10.5H7c.844 0 1.623.279 2.25.75V7Zm1.5 9a3.734 3.734 0 0 1 2.25-.75h4.25V4.75H13A2.25 2.25 0 0 0 10.75 7v9Z"
              fill={strokeColor}
            />
          </svg>
        ),
      },
      {
        name: 'sparkle',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.5 2h.5a7 7 0 0 0 7 7v2a7 7 0 0 0-7 7H9a7 7 0 0 0-7-7V9a7 7 0 0 0 7-7h1.5ZM10 4.88A8.525 8.525 0 0 0 15.12 10 8.525 8.525 0 0 0 10 15.12 8.525 8.525 0 0 0 4.88 10 8.524 8.524 0 0 0 10 4.88ZM17 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM5 16a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
              fill={strokeColor}
            />
          </svg>
        ),
      },
      {
        name: 'inbox',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.5 4.5h15v4.75h-5.25V10a2.25 2.25 0 0 1-4.5 0v-.75H2.5V4.5Zm0 6.25v4.75h15v-4.75h-3.825a3.751 3.751 0 0 1-7.35 0H2.5ZM17.5 3h-15A1.5 1.5 0 0 0 1 4.5v11A1.5 1.5 0 0 0 2.5 17h15a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 17.5 3Z"
              fill={strokeColor}
            />
          </svg>
        ),
      },
      {
        name: 'home',
        line: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            style={{
              cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
            }}
            onClick={(e) => onClick(e)}
            fill="none"
          >
            <path
              d="M 10 13 C 10.552 13 11 12.552 11 12 C 11 11.448 10.552 11 10 11 C 9.448 11 9 11.448 9 12 C 9 12.552 9.448 13 10 13 Z"
              fill={strokeColor}
            ></path>
            <path
              d="M 2 9 L 10 1 L 18 9 L 18 16.5 C 18 17.328 17.328 18 16.5 18 L 3.5 18 C 2.672 18 2 17.328 2 16.5 Z M 16.5 16.5 L 16.5 9.621 L 10 3.121 L 3.5 9.621 L 3.5 16.5 Z"
              fill={strokeColor}
            ></path>
          </svg>
        ),
      },
    ];
  }, [
    stroke,
    size,
    strokeColor,
    fillColor,
    pointer,
    disabled,
    opacity,
    onClick,
    theme,
  ]);

  // get the right icon in the array
  const element = GPIcons.filter((icon: Icon) => {
    return icon.name.toLowerCase() === name.toLowerCase();
  });

  // set the variant to return
  const variant = toggle ? 'lineOn' : 'line';

  // return the svg element or null
  if (element.length > 0) return element[0][variant] || null;
  return null;
}
