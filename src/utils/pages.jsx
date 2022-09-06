import { Page404 } from "../pages/404/404";
import { PageSubmit } from "../pages/submit/submit";
import { PageApprove } from "../pages/approve/approve";

export const pages = {
  404: {
    label: "404",
    component: <Page404 />,
  },
  main: [
    {
      label: "Submit",
      component: <PageSubmit />,
      path: "/",
      includeFooter: true,
    },
  ],
  hidden: [
    {
      label: "Approve",
      component: <PageApprove />,
      path: "/Approve",
    },
  ],
};
