import "dayjs/locale/es";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.locale("es");

const useTaskDate = (taskDate, taskUpdatedAt) => {
  const today = dayjs().utc().startOf("day");
  const dueDate = dayjs(taskDate).utc().startOf("day");
  const taskUpdated = dayjs(taskUpdatedAt).startOf("day");
  const diffDays = dueDate.diff(today, "day");

  return {today, dueDate, taskUpdated, diffDays};
};

export default useTaskDate;
