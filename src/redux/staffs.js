import {
  ADD_STAFFS,
  STAFFS_LOADING,
  STAFFS_FAILED,
  REMOVE_STAFF,
} from "./ActionTypes";

export const Staffs = (
  state = { isLoading: true, errMess: null, staffs: [] },
  action
) => {
  switch (action.type) {
    case ADD_STAFFS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        staffs: action.payload,
      };

    case STAFFS_LOADING:
      return { ...state, isLoading: true, errMess: null, staffs: [] };

    case STAFFS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
