import { createStore, combineReducers, applyMiddleware } from "redux";
import { Reducer, initialState } from "./reducer";
import { Staffs } from "./staffs";
import { Departments } from "./departments";
import { createForms } from "react-redux-form";

import thunk from "redux-thunk";
import logger from "redux-logger";
import { InitialStaffForm } from "./form";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      staffs: Staffs,
      departments: Departments,
      ...createForms({
        newStaff: InitialStaffForm,
      }),
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
