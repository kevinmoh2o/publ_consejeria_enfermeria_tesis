
export default () => ({
    //isLoading: false,
    isLoading: {
        loadingData: {
            status: false,
            title: "Autenticando usuario..."
        },
        apiResponse: { status: null, },
    },
    respuesta:{},
    userProvider:{
        status:false, data:null, message:"null"
    },
    usuarioPersonaList:[],
    tranUserPeople:{},
    rectwidth: 250,
    entries: localStorage.getItem('entries')
        ? JSON.parse(localStorage.getItem('entries'))
        : [],
    counter: localStorage.getItem('counter') ? parseInt(localStorage.getItem('counter')) : 0

})  