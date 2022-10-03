export const descendingComparator = <T extends object>(a: T, b: T, orderBy: string) => {
  const typedOrderByTyped = orderBy as keyof typeof a;
  if (b[typedOrderByTyped] < a[typedOrderByTyped]) {
    return -1;
  }
  if (b[typedOrderByTyped] > a[typedOrderByTyped]) {
    return 1;
  }
  return 0;
};

export const applySortFilter = <T extends object>(
  array: T[],
  comparator: (a: T, T: T) => number,
  sortKey: keyof T,
  query: string
) => {
  const stabilizedThis = array.map((el, index) => [el, index]) as [T, number][];
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  if (query) {
    return array.filter((item) => {
      const value = item[sortKey] as string;
      return value.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  }
  return stabilizedThis.map((el) => el[0]);
};

export const getComparator = <T extends object>(order: string, orderBy: string) => {
  return order === 'desc'
    ? (a: any, b: any) => descendingComparator<T>(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator<T>(a, b, orderBy);
};
