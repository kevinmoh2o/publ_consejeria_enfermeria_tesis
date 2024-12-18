
export const setLoadingState = (store, { status }) => {
  store.dispatch('appModule/setIsLoading', status);
}

export const setLoadingDataState = (store, data) => {
  store.dispatch('appModule/setIsData', data);
}

export const setSnackbarState = (store, data) => {
  store.dispatch('appModule/setSnackbar', data);
}



export const shellLoadingWhileExecution = async (store, callback, { title }) => {
  setLoadingState(store, { status: 1 });
  setLoadingDataState(store, { title });
  await callback();
  setLoadingState(store, { status: 3 });
}