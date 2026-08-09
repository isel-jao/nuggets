export const calculateGridColumnWidth = ({
  width = 0,
  cols = 0,
  margin = 0,
}) => {
  return (width - (cols - 1) * margin) / cols;
};
