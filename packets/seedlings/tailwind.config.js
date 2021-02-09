const colors = require('@sproutsocial/seeds-color/tokens.json');
const networkColors = require('@sproutsocial/seeds-networkcolor');
const typography = require('@sproutsocial/seeds-typography');
const space = require('@sproutsocial/seeds-space');
const border = require('@sproutsocial/seeds-border');
const depth = require('@sproutsocial/seeds-depth');

const GRID_WIDTH = 1248;
const COLUMN_WIDTH = GRID_WIDTH / 12;

function returnPixelValue(value) {
  if (typeof value === 'string' && value.includes('px')) {
    return value.split('px').shift();
  } else {
    return value;
  }
}

function setUnits(size) {
  const remSize = returnPixelValue(size) / returnPixelValue(typography.TYPOGRAPHY_SIZE_400.fontSize);
  return `${remSize}rem`;
}

module.exports = {
  purge: [],
  presets: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '17rem',
      md: '30rem',
      lg: '60rem',
      xl: '82rem',
      '2xl': '96rem'
    },
    colors: Object.assign(
      ...Object.keys(colors.color).map(color => {
        return {
          [color]: Object.assign(
            ...Object.keys(colors.color[color]).map(mappedColor => {
              return {
                [mappedColor]: colors.color[color][mappedColor].value
              };
            })
          )
        };
      }),
      ...Object.keys(networkColors).map(networkColor => {
        return {
          [networkColor
            .split('_')
            .splice(2)
            .join('-')
            .toLowerCase()]: networkColors[networkColor]
        };
      })
    ),
    spacing: {
      0: space.SPACE_SIZE_0,
      100: setUnits(space.SPACE_SIZE_100),
      200: setUnits(space.SPACE_SIZE_200),
      300: setUnits(space.SPACE_SIZE_300),
      350: setUnits(space.SPACE_SIZE_350),
      400: setUnits(space.SPACE_SIZE_400),
      450: setUnits(space.SPACE_SIZE_450),
      500: setUnits(space.SPACE_SIZE_500),
      600: setUnits(space.SPACE_SIZE_600)
    },
    backgroundColor: theme => theme('colors'),
    backgroundOpacity: theme => theme('opacity'),
    borderColor: theme => ({
      ...theme('colors'),
      DEFAULT: theme('colors.neutral.200', 'currentColor')
    }),
    borderOpacity: theme => theme('opacity'),
    borderRadius: {
      none: '0px',
      400: border.BORDER_RADIUS_400,
      500: border.BORDER_RADIUS_500,
      600: border.BORDER_RADIUS_600,
      1000: border.BORDER_RADIUS_1000
    },
    borderWidth: {
      500: border.BORDER_WIDTH_500,
      600: border.BORDER_WIDTH_600,
      700: '5px',
      800: '8px'
    },
    boxShadow: {
      0: 0,
      100: depth.ELEVATION_LEVEL_100,
      200: depth.ELEVATION_LEVEL_200,
      300: depth.ELEVATION_LEVEL_300,
      400: depth.ELEVATION_LEVEL_400
    },
    divideColor: theme => theme('borderColor'),
    divideOpacity: theme => theme('borderOpacity'),
    divideWidth: theme => theme('borderWidth'),
    fill: {current: 'currentColor'},
    fontFamily: {
      DEFAULT: typography.TYPOGRAPHY_FAMILY_PROXIMA,
      system: typography.TYPOGRAPHY_FAMILY,
      recoleta: typography.TYPOGRAPHY_FAMILY_RECOLETA
    },
    fontSize: {
      100: [
        setUnits(typography.TYPOGRAPHY_SIZE_100.fontSize),
        {
          lineHeight: setUnits(typography.TYPOGRAPHY_SIZE_100.lineHeight)
        }
      ],
      200: [
        setUnits(typography.TYPOGRAPHY_SIZE_200.fontSize),
        {
          lineHeight: setUnits(typography.TYPOGRAPHY_SIZE_200.lineHeight)
        }
      ],
      300: [
        setUnits(typography.TYPOGRAPHY_SIZE_300.fontSize),
        {
          lineHeight: setUnits(typography.TYPOGRAPHY_SIZE_300.lineHeight)
        }
      ],
      400: [
        setUnits(typography.TYPOGRAPHY_SIZE_400.fontSize),
        {
          lineHeight: setUnits(typography.TYPOGRAPHY_SIZE_400.lineHeight)
        }
      ],
      500: [
        setUnits(typography.TYPOGRAPHY_SIZE_500.fontSize),
        {
          lineHeight: setUnits(typography.TYPOGRAPHY_SIZE_500.lineHeight)
        }
      ],
      600: [
        setUnits(typography.TYPOGRAPHY_SIZE_600.fontSize),
        {
          lineHeight: setUnits(typography.TYPOGRAPHY_SIZE_600.lineHeight)
        }
      ],
      700: [
        setUnits(typography.TYPOGRAPHY_SIZE_700.fontSize),
        {
          lineHeight: setUnits(typography.TYPOGRAPHY_SIZE_700.lineHeight)
        }
      ],
      800: [
        setUnits(typography.TYPOGRAPHY_SIZE_800.fontSize),
        {
          lineHeight: setUnits(typography.TYPOGRAPHY_SIZE_800.lineHeight)
        }
      ],
      900: [
        setUnits(typography.TYPOGRAPHY_SIZE_900.fontSize),
        {
          lineHeight: setUnits(typography.TYPOGRAPHY_SIZE_900.lineHeight)
        }
      ],
      1000: [
        setUnits(typography.TYPOGRAPHY_SIZE_1000.fontSize),
        {
          lineHeight: setUnits(typography.TYPOGRAPHY_SIZE_1000.lineHeight)
        }
      ],
      1100: [
        setUnits(typography.TYPOGRAPHY_SIZE_1100.fontSize),
        {
          lineHeight: setUnits(typography.TYPOGRAPHY_SIZE_1100.lineHeight)
        }
      ],
      1200: [
        setUnits(typography.TYPOGRAPHY_SIZE_1200.fontSize),
        {
          lineHeight: setUnits(typography.TYPOGRAPHY_SIZE_1200.lineHeight)
        }
      ]
    },
    fontWeight: {
      normal: typography.TYPOGRAPHY_WEIGHT_NORMAL,
      semibold: typography.TYPOGRAPHY_WEIGHT_SEMIBOLD,
      bold: typography.TYPOGRAPHY_WEIGHT_BOLD,
      extrabold: typography.TYPOGRAPHY_WEIGHT_EXTRA_BOLD
    },
    gap: theme => theme('spacing'),
    gradientColorStops: theme => theme('colors'),
    gridAutoColumns: {
      auto: 'auto',
      min: 'min-content',
      max: 'max-content',
      fr: 'minmax(0, 1fr)'
    },
    gridAutoRows: {
      auto: 'auto',
      min: 'min-content',
      max: 'max-content',
      fr: 'minmax(0, 1fr)'
    },
    gridColumn: {
      auto: 'auto',
      'span-1': 'span 1 / span 1',
      'span-2': 'span 2 / span 2',
      'span-3': 'span 3 / span 3',
      'span-4': 'span 4 / span 4',
      'span-5': 'span 5 / span 5',
      'span-6': 'span 6 / span 6',
      'span-7': 'span 7 / span 7',
      'span-8': 'span 8 / span 8',
      'span-9': 'span 9 / span 9',
      'span-10': 'span 10 / span 10',
      'span-11': 'span 11 / span 11',
      'span-12': 'span 12 / span 12',
      'span-full': '1 / -1'
    },
    gridColumnEnd: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      13: '13'
    },
    gridColumnStart: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      13: '13'
    },
    gridRow: {
      auto: 'auto',
      'span-1': 'span 1 / span 1',
      'span-2': 'span 2 / span 2',
      'span-3': 'span 3 / span 3',
      'span-4': 'span 4 / span 4',
      'span-5': 'span 5 / span 5',
      'span-6': 'span 6 / span 6',
      'span-full': '1 / -1'
    },
    gridRowStart: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7'
    },
    gridRowEnd: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7'
    },
    transformOrigin: {
      center: 'center',
      top: 'top',
      'top-right': 'top right',
      right: 'right',
      'bottom-right': 'bottom right',
      bottom: 'bottom',
      'bottom-left': 'bottom left',
      left: 'left',
      'top-left': 'top left'
    },
    gridTemplateColumns: {
      none: 'none',
      1: 'repeat(1, minmax(0, 1fr))',
      2: 'repeat(2, minmax(0, 1fr))',
      3: 'repeat(3, minmax(0, 1fr))',
      4: 'repeat(4, minmax(0, 1fr))',
      5: 'repeat(5, minmax(0, 1fr))',
      6: 'repeat(6, minmax(0, 1fr))',
      7: 'repeat(7, minmax(0, 1fr))',
      8: 'repeat(8, minmax(0, 1fr))',
      9: 'repeat(9, minmax(0, 1fr))',
      10: 'repeat(10, minmax(0, 1fr))',
      11: 'repeat(11, minmax(0, 1fr))',
      12: 'repeat(12, minmax(0, 1fr))'
    },
    gridTemplateRows: {
      none: 'none',
      1: 'repeat(1, minmax(0, 1fr))',
      2: 'repeat(2, minmax(0, 1fr))',
      3: 'repeat(3, minmax(0, 1fr))',
      4: 'repeat(4, minmax(0, 1fr))',
      5: 'repeat(5, minmax(0, 1fr))',
      6: 'repeat(6, minmax(0, 1fr))'
    },
    height: theme => ({
      auto: 'auto',
      ...theme('spacing'),
      700: setUnits(2 * returnPixelValue(space.SPACE_SIZE_600)),
      750: setUnits(2 * (returnPixelValue(space.SPACE_SIZE_600) + returnPixelValue(space.SPACE_SIZE_300))),
      800: setUnits(3 * returnPixelValue(space.SPACE_SIZE_600)),
      900: setUnits(5 * returnPixelValue(space.SPACE_SIZE_600)),
      1000: setUnits(8 * returnPixelValue(space.SPACE_SIZE_600)),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      full: '100%',
      screen: '100vh'
    }),
    inset: (theme, {negative}) => ({
      auto: 'auto',
      ...theme('spacing'),
      ...negative(theme('spacing')),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      full: '100%',
      '-1/2': '-50%',
      '-1/3': '-33.333333%',
      '-2/3': '-66.666667%',
      '-1/4': '-25%',
      '-2/4': '-50%',
      '-3/4': '-75%',
      '-full': '-100%'
    }),
    keyframes: {
      spin: {
        to: {
          transform: 'rotate(360deg)'
        }
      },
      ping: {
        '75%, 100%': {
          transform: 'scale(2)',
          opacity: '0'
        }
      },
      pulse: {
        '50%': {
          opacity: '.5'
        }
      },
      bounce: {
        '0%, 100%': {
          transform: 'translateY(-25%)',
          animationTimingFunction: 'cubic-bezier(0.8,0,1,1)'
        },
        '50%': {
          transform: 'none',
          animationTimingFunction: 'cubic-bezier(0,0,0.2,1)'
        }
      }
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em'
    },
    lineHeight: {
      none: '1',
      100: setUnits(typography.TYPOGRAPHY_SIZE_100.lineHeight),
      200: setUnits(typography.TYPOGRAPHY_SIZE_200.lineHeight),
      300: setUnits(typography.TYPOGRAPHY_SIZE_300.lineHeight),
      400: setUnits(typography.TYPOGRAPHY_SIZE_400.lineHeight),
      500: setUnits(typography.TYPOGRAPHY_SIZE_500.lineHeight),
      600: setUnits(typography.TYPOGRAPHY_SIZE_600.lineHeight),
      700: setUnits(typography.TYPOGRAPHY_SIZE_700.lineHeight),
      800: setUnits(typography.TYPOGRAPHY_SIZE_800.lineHeight),
      900: setUnits(typography.TYPOGRAPHY_SIZE_900.lineHeight),
      1000: setUnits(typography.TYPOGRAPHY_SIZE_1000.lineHeight),
      1100: setUnits(typography.TYPOGRAPHY_SIZE_1100.lineHeight),
      1200: setUnits(typography.TYPOGRAPHY_SIZE_1200.lineHeight)
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal'
    },
    margin: (theme, {negative}) => ({
      auto: 'auto',
      ...theme('spacing'),
      ...negative(theme('spacing'))
    }),
    maxHeight: theme => ({
      ...theme('spacing'),
      full: '100%',
      screen: '100vh'
    }),
    maxWidth: (theme, {breakpoints}) => ({
      ...theme('spacing'),
      ...theme('width'),
      none: 'none',
      min: 'min-content',
      max: 'max-content',
      ...breakpoints(theme('screens'))
    }),
    minHeight: {
      0: '0px',
      full: '100%',
      screen: '100vh'
    },
    minWidth: {
      0: '0px',
      full: '100%',
      min: 'min-content',
      max: 'max-content'
    },
    objectPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top'
    },
    opacity: {
      0: '0',
      5: '0.05',
      10: '0.1',
      20: '0.2',
      25: '0.25',
      30: '0.3',
      40: '0.4',
      50: '0.5',
      60: '0.6',
      70: '0.7',
      75: '0.75',
      80: '0.8',
      90: '0.9',
      95: '0.95',
      100: '1'
    },
    order: {
      first: '-9999',
      last: '9999',
      none: '0',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12'
    },
    outline: {
      none: ['2px solid transparent', '2px'],
      white: ['2px dotted white', '2px'],
      black: ['2px dotted black', '2px']
    },
    padding: theme => theme('spacing'),
    placeholderColor: theme => theme('colors'),
    placeholderOpacity: theme => theme('opacity'),
    ringColor: theme => ({
      DEFAULT: theme('colors.blue.500', '#3b82f6'),
      ...theme('colors')
    }),
    ringOffsetColor: theme => theme('colors'),
    ringOffsetWidth: {
      0: '0px',
      1: '1px',
      2: '2px',
      4: '4px',
      8: '8px'
    },
    ringOpacity: theme => ({
      DEFAULT: '0.5',
      ...theme('opacity')
    }),
    ringWidth: {
      DEFAULT: '3px',
      0: '0px',
      1: '1px',
      2: '2px',
      4: '4px',
      8: '8px'
    },
    rotate: {
      '-180': '-180deg',
      '-90': '-90deg',
      '-45': '-45deg',
      '-12': '-12deg',
      '-6': '-6deg',
      '-3': '-3deg',
      '-2': '-2deg',
      '-1': '-1deg',
      0: '0deg',
      1: '1deg',
      2: '2deg',
      3: '3deg',
      6: '6deg',
      12: '12deg',
      45: '45deg',
      90: '90deg',
      180: '180deg'
    },
    scale: {
      0: '0',
      50: '.5',
      75: '.75',
      90: '.9',
      95: '.95',
      100: '1',
      105: '1.05',
      110: '1.1',
      125: '1.25',
      150: '1.5'
    },
    skew: {
      '-12': '-12deg',
      '-6': '-6deg',
      '-3': '-3deg',
      '-2': '-2deg',
      '-1': '-1deg',
      0: '0deg',
      1: '1deg',
      2: '2deg',
      3: '3deg',
      6: '6deg',
      12: '12deg'
    },
    space: (theme, {negative}) => ({
      ...theme('spacing'),
      ...negative(theme('spacing'))
    }),
    stroke: {
      current: 'currentColor'
    },
    strokeWidth: {
      0: '0',
      1: '1',
      2: '2'
    },
    textColor: theme => theme('colors'),
    textOpacity: theme => theme('opacity'),
    transitionDuration: {
      DEFAULT: '150ms',
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms'
    },
    transitionDelay: {
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms'
    },
    transitionProperty: {
      none: 'none',
      all: 'all',
      DEFAULT: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
      colors: 'background-color, border-color, color, fill, stroke',
      opacity: 'opacity',
      shadow: 'box-shadow',
      transform: 'transform'
    },
    transitionTimingFunction: {
      DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    translate: (theme, {negative}) => ({
      ...theme('spacing'),
      ...negative(theme('spacing')),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      full: '100%',
      '-1/2': '-50%',
      '-1/3': '-33.333333%',
      '-2/3': '-66.666667%',
      '-1/4': '-25%',
      '-2/4': '-50%',
      '-3/4': '-75%',
      '-full': '-100%'
    }),
    width: theme => ({
      auto: 'auto',
      ...theme('spacing'),
      650: setUnits(COLUMN_WIDTH * 7),
      700: setUnits(COLUMN_WIDTH * 8),
      750: setUnits(COLUMN_WIDTH * 9),
      800: setUnits(COLUMN_WIDTH * 10),
      850: setUnits(COLUMN_WIDTH * 11),
      900: setUnits(GRID_WIDTH),
      950: setUnits(COLUMN_WIDTH * 13),
      1000: setUnits(COLUMN_WIDTH * 14),
      1050: setUnits(COLUMN_WIDTH * 15),
      1100: setUnits(COLUMN_WIDTH * 16),
      '10p': '10%',
      '20p': '20%',
      '30p': '30%',
      '40p': '40%',
      '50p': '50%',
      '60p': '60%',
      '70p': '80%',
      '80p': '80%',
      '90p': '80%',
      '8p': '8.333333%',
      '16p': '16.666667%',
      '25p': '25%',
      '33p': '33.333333%',
      '41p': '41.666667%',
      '58p': '58.333333%',
      '66p': '66.666667%',
      '75p': '75%',
      '83p': '83.333333%',
      '91p': '91.666667%',
      full: '100%',
      screen: '100vw',
      min: 'min-content',
      max: 'max-content'
    }),
    zIndex: {
      auto: 'auto',
      0: '0',
      10: '10',
      20: '20',
      30: '30',
      40: '40',
      50: '50'
    },
    configViewer: {
      baseFontSize: 18
    }
  },
  variantOrder: [
    'first',
    'last',
    'odd',
    'even',
    'visited',
    'checked',
    'group-hover',
    'group-focus',
    'focus-within',
    'hover',
    'focus',
    'focus-visible',
    'active',
    'disabled'
  ],
  variants: {
    accessibility: ['responsive', 'focus-within', 'focus'],
    alignContent: ['responsive'],
    alignItems: ['responsive'],
    alignSelf: ['responsive'],
    animation: false,
    appearance: ['responsive'],
    backgroundAttachment: ['responsive'],
    backgroundClip: ['responsive'],
    backgroundColor: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
    backgroundImage: ['responsive'],
    backgroundOpacity: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
    backgroundPosition: ['responsive'],
    backgroundRepeat: ['responsive'],
    backgroundSize: ['responsive'],
    borderCollapse: ['responsive'],
    borderColor: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
    borderOpacity: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
    borderRadius: ['responsive'],
    borderStyle: ['responsive'],
    borderWidth: ['responsive'],
    boxShadow: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
    boxSizing: ['responsive'],
    clear: ['responsive'],
    container: ['responsive'],
    cursor: ['responsive'],
    display: ['responsive'],
    divideColor: ['responsive', 'dark'],
    divideOpacity: ['responsive'],
    divideStyle: ['responsive'],
    divideWidth: ['responsive'],
    fill: ['responsive'],
    flex: ['responsive'],
    flexDirection: ['responsive'],
    flexGrow: ['responsive'],
    flexShrink: ['responsive'],
    flexWrap: ['responsive'],
    float: ['responsive'],
    fontFamily: ['responsive'],
    fontSize: ['responsive'],
    fontSmoothing: ['responsive'],
    fontStyle: ['responsive'],
    fontVariantNumeric: ['responsive'],
    fontWeight: ['responsive'],
    gap: ['responsive'],
    gradientColorStops: ['responsive', 'dark', 'hover', 'focus'],
    gridAutoColumns: ['responsive'],
    gridAutoFlow: ['responsive'],
    gridAutoRows: ['responsive'],
    gridColumn: ['responsive'],
    gridColumnEnd: ['responsive'],
    gridColumnStart: ['responsive'],
    gridRow: ['responsive'],
    gridRowEnd: ['responsive'],
    gridRowStart: ['responsive'],
    gridTemplateColumns: ['responsive'],
    gridTemplateRows: ['responsive'],
    height: ['responsive'],
    inset: false,
    justifyContent: ['responsive'],
    justifyItems: ['responsive'],
    justifySelf: ['responsive'],
    letterSpacing: ['responsive'],
    lineHeight: ['responsive'],
    listStylePosition: ['responsive'],
    listStyleType: ['responsive'],
    margin: ['responsive'],
    maxHeight: ['responsive'],
    maxWidth: ['responsive'],
    minHeight: ['responsive'],
    minWidth: ['responsive'],
    objectFit: ['responsive'],
    objectPosition: ['responsive'],
    opacity: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
    order: ['responsive'],
    outline: ['responsive', 'focus-within', 'focus'],
    overflow: ['responsive'],
    overscrollBehavior: ['responsive'],
    padding: ['responsive'],
    placeContent: ['responsive'],
    placeItems: ['responsive'],
    placeSelf: ['responsive'],
    placeholderColor: false,
    placeholderOpacity: false,
    pointerEvents: ['responsive'],
    position: ['responsive'],
    resize: ['responsive'],
    ringColor: false,
    ringOffsetColor: false,
    ringOffsetWidth: false,
    ringOpacity: false,
    ringWidth: false,
    rotate: false,
    scale: false,
    skew: false,
    space: ['responsive'],
    stroke: ['responsive'],
    strokeWidth: false,
    tableLayout: false,
    textAlign: ['responsive'],
    textColor: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
    textDecoration: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
    textOpacity: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
    textOverflow: ['responsive'],
    textTransform: ['responsive'],
    transform: false,
    transformOrigin: false,
    transitionDelay: false,
    transitionDuration: false,
    transitionProperty: false,
    transitionTimingFunction: ['responsive'],
    translate: ['responsive', 'hover', 'focus'],
    userSelect: ['responsive'],
    verticalAlign: ['responsive'],
    visibility: ['responsive'],
    whitespace: ['responsive'],
    width: ['responsive'],
    wordBreak: ['responsive'],
    zIndex: ['responsive', 'focus-within', 'focus']
  },
  plugins: []
};
