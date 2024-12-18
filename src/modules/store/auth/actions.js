
import investigacionApi from '@/apis/investigacionapi'
import { ENDPOINTS } from '@/modules/store/endpoints';
import { decryptData } from '@/helpers/SecurityFunc';
import { jwtDecode } from "jwt-decode";
import { getHeaderToken } from '@/utils/JwTFunction.js';

export const resetAccount = async ({ commit }, entry) => {
  try {
    const params = { email: entry };
    const url = `${ENDPOINTS.POS_RESET_ACCOUNT}?${new URLSearchParams(params)}`;
    const rptReq = await investigacionApi.post(url, entry);
    const { status, message } = rptReq.data;
    return { status, message };
  } catch (error) {
    const { status, message } = error.response.data;
    return { status, message };
  }
}



export const getUserByEmail = async ({ commit }, { dni, password }) => {
  try {
    const params = { dni, inPassword: password };
    const url = `${ENDPOINTS.GET_USER_BY_DNI}?${new URLSearchParams(params)}`;
    var rptReq = await investigacionApi.get(url);
    //console.log("rptReq: ", rptReq);
    const { status, data, message, token } = rptReq.data;
    //const userDecripted = decryptData(token);
    //console.log("userDecripted: ",userDecripted)
    commit('SET_USER_PROVIDER', jwtDecode(token));
    localStorage.setItem('user', token);
    return { status, data, message, token };

  } catch (error) {
    //console.log("error: ", error);
    const { status, message } = error.response.data;
    return { status, message };
  }
}


export const updateUserPassword = async ({ commit }, { idUser, password, token }) => {
  try {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
    const bodyParams = { idUser, password };
    const url = `${ENDPOINTS.PUT_USER_PASSWORD}`;
    var rptReq = await investigacionApi.put(url, bodyParams, { headers });
    const { status, title, message } = rptReq.data;
    return { status, title, message };
  } catch (error) {
    const { status, title, message } = error.response.data;
    return { status, title, message };
  }
}




export const setUserProvider = (context, value) => {
  context.commit('SET_USER_PROVIDER', value);
};
export const clearUserProvider = (context) => {
  context.commit('CLEAR_USER_PROVIDER');
};



export const clearUses = ({ commit }) => {
  // Limpia la información del proveedor del usuario
  commit('CLEAR_USER_PROVIDER');
  //commit('CLEAR_LOADING');
  commit('CLEAR_SECTIONS');
};

export const initVisitedSections = ({ commit }, data) => {
  commit('setSections', JSON.parse(data));
}

export const visitSection = ({ commit, state }, section) => {
  commit('markSectionVisited', section);
  if (state.sections[section]) {
    commit('saveSections');
  }
};



export const updateSatisfactionQuest = ({ commit }, value) => {
  commit('SET_SATISFACTION_QUEST', value);
};

export const markSectionAsVisited = ({ commit }, section) => {

  commit('setSectionVisited', section);
}