import appRoutes from "../providers/appRoutes";
import i18n from "../i18n";
import {
  RESOURCE_SLAC_CHARTS,
  RESOURCE_SLAC_TABLE,
  ACCESS_LIST
} from "./permissions";
const tabs = [
  {
    key: "Table View",
    path: appRoutes.tableView(i18n.language),
    iconType: "desktop",
    permissions: [`${RESOURCE_SLAC_TABLE}:${ACCESS_LIST}`]
  },
  {
    key: "Chart View",
    path: appRoutes.chartView(i18n.language),
    iconType: "pie-chart",
    permissions: [`${RESOURCE_SLAC_CHARTS}:${ACCESS_LIST}`]
  }
];

// type ApplyPermissionsTabs = (Array<string>) => typeof tabs;

// export const applyPermissionsTabs: ApplyPermissionsTabs = permissions =>
//     Object.keys(tabs)
//         .filter(tab => hasPermissions(tabs[tab].permissions, permissions))
//         .reduce((acc, key) => {
//             acc[key] = tabs[key];
//             return acc;
//         }, {});

export default tabs;
