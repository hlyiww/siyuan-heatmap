import request from "@/utils/request";

export function findDataBySql(sql: string) {
  return request({
    url: "/api/query/sql",
    data: {
      stmt: sql,
    },
  });
}
