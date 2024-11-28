/* eslint-disable @typescript-eslint/no-explicit-any */
import DataGridCustom from "../../components/DataGridCustom";
import { useTranslation } from "react-i18next";

import { useEffect, useState } from "react";
import moment from "moment";
import enrollmentPeriodsRepository from "../../repositories/enrollmentPeriodsRepository";
import LoadingComponent from "../../components/LoadingComponent";
import { Box } from "@mui/material";

const EnrollmentPeriodList = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const columns = [
    { field: "id", headerName: `${t("id")}`, flex: 1 },
    { field: "name", headerName: `${t("name")}`, flex: 1 },
    {
      field: "startDateEnrollment",
      headerName: `${t("startDateEnrollment")}`,
      flex: 1,
    },
    {
      field: "endDateEnrollment",
      headerName: `${t("endDateEnrollment")}`,
      flex: 1,
    },
    {
      field: "startDateExam",
      headerName: `${t("startDateExam")}`,
      flex: 1,
    },
    {
      field: "endDateExam",
      headerName: `${t("endDateExam")}`,
      flex: 1,
    },
  ];

  const getEnrollmentPeriods = async () => {
    setLoading(true);
    try {
      const data = await enrollmentPeriodsRepository().get();
      setRows(
        data.map(
          (ep: {
            enrollmentPeriodID: any;
            startDateEnrollment: moment.MomentInput;
            endDateEnrollment: moment.MomentInput;
            startDateExam: moment.MomentInput;
            endDateExam: moment.MomentInput;
            periodName: any;
          }) => ({
            ...ep,
            id: ep.enrollmentPeriodID,
            startDateEnrollment: moment(ep.startDateEnrollment).format(
              "YYYY-DD-MM"
            ),
            endDateEnrollment: moment(ep.endDateEnrollment).format(
              "YYYY-DD-MM"
            ),
            startDateExam: moment(ep.startDateExam).format("YYYY-DD-MM"),
            endDateExam: moment(ep.endDateExam).format("YYYY-DD-MM"),

            name: ep.periodName,
          })
        )
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEnrollmentPeriods();
  }, []);

  return (
    <Box>
      {loading ? (
        <LoadingComponent />
      ) : (
        <DataGridCustom
          columns={columns}
          rows={rows}
          title={t("enrollmentPeriods")}
          filterColumns={["name"]}
        />
      )}
    </Box>
  );
};

export default EnrollmentPeriodList;
