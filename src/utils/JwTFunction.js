
  export const getHeaderToken = () => {
    const token = localStorage.getItem('user');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }