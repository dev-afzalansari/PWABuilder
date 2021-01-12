import { css, unsafeCSS, CSSResult } from 'lit-element';

export enum BreakpointValues {
  smallUpper = 479,
  mediumLower = 480,
  mediumUpper = 639,
  largeLower = 640,
  largeUpper = 1023,
  xLargeLower = 1024,
  xLargeUpper = 1365,
  xxLargeLower = 1366,
  xxLargeUpper = 1919,
  xxxLargeLower = 1920,
}

type BoundModification = 'both' | 'no-lower' | 'no-upper';

export function customBreakPoint(
  styles: CSSResult,
  lower: number | undefined = undefined,
  upper: number | undefined = undefined
) {
  if (!lower && !upper) {
    return css`
      @media screen {
        ${styles}
      }
    `;
  }

  return unsafeCSS(`
    @media screen ${breakPoints({ lower, upper })} {
      ${styles}
    }
  `);
}

export function smallBreakPoint(styles: CSSResult) {
  const upper = BreakpointValues.smallUpper;
  return unsafeCSS(`
    @media screen ${breakPoints({ upper })} {
      ${styles}
    }
  `);
}

export function mediumBreakPoint(
  styles: CSSResult,
  editBound: BoundModification = 'both'
) {
  const lower =
    editBound !== 'no-lower' ? BreakpointValues.mediumLower : undefined;
  const upper =
    editBound !== 'no-upper' ? BreakpointValues.mediumUpper : undefined;
  return unsafeCSS(`
    @media screen ${breakPoints({ lower, upper })} {
      ${styles}
    }
  `);
}

export function largeBreakPoint(
  styles: CSSResult,
  editBound: BoundModification = 'both'
) {
  const lower =
    editBound !== 'no-lower' ? BreakpointValues.largeLower : undefined;
  const upper =
    editBound !== 'no-upper' ? BreakpointValues.largeUpper : undefined;
  return unsafeCSS(`
    @media screen ${breakPoints({ lower, upper })} {
      ${styles}
    }
  `);
}

export function xLargeBreakPoint(
  styles: CSSResult,
  editBound: BoundModification = 'both'
) {
  const lower =
    editBound !== 'no-lower' ? BreakpointValues.xLargeLower : undefined;
  const upper =
    editBound !== 'no-upper' ? BreakpointValues.xLargeUpper : undefined;
  return unsafeCSS(`
    @media screen ${breakPoints({ lower, upper })} {
      ${styles}
    }
  `);
}

export function xxLargeBreakPoint(
  styles: CSSResult,
  editBound: BoundModification = 'both'
) {
  const lower =
    editBound !== 'no-lower' ? BreakpointValues.xxLargeLower : undefined;
  const upper =
    editBound !== 'no-upper' ? BreakpointValues.xxLargeUpper : undefined;
  return unsafeCSS(`
    @media screen ${breakPoints({ lower, upper })} {
      ${styles}
    }
  `);
}

export function xxxLargeBreakPoint(styles: CSSResult) {
  const lower = BreakpointValues.xxxLargeLower;
  return unsafeCSS(`
    @media screen ${breakPoints({ lower })} {
      ${styles}
    }
  `);
}

interface Bound {
  lower?: number;
  upper?: number;
}

function breakPoints({ lower, upper }: Bound) {
  const output = [];

  if (lower) {
    output.push(`(min-width: ${lower}px)`);
  }

  if (upper) {
    output.push(`(max-width: ${upper}px)`);
  }

  return 'and ' + output.join(' and ');
}
