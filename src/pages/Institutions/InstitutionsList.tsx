import DataGridCustom from "../../components/DataGridCustom";
import { useTranslation } from "react-i18next";

const InstitutionsList = () => {
  const { t } = useTranslation();
  const columns = [
    { field: "id", headerName: `${t("id")}`, flex: 1 },
    { field: "name", headerName: `${t("name")}`, flex: 1 },
    { field: "location", headerName: `${t("location")}`, flex: 1 },
    { field: "description", headerName: `${t("description")}`, flex: 1 },
    { field: "academicPrograms", headerName: `${t("academicPrograms")}`, flex: 1 },
    { field: "enrollmentPeriods", headerName: `${t("enrollmentPeriods")}`, flex: 1 },
  ];

  const rows = [
    {
      id: 1,
      name: "John Doe",
      location: "New York, USA",
      description: "Software Engineer at Tech Corp.",
    },
    {
      id: 2,
      name: "Jane Smith",
      location: "Los Angeles, USA",
      description: "Product Manager at Startup Inc.",
    },
    {
      id: 3,
      name: "Carlos García",
      location: "Madrid, Spain",
      description: "Freelance Developer specializing in web applications.",
    },
    {
      id: 4,
      name: "Emily Johnson",
      location: "London, UK",
      description: "UX Designer at Creative Studio.",
    },
    {
      id: 5,
      name: "Raj Patel",
      location: "Mumbai, India",
      description: "Data Scientist at AI Solutions.",
    },
    {
      id: 6,
      name: "Sofia Rossi",
      location: "Rome, Italy",
      description: "Marketing Specialist at Global Media.",
    },
    {
      id: 7,
      name: "Liu Wei",
      location: "Beijing, China",
      description: "Backend Engineer at Cloud Technologies.",
    },
    {
      id: 8,
      name: "Aisha Khan",
      location: "Dubai, UAE",
      description: "Sales Manager at Retail Hub.",
    },
    {
      id: 9,
      name: "Ahmed El-Sayed",
      location: "Cairo, Egypt",
      description: "Full-Stack Developer at IT Solutions.",
    },
    {
      id: 10,
      name: "Hiroshi Tanaka",
      location: "Tokyo, Japan",
      description: "DevOps Engineer at Robotics Corp.",
    },
  ];

  return (
    <DataGridCustom columns={columns} rows={rows} title={t("institutions")} />
  );
};

export default InstitutionsList;
