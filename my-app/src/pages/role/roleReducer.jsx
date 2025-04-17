const initialState = {
    rolesData: [],
    fetchRolesDataSuccess: false,
    fetchRolesDataFail: false
}

const rolesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ROLES_DETAILS_SUCCESS":
            return { ...state, rolesData: action.payload, fetchRolesDataSuccess: true };
        case "GET_ROLES_DETAILS_FAIL":
            return { ...state, rolesData: [], fetchRolesDataFail: true };
        default:
            return state;
    }
}

export default rolesReducer;