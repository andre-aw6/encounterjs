/**************
 * Theme for Styled components
 * This can be used in your styled component to access default variables
 * Exemple:
 * background-color: ${props => props.theme.colors.primary}
 *************/

import { Dimensions, Platform, PixelRatio } from 'react-native';
import config from '../config';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 375;

function actuatedNormalize(size) {
  const newSize = size * scale
  // return size + 'px'
  if (Platform.OS === 'ios') {
    return ( Math.round(PixelRatio.roundToNearestPixel(newSize))) + 'px'
  } else {
    return (Math.round(PixelRatio.roundToNearestPixel(newSize))   )+ 'px'
  }
}

export default {
  colors: {

    ...config.theme.colors,

    primaryColor: '#C1E0DF',
    primaryDarkColor: '#22A19f',
    primaryLightColor: '#EBF5F5',
    secondColor: '#BCBEC0',
    secondDarkColor: '#6D6E71',
    secondLightColor: '#E6E7E8',
    complementColor: '#081C4F',
    lightColor: '#FAFAFA',
    darkColor: '#414042',
    success: '#6FE382',
    warming: '#E39059',
    danger: '#E35959',
  },
  elements:{
    productDetailsImage: .3,
    ...config.theme.elements
  },
  header: {
    height: "50px",
    largeHeight: "80px",
    title: "16px",
    largeTitle: "24px"
  },
  sizes: {


    icons: (18) ,//+ 'px',
    notification: actuatedNormalize(32) ,//+ 'px',

    btnBig: actuatedNormalize(48),
    btn: actuatedNormalize(40),
    btnSmall: actuatedNormalize(32),


    h1: actuatedNormalize(24),
    h2: actuatedNormalize(18),
    h3: actuatedNormalize(16),
    h4: actuatedNormalize(16),

    subtitle1: actuatedNormalize(16),
    subtitle2: actuatedNormalize(14),
    subtitle3: actuatedNormalize(12),

    button1: actuatedNormalize(16),
    button2: actuatedNormalize(14),
    button3: actuatedNormalize(12),
    button4: '11px',

  },
  space: {
    space0: actuatedNormalize(4) ,//+'px',
    space1: actuatedNormalize(8) ,//+'px',
    space2: actuatedNormalize(16),//+ 'px',
    space3: actuatedNormalize(24),//+ 'px',
    space4: actuatedNormalize(32),//+ 'px',
    space5: actuatedNormalize(40),//+ 'px',
  },
  borderRadius: {
    button:  actuatedNormalize(8),
    tag:  actuatedNormalize(20),
  },
  shadow: {
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: { width: '0px', height: '2px' },
    shadowOpacity: .16,
    shadowRadius: '3px',
    elevation: 2,
  },

 
};