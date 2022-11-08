import _ from "lodash";
import { useState } from "react";

type Paging = { limit: number; offset: number };

type Queries<FilterType, SortingType> = {
  paging: Paging;
  filter?: FilterType;
  sorting?: SortingType;
};

const defaultPaging = { limit: 10, offset: 0 };

const useQueries = <FilterType, SortingType>(
  { paging = defaultPaging, filter, sorting }: Partial<Queries<FilterType, SortingType>> = {
    paging: defaultPaging
  }
): {
  queries: Queries<FilterType, SortingType>;
  setPaging: (paging: Paging) => void;
  setSorter: (sorting: SortingType) => void;
  setFilter: (values: FilterType) => void;
} => {
  const [queries, setQueries] = useState<Queries<FilterType, SortingType>>({
    paging,
    filter,
    sorting
  });

  const setPaging = (paging: Paging) => {
    if (!_.isEqual(queries.paging, paging)) {
      setQueries({ ...queries, paging });
    }
  };

  const setFilter = (filter: FilterType) => {
    setQueries({
      ...queries,
      paging: { limit: queries?.paging?.limit ?? defaultPaging.limit, offset: 0 },
      filter
    });
  };

  const setSorter = (sorting: SortingType) => {
    if (!_.isEqual(queries.sorting, sorting)) {
      setQueries({ ...queries, sorting });
    }
  };

  return { queries, setPaging, setFilter, setSorter };
};

export default useQueries;

export const convertToLikeComparison = (values: object): any[] => {
  const fields = _.toPairs(values)
    .map(([key, value]) => {
      if (!_.isEmpty(value)) {
        return { [key]: { like: `%${value ?? ""}%` } };
      }
      return null;
    })
    .filter(q => q !== null);
  return fields;
};
