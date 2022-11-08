import React, {
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";

import { useRouter } from "next/router";
//@ts-ignore
import Dropdown from "@trendmicro/react-dropdown";
import {
  Col,
  Row,
  Form,
  Card,
  Divider,
  // Dropdown,
  Button,
  Collapse,
  Menu,
  Checkbox,
} from "antd";
import _ from "lodash";
import moment from "moment";

import styles from "./CommonListView.module.scss";
import { Icon } from "./Icon";
import { useForm } from "antd/lib/form/Form";
import { AsyncListProps } from "./AsyncList";

interface CommonListViewProps extends AsyncListProps {
  tableTitle?: string;
  actions?: React.ReactNode;
  filterForm?: React.ReactNode;
  filterItems?: FilterItems[];
  searchInitialValues?: object;
  initialFilter?: object;
  filterDefaultActiveKey?: string[];
  ignoreParams?: string[];
}

const CommonListView: React.FC<CommonListViewProps> = forwardRef(
  (props, ref) => {
    const [form] = useForm();
    const router = useRouter();
    const [filterOpen, setFilterOpen] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      refetch,
    }));

    useEffect(() => {
      document.addEventListener("click", (event) => {
        setFilterOpen(false);
      });
    }, []);

    const onFinish = (values: any) => {
      let params = values;
      if (!hasPropertyValues(values)) {
        params = {};
      }

      params = parseParams(params);

      router.replace({
        query: {
          ..._.pick(router.query, ["page", "size", "sortDir", "sortBy"]),
          page: 1,
          size: props.pageSize || 10,
          ...params,
        },
      });
    };

    const refetch = () => {
      if (props.refetch) {
        props.refetch({
          paging: {
            limit: props.pageSize || 10,
            offset:
              (props.pageSize || 10) *
              ((_.toNumber(router.query?.page) || 1) - 1),
          },
          filter: {
            ...props.gqlFilters,
          },
        });
      }
    };

    const onReset = () => {
      if (props.refetch) {
        props.refetch({
          paging: {
            limit: props.pageSize || 10,
            offset:
              (props.pageSize || 0) *
              ((_.toNumber(router.query?.page) || 1) - 1),
          },
          filter: {
            ...(props.initialFilter || {}),
          },
          sorting: [
            // sorting: props.sorting || [
            {
              field: "createdAt",
              direction: "DESC",
            },
          ],
        });
      }
    };

    const filterParams = _.omit(router.query, [
      "page",
      "size",
      "sortDir",
      "sortBy",
      "id",
      ...(props.ignoreParams || []),
    ]);
    const hasFilter = !_.isEmpty(filterParams);

    return (
      <div className={styles.CommonListView}>
        {props.filterForm && (
          <Form
            form={form}
            name="filter-form"
            onFinish={onFinish}
            initialValues={router.query}
          >
            {props.filterForm}
          </Form>
        )}
        {props.filterForm && <Divider />}
        <Row justify="space-between" align="middle" className="mb-3">
          <Col>
            {props.tableTitle && (
              <h3 className="text-h3">{props.tableTitle}</h3>
            )}
          </Col>
          <Col>
            {!_.isEmpty(props.filterItems) && (
              <Dropdown
                open={filterOpen}
                pullRight
                onClick={(e: any) => e.stopPropagation()}
              >
                <Dropdown.Toggle componentClass="div" noCaret>
                  <div className="mr-2">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFilterOpen(!filterOpen);
                      }}
                      className="btn-filter"
                    >
                      <span style={{ position: "relative" }}>
                        <Icon name="filter" />
                        {hasFilter && <span className="filter-indicator" />}
                      </span>
                      {`Filters${
                        hasFilter ? ` (${_.size(filterParams)})` : ""
                      }`}
                    </Button>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{
                    minWidth: 280,
                    left: "auto",
                    borderWidth: 0,
                    borderRadius: 8,
                    paddingTop: 0,
                    paddingBottom: 0,
                    overflow: "hidden",
                  }}
                >
                  <div className="filter-form">
                    <Form
                      form={form}
                      name="filter-form"
                      onFinish={onFinish}
                      initialValues={{
                        ...router.query,
                        ...props.searchInitialValues,
                      }}
                    >
                      <div className="flex justify-between px-2 filter-form-header">
                        <p>Filters</p>
                        <div>
                          <Button
                            type="text"
                            className="btn-reset"
                            onClick={() => {
                              router.replace({
                                query: { ..._.pick(router.query, ["id"]) },
                              });

                              _.delay(() => {
                                form.resetFields();
                                onReset();
                              }, 150);
                              setFilterOpen(false);
                            }}
                          >
                            Reset
                          </Button>
                          <Button
                            type="link"
                            htmlType="submit"
                            className="btn-apply"
                            onClick={() => setFilterOpen(false)}
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                      <Collapse bordered={false} defaultActiveKey={["1"]}>
                        {_.map(
                          props.filterItems,
                          (o: FilterItems, i: number) => {
                            return (
                              <Collapse.Panel header={o.title} key={`${i}`}>
                                {o.render}
                              </Collapse.Panel>
                            );
                          }
                        )}
                      </Collapse>
                    </Form>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            )}
            {props.actions}
          </Col>
        </Row>

        <AsyncList {...props} />
      </div>
    );
  }
);

interface FilterItems {
  title: string;
  render?: React.ReactNode;
}

const hasPropertyValues = (obj: any) => {
  for (var key in obj) {
    if (obj[key] !== null && obj[key] !== "") {
      return true;
    }
    if (_.isBoolean(obj[key])) return true;
    if (_.isArray(obj[key])) return true;
  }
  return false;
};

const parseParams = (obj: any) => {
  let res = {};
  for (var key in obj) {
    if (!obj[key]) delete obj[key];
    if (moment.isMoment(obj[key])) {
      res = {
        ...obj,
        [key]: moment(obj[key]).format("YYYY-MM-DD"),
      };
    } else {
      res = {
        ...obj,
      };
    }
  }
  return res;
};

CommonListView.defaultProps = {
  filterDefaultActiveKey: ["1"],
};

export { CommonListView };
