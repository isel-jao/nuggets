export const toColumnar = (objs: unknown[]) => {
  if (!objs.length) return { columns: [], rows: [] };
  const columns = Object.keys(objs[0] as Record<string, unknown>);
  return {
    columns,
    rows: objs.map((o) =>
      columns.map((c) => (o as Record<string, unknown>)[c]),
    ),
  };
};
