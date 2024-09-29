import DataGridCustom from "../../components/DataGridCustom";
import { useTranslation } from "react-i18next";
import useAxios from "../../hooks/useAxios";
import { useEffect } from "react";

const EnrollmentPeriodList = () => {
  const { t } = useTranslation();
  const axiosInstance = useAxios();
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
    {
      field: "institution",
      headerName: `${t("institution")}`,
      flex: 1,
    },
  ];

  const rows = [
    {
      id: 1,
      name: "Bachelor of Science in Computer Science",
      startDateEnrollment: "2024-01-01",
      endDateEnrollment: "2024-01-15",
      startDateExam: "2024-02-01",
      endDateExam: "2024-02-05",
      institution: "MIT",
    },
    {
      id: 2,
      name: "Master of Business Administration",
      startDateEnrollment: "2024-03-01",
      endDateEnrollment: "2024-03-20",
      startDateExam: "2024-04-01",
      endDateExam: "2024-04-10",
      institution: "Harvard Business School",
    },
    {
      id: 3,
      name: "Bachelor of Arts in Psychology",
      startDateEnrollment: "2024-05-05",
      endDateEnrollment: "2024-05-25",
      startDateExam: "2024-06-01",
      endDateExam: "2024-06-10",
      institution: "Stanford University",
    },
    {
      id: 4,
      name: "Doctor of Medicine",
      startDateEnrollment: "2024-07-01",
      endDateEnrollment: "2024-07-20",
      startDateExam: "2024-08-01",
      endDateExam: "2024-08-10",
      institution: "Johns Hopkins University",
    },
    {
      id: 5,
      name: "Bachelor of Engineering in Civil Engineering",
      startDateEnrollment: "2024-09-01",
      endDateEnrollment: "2024-09-20",
      startDateExam: "2024-10-01",
      endDateExam: "2024-10-10",
      institution: "California Institute of Technology",
    },
  ];
  const getEnrollmentPeriods = async () => {
    const { data } = await axiosInstance.get("EnrollmentPeriods");
    console.log(data);
  };

  useEffect(() => {
    getEnrollmentPeriods()
  }, [])

  return (
    <DataGridCustom
      columns={columns}
      rows={rows}
      title={t("enrollmentPeriods")}
      filterColumns={["name"]}
    />
  );
};

export default EnrollmentPeriodList;
