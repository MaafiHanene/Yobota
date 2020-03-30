import i18n from "../i18n";

const rootPath = (lang?: string): string =>
  lang !== "en" ? `/?lang=${lang}` : "/";
const tableView = (lang?: string): string =>
  lang ? `/table-view/?lang=${lang}` : `/table-view/`;
const chartView = (lang?: string): string =>
  lang ? `/chart-view/?lang=${lang}` : `/chart-view/`;

const appRoutes = {
  rootPath,
  tableView,
  chartView
};

export default appRoutes;
