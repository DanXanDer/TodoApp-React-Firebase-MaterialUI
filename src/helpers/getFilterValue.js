export const getFilterValue = (event, filterOptions) => {
  const filterSelected = filterOptions.some(
    (filter) => filter === event.currentTarget.innerText
  );
  let filterValue = undefined;
  if (filterSelected === true) {
    filterValue = event.currentTarget.innerText;
  }
  return {
    filterValue,
  };
};
