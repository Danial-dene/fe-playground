import React, { useEffect, useState } from "react";
import { List, PaginationProps, ListProps } from "antd";
import {
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from "antd/lib/table/interface";
import { useRouter } from "next/router";
import _ from "lodash";

import styles from "./AsyncTable.module.scss";

type VariableProps = {
  paging: {
    limit: number;
    offset: number;
  };
  filter?: any;
  sorting?: any[];
};

export interface AsyncListProps extends ListProps<Record<string, any>> {
  totalCount?: number;
  pageSize?: number;
  refetch?: (variables: VariableProps) => void;
  gqlFilters?: object;
}

const AsyncList: React.FC<AsyncListProps> = (props) => {
  const router = useRouter();
  const pageSize = props.pageSize || 10;
  const [pagination, setPagination] = useState<PaginationProps>({
    current: _.toNumber(router.query?.page) || 1,
    pageSize,
    total: props.totalCount || 0,
    // position: ["bottomCenter"],
  });

  const handleListChange = (
    page: number,
    pageSize: number
    // sorters: SorterResult<any>
  ) => {
    let query = {
      ...router.query,
      page,
      size: pageSize,
    } as any;
    // if (sorters.field && sorters.order) {
    //   query = {
    //     ...query,
    //     sortBy: sorters.field,
    //     sortDir: sorters.order === "ascend" ? "ASC" : "DESC",
    //   };
    // } else {
    //   query = _.omit(query, ["sortBy", "sortDir"]);
    // }
    router.replace({
      query,
    });
  };

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      total: props.totalCount,
    }));
  }, [props.totalCount]);

  useEffect(() => {
    if (!_.isEmpty(router.query)) {
      setPagination((prev) => {
        return {
          ...prev,
          current: _.toNumber(router.query?.page) || 1,
        };
      });
      if (props.refetch) {
        props.refetch({
          paging: {
            limit: pageSize,
            offset: pageSize * ((_.toNumber(router.query?.page) || 1) - 1),
          },
          filter: {
            ...props.gqlFilters,
          },
          sorting: [
            {
              field: router?.query?.sortBy || "createdAt",
              direction: router?.query?.sortDir || "DESC",
            },
          ],
        });
      }
    }
  }, [router.query]);

  return (
    <List
      className={styles.asyncTable}
      pagination={{
        onChange: handleListChange,
        size: "small",
        ...pagination,
      }}
      {...props}
    />
  );
};

export { AsyncList };
