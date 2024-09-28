import { useTranslation } from "react-i18next";
import DataGridCustom from "../../components/DataGridCustom";

const AcademicProgramsList = () => {
  const { t } = useTranslation();
  const columns = [
    { field: "id", headerName: `${t("id")}`, flex: 1 },
    { field: "name", headerName: `${t("name")}`, flex: 1 },
    { field: "category", headerName: `${t("category")}`, flex: 1 },
    { field: "description", headerName: `${t("description")}`, flex: 1 },
    { field: "institution", headerName: `${t("institution")}`, flex: 1 },
  ];
  const rows = [
    {
      id: 1,
      name: "Computer Science",
      category: "Technology",
      description:
        "Focuses on algorithms, programming, and software development.",
      institution: "Harvard University",
    },
    {
      id: 2,
      name: "Business Administration",
      category: "Business",
      description: "Covers management, finance, and entrepreneurship.",
      institution: "Stanford University",
    },
    {
      id: 3,
      name: "Mechanical Engineering",
      category: "Engineering",
      description: "Deals with mechanics, thermodynamics, and machine design.",
      institution: "MIT",
    },
    {
      id: 4,
      name: "Psychology",
      category: "Health Sciences",
      description: "Studies human behavior, cognition, and emotions.",
      institution: "Yale University",
    },
    {
      id: 5,
      name: "Law",
      category: "Social Sciences",
      description: "Provides knowledge of legal principles and practices.",
      institution: "University of Oxford",
    },
    {
      id: 6,
      name: "Environmental Science",
      category: "Natural Sciences",
      description: "Focuses on ecological systems and sustainability.",
      institution: "University of California, Berkeley",
    },
    {
      id: 7,
      name: "Architecture",
      category: "Arts",
      description: "Explores design, structure, and aesthetics of buildings.",
      institution: "Princeton University",
    },
    {
      id: 8,
      name: "Medicine",
      category: "Health Sciences",
      description: "Prepares students for careers in healthcare and surgery.",
      institution: "Johns Hopkins University",
    },
    {
      id: 9,
      name: "International Relations",
      category: "Social Sciences",
      description: "Studies global politics, diplomacy, and foreign policies.",
      institution: "London School of Economics",
    },
    {
      id: 10,
      name: "Graphic Design",
      category: "Arts",
      description: "Focuses on visual communication and digital design.",
      institution: "Rhode Island School of Design",
    },
  ];

  return (
    <DataGridCustom
      columns={columns}
      rows={rows}
      title={t("academicPrograms")}
    />
  );
};

export default AcademicProgramsList;
