import { createStore, combineReducers, applyMiddleware } from "redux";
import { Staffs } from "./staffs";
import { Departments } from "./departments";
import { Salaries } from "./salary";

import { createForms } from "react-redux-form";

import thunk from "redux-thunk";
import logger from "redux-logger";
import { InitialStaffForm } from "./form";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      staffs: Staffs,
      departments: Departments,
      salaries: Salaries,
      ...createForms({
        newStaff: InitialStaffForm,
      }),
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
