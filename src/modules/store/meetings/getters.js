export const getEventsList = (state) => state.eventsList;
export const getRemmemberList = (state) => {
  return {
    consejero: state.remmemberList.consejero || [],
    cuidador: state.remmemberList.cuidador || [],
  };
};
export const getOnLoading = (state) => state.onloading;