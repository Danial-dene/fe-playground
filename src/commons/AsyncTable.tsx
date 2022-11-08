import React, { useEffect, useState } from "react";
import { Table, TablePaginationConfig, TableProps } from "antd";
import { SorterResult } from "antd/lib/table/interface";
import { useRouter } from "next/router";
import _ from "lodash";

type VariableProps = {
  paging: {
    limit: number;
    offset: number;
  };
  filter?: any;
  sorting?: any[];
};

export interface AsyncTableProps extends TableProps<Record<string, any>> {
  totalCount?: number;
  pageSize?: number;
  refetch?: (variables: VariableProps) => void;
  gqlFilters?: object;
  sorting?: [];
  initialFilter?: object;
}

const AsyncTable: React.FC<AsyncTableProps> = (props) => {
  const router = useRouter();
  const pageSize = props.pageSize || 10;
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: _.toNumber(router.query?.page) || 1,
    pageSize,
    total: props.totalCount || 0,
    position: ["bottomCenter"],
  });

  const handleTableChange = (
    newPagination: TablePaginationConfig,
    filters: any,
    sorters: SorterResult<any>
  ) => {
    let query = {
      ...router.query,
      page: newPagination.current,
      size: pageSize,
    } as any;
    if (sorters.field && sorters.order) {
      query = {
        ...query,
        sortBy: sorters.field,
        sortDir: sorters.order === "ascend" ? "ASC" : "DESC",
      };
    } else {
      query = _.omit(query, ["sortBy", "sortDir"]);
    }
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
        // todo: if has default filter
        props.refetch({
          paging: {
            limit: pageSize,
            offset: pageSize * ((_.toNumber(router.query?.page) || 1) - 1),
          },
          filter: {
            ...props.initialFilter,
            ...props.gqlFilters,
          },
          sorting: props.sorting || [
            {
              field: router?.query?.sortBy || "createdAt",
              direction: router?.query?.sortDir || "DESC",
            },
          ],
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return (
    <Table
      size="small"
      pagination={pagination}
      // @ts-ignore
      onChange={handleTableChange}
      {...props}
    />
  );
};

export { AsyncTable };
