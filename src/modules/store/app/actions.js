/* eslint-disable */



export const clearUses = (context) => {
  context.commit('CLEAR_IS_LOADING');
  context.commit('CLEAR_DATA');
  context.commit('CLEAR_SNACKBAR');
};




export const setIsLoading = (context, flag) => {
  context.commit('SET_IS_LOADING', flag);
};

export const setIsData = (context, data) => {
  context.commit('SET_DATA', data);
};

export const setSnackbar = (context, snackbar) => {
  context.commit('SET_SNACKBAR', snackbar);
};




/* export const clearIsData = (context) => {
  context.commit('CLEAR_DATA');
};

export const clearIsLoading = (context) => {
  context.commit('CLEAR_IS_LOADING');
}; */
