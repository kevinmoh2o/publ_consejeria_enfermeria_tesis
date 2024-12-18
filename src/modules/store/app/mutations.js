// auth/mutations.js


export const SET_IS_LOADING = (state, flag) => {
  state.isLoading = flag;
};

export const CLEAR_IS_LOADING = (state) => {
  state.isLoading = 3;
};

export const SET_DATA = (state, data) => {
  state.data = data;
};

export const CLEAR_DATA = (state) => {
  state.data = { 'title': '' };
};


export const SET_SNACKBAR = (state, snackbar) => {
  state.snackbar = snackbar;
};

export const CLEAR_SNACKBAR = (state) => {
  state.snackbar = {
    status: false,
    message: "",
    color: "success",
    buttonColor: "white",
    multiLine: true,
    timeout: 5000
  };
};

