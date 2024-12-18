
export const decodeJWT = async (jwtGranted) => {
  try {
    const decoded = jwtDecode(jwtGranted);
    //console.log('Decoded JWT:', decoded);
    return decoded;
  } catch (error) {
    console.error('Error al decodificar el JWT:', error);
    throw new Error('Invalid JWT format');
  }
}


export const login = async (store, { dni, password }) => {
  try {
    const { status, data, message, token } = await store.dispatch('authModule/getUserByEmail', { dni, password });
    //console.log({ status, data, message, token })
    return { status, data, message, token };
  } catch (error) {
    console.error('Error al decodificar el JWT:', error);
    throw new Error('Invalid JWT format');
  }
}


export const updatePasswordCtl = async (store, { idUser, password, token }) => {
  try {
    const { status, title, message } = await store.dispatch('authModule/updateUserPassword', { idUser, password, token });
    //console.log("updatePasswordCtl: ", { status, title, message })
    return { status, title, message };
  } catch (error) {
    console.error('Error al decodificar el JWT:', error);
    throw new Error('Invalid JWT format');
  }
}

export const logOut = (store, router) => {
  localStorage.removeItem('user');
  localStorage.removeItem('entries');
  store.dispatch('authModule/clearUses');
  store.dispatch('programacionModule/clearUses');
  store.dispatch('appModule/clearUses');
  router.replace({ name: 'login-layout' });
  history.pushState(null, null, location.href);
  window.onpopstate = function () {
    history.go(1);
  };
}