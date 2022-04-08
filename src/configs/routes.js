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
    path: "/land-detail",
    isShowInMenu: false,
    component: lazy(() => import("../pages/LandDetail")),
  },
  {
    title: "Subland Detail",
    path: "/subland-detail",
    isShowInMenu: false,
    component: lazy(() => import("../pages/SublandDetail")),
  },
];
