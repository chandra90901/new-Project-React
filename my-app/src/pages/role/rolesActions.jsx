export const getRoleDetails = () => {
    return (dispatch) => {

        fetch("http://localhost:5001/api/role")
            .then((res) => res.json())
            .then((data) => {
                dispatch({ type: "GET_ROLES_DETAILS_SUCCESS", payload: data });
            })
            .catch((err) => {
                dispatch({ type: "GET_ROLES_DETAILS_FAIL", payload: err.message });
            });
    };
};
