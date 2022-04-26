import { lazy } from "react";
import { PAGE_URLS } from "../constants/urls";

export const pages = [
  {
    title: "Ana Sayfa",
    exact: true,
    path: PAGE_URLS.ROOT,
    component: lazy(() => import("../pages/Home")),
  },
  {
    title: "Land Detail",
    path: PAGE_URLS.LAND_DETAIL,
    isShowInMenu: false,
    component: lazy(() => import("../pages/LandDetail")),
  },
  {
    title: "Subland Detail",
    path: PAGE_URLS.SUBLAND_DETAIL,
    isShowInMenu: false,
    component: lazy(() => import("../pages/SublandDetail")),
  },
];
