const BREAKPOINTS = {
  XSMALL: 400,
  SMALL: 576,
  MEDIUM: 768,
  LARGE: 992,
  XLARGE: 1200 
}

export class MediaQueryUtil {
  constructor() {
  }

  isXSmallScreen(screenWidth) {
    return screenWidth <= BREAKPOINTS.XSMALL;
  }

  isSmallScreen(screenWidth) {
    return screenWidth <= BREAKPOINTS.SMALL && screenWidth > BREAKPOINTS.XSMALL;
  }

  isMediumScreen(screenWidth) {
    return screenWidth <= BREAKPOINTS.MEDIUM && screenWidth > BREAKPOINTS.SMALL;
  }

  isLargeScreen(screenWidth) {
    return screenWidth <= BREAKPOINTS.LARGE && screenWidth > BREAKPOINTS.MEDIUM;
  }

  isXLargeScreen(screenWidth) {
    return screenWidth <= BREAKPOINTS.XLARGE && screenWidth > BREAKPOINTS.LARGE;
  }
}