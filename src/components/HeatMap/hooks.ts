import { findDataBySql } from "@/api";
import { Ref } from "vue";
import _ from "ywdash";

export const getNotesCount = async () => {
  return await findDataBySql("SELECT count(*) FROM blocks WHERE type='d'");
};

export const getDataByLimit = async (LIMIT: number, OFFSET: number) => {
  return await findDataBySql(
    `SELECT created FROM blocks WHERE type='d' LIMIT ${LIMIT} OFFSET ${OFFSET} `
  );
};

export const getEndDate = () => {
  // MVP 实现暂不考虑年份切换
  return new Date();
};

export const getParsedData = async (data: Ref<Array<any>>, limit = 50) => {
  const [{ ["count(*)"]: totalCount }] = (await getNotesCount()) as any;
  const times = Math.ceil(totalCount / limit);
  let originalData = [] as Array<any>;
  Array.from({ length: times }).forEach(async (__, index) => {
    originalData = originalData.concat(
      await getDataByLimit(limit, limit * index)
    );
    if (index === times - 1) {
      const dateToItems = _.groupBy(
        originalData,
        ({ created }) =>
          `${created.substring(0, 4)}-${created.substring(
            4,
            6
          )}-${created.substring(6, 8)}`
      );
      const parsedArray = [] as Array<any>;
      Object.keys(dateToItems).forEach((key) => {
        parsedArray.push({ date: key, count: dateToItems[key].length });
      });
      data.value = parsedArray;
    }
  });
};
