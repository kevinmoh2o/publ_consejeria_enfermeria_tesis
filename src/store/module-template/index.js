import { createStore } from 'vuex'

import programacionModule from '../../modules/store/programacion';
import authModule from '../../modules/store/auth';
import meetingModule from '../../modules/store/meetings';
import satisfaccionModule from '../../modules/store/satisfaccion';
import soporteModule from '../../modules/store/soporte';
import appModule from '../../modules/store/app';



export default createStore({
    modules: {
        programacionModule,
        authModule,
        meetingModule,
        satisfaccionModule,
        soporteModule,
        appModule
    }
})
