import { sortedBreakpoints } from "./constant";

export function getBreakpointForWidth(width: number) {
  let index = 0;
  for (let i = 0; i < sortedBreakpoints.length; i++) {
    const [_, minWidth] = sortedBreakpoints[i];
    if (width >= minWidth) {
      index = i;
    } else {
      break;
    }
  }
  return sortedBreakpoints[index][0];
}

export const calculateGridColumnWidth = ({
  width = 0,
  cols = 0,
  margin = 0,
}) => {
  return (width - (cols - 1) * margin) / cols;
};
