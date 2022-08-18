import { combineReducers } from "redux";
import { userMasterReducer } from "./UserMaster/CRUser";
import { masterReducer } from "./Master/CRMaster";
import Properties from "./sproperties";
import Menu from "./smenu";
import Side from "./sside";
import ManageCommunication from "./smanagecommunication";
import ManageCommunications from "./smanagecommunications";
import ManageNotifications from "./smanagenotifications";
import ManageMasters from "./smanagemasters";
import ManageDocuments from "./smanagedocuments";
import  ManageSubscriptionPlans from "./smanagesubscriptionplans";
import ManageSalesPersons from "./smanagesalespersons";
import Meetings from "./smeetings";
import ManageMaster from "./smanagemaster";
 
export const EntitiesReducer = combineReducers({
  userMaster: userMasterReducer,
  master: masterReducer,
  properties: Properties,
  menu: Menu,
  side: Side,
  managecommunication: ManageCommunication,
  managecommunications: ManageCommunications,
  managenotifications: ManageNotifications,
  managemasters: ManageMasters,
  managedocuments: ManageDocuments,
  managesubscriptionplans: ManageSubscriptionPlans,
  managesalespersons: ManageSalesPersons,
  meetings: Meetings,
  managemaster: ManageMaster

});
