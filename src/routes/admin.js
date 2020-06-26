import { Editions } from "../views/Editions/index";
import Edition from "../views/Edition";
import Prayer from "../views/Prayer";
import NotificationsPage from "../views/NotificationsPage";
import { Users } from "../views/Users/index";

const routes = [
  { path: "/editions", name: "Editions", component: Editions },
  {
    path: "/editions/:edition",
    name: "Edition",
    component: Edition,
    hidden: true,
  },
  {
    path: "/editions/:edition/:month/:day",
    name: "Prayer",
    component: Prayer,
    hidden: true,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: NotificationsPage,
  },
];

export default routes;
