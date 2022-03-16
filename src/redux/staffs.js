import {
  ADD_STAFFS,
  ADD_STAFF,
  STAFFS_LOADING,
  STAFFS_FAILED,
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

    case ADD_STAFF:
      const maxId = Math.max(...state.staffs.map(({ id }) => id));
      const staff = {
        ...action.payload,
        id: maxId + 1,
        image: `https://i.pravatar.cc/250?img=${maxId + 1}`,
      };

      return { ...state, staffs: state.staffs.concat([staff]) };

    default:
      return state;
  }
};
