import React from "react";
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Icons from "views/examples/Icons.js";

const Group = React.lazy(() => import("./pages/TableMaster/Group"));

// user master

const AddUser = React.lazy(() => import("pages/UserMaster/AddUser"));
const Rights = React.lazy(() => import("pages/UserMaster/Rights"));

const Properties = React.lazy(() => import("pages/Properties/Properties"))

const Menu = React.lazy(() => import("pages/menu/Menu"))
const Side = React.lazy(() => import("pages/side/Side"))
const ManageCommunication = React.lazy(() => import("pages/managecommunication/ManageCommunication"))
const ManageCommunications = React.lazy(() => import("pages/managecommunications/ManageCommunications"))
const ManageNotifications = React.lazy(() => import("pages/managenotifications/ManageNotifications"))
const ManageMasters = React.lazy(() => import("pages/managemasters/ManageMasters"))
const ManageDocuments = React.lazy(() => import("pages/managedocuments/ManageDocuments"))
const ManageSubscriptionPlans = React.lazy(() => import("pages/managesubscriptionplans/ManageSubscriptionPlans"))
const ManageSalesPersons = React.lazy(() => import("pages/managesalespersons/ManageSalesPersons"))
const Meetings = React.lazy(() => import("pages/meetings/Meetings"))
const ManageMaster = React.lazy(() => import("pages/managemaster/ManageMaster"))


var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },

  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
  },

  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },

  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
  {
    path: "/group",
    name: "Group Master",
    icon: "ni ni-bullet-list-67 text-red",
    component: Group,
    layout: "/admin",
  },
  {
    path: "/properties",
    name: "Properties",
    icon: "ni ni-bullet-list-67 text-red",
    component: Properties,
    layout: "/admin",
  },
  {
    path: "/menu",
    name: "Menu",
    icon: "ni ni-bullet-list-67 text-red",
    component: Menu,
    layout: "/admin",
  },
  {
    path: "/side",
    name: "Side",
    icon: "ni ni-bullet-list-67 text-red",
    component: Side,
    layout: "/admin",
  },
  {
    path: "/managecommunication",
    name: "ManageCommunication",
    icon: "ni ni-bullet-list-67 text-red",
    component: ManageCommunication,
    layout: "/admin",
  },

  {
    path: "/managecommunications",
    name: "ManageCommunications",
    icon: "ni ni-bullet-list-67 text-red",
    component: ManageCommunications,
    layout: "/admin",
  },
 
  {
    path: "/managenotifications",
    name: "ManageNotifications",
    icon: "ni ni-bullet-list-67 text-red",
    component: ManageNotifications,
    layout: "/admin",
  },

  {
    path: "/managemasters",
    name: "ManageMasters",
    icon: "ni ni-bullet-list-67 text-red",
    component: ManageMasters,
    layout: "/admin",
  },

  {
    path: "/managedocuments",
    name: "ManageDocuments",
    icon: "ni ni-bullet-list-67 text-red",
    component: ManageDocuments,
    layout: "/admin",
  },

  {
    path: "/managesubscriptionplans",
    name: "ManageSubscriptionPlans",
    icon: "ni ni-bullet-list-67 text-red",
    component: ManageSubscriptionPlans,
    layout: "/admin",
  }, 
  
  {
    path: "/managesalespersons",
    name: "ManageSalesPersons",
    icon: "ni ni-bullet-list-67 text-red",
    component: ManageSalesPersons,
    layout: "/admin",
  }, 

  {
    path: "/meetings",
    name: "Meetings",
    icon: "ni ni-bullet-list-67 text-red",
    component: Meetings,
    layout: "/admin",
  },

  {
    path: "/managemaster",
    name: "ManageMaster",
    icon: "ni ni-bullet-list-67 text-red",
    component: ManageMaster,
    layout: "/admin",
  },

  {
    path: "/add-user",
    name: "Add User",
    icon: "ni ni-bullet-list-67 text-red",
    component: AddUser,
    layout: "/admin",
  },

  {
    path: "/rights",
    name: "Rights",
    icon: "ni ni-bullet-list-67 text-red",
    component: Rights,
    layout: "/admin",
  },
];
export default routes;
