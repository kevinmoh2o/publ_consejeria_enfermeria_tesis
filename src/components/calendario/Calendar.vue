<template>
  <div class='demo-app-main'>
    <div class="search-container">
      <div class="search-box">
        <i class="fas fa-search search-icon"></i>
        <input type="text" class="search-input" placeholder="Buscar eventos..." v-model="searchQuery"
          @input="filterEvents" maxlength="20" />
      </div>
    </div>

    <div class="calendar-container">
      <Fullcalendar ref="fullCalendar" class='demo-app-calendar' :options='calendarOptions'>
      </Fullcalendar>
    </div>

    <div class="leyenda">
      <div class="componente">
        <div class="cuadro-verde"></div>
        <p>Programado</p>
      </div>

      <div class="componente">
        <div class="cuadro-anaranjado"></div>
        <p>Próximamente</p>
      </div>

      <div class="componente">
        <div class="cuadro-rojo"></div>
        <p>Terminado</p>
      </div>
    </div>
  </div>
</template>



<script>
  import { ref, watchEffect, onMounted, computed, watch } from 'vue';
  import Fullcalendar from '@fullcalendar/vue3';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import listPlugin from '@fullcalendar/list';
  import interactionPlugin from '@fullcalendar/interaction';
  import esLocale from "@fullcalendar/core/locales/es";
  import * as GlobalFunc from '@/helpers/GlobalFunc';
  import { useStore } from 'vuex';

  export default {
    name: 'calendario-dos',
    components: {
      Fullcalendar,
    },
    setup(_, { emit }) {
      const store = useStore();

      const showModal = ref(false);
      const selectedItem = ref({});
      const mobileSet = ref([]);
      const popoverVisible = ref(false);
      const selectedEventData = ref(null);
      const eventoPopover = ref({});
      const userProv = ref({});
      const userData = ref(null);
      const searchQuery = ref('');
      const allEvents = ref([]);

      const filteredEvents = computed(() => {
        return searchQuery.value
          ? allEvents.value.filter(event =>
            event.title.toLowerCase().includes(searchQuery.value.toLowerCase())
          )
          : allEvents.value;
      });

      const handleEventClick = (info) => {
        emit('enventToModify', info);
      };

      const handleDateSelect = (selectInfo) => {
        emit('eventToCreateNew', selectInfo);
      };

      const calendarOptions = ref({
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
          interactionPlugin
        ],
        initialView: 'dayGridMonth',
        locale: esLocale,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,listYear',
        },
        allDaySlot: false,
        nowIndicator: true,
        editable: false,
        selectable: true,
        weekends: true,
        eventDisplay: 'block',
        themeSystem: 'bootstrap5',
        slotMinTime: "08:00:00",
        events: filteredEvents.value,
        eventColor: '#378006',
        eventClick: handleEventClick,
        select: handleDateSelect,
        contentHeight: 'auto',
      });


      const filterEvents = () => {
        calendarOptions.value.events = filteredEvents.value;
      };

      watch(filteredEvents, (newEvents) => {
        calendarOptions.value.events = newEvents;
      });

      onMounted(async () => {
        /* const { state, userProv: userProvider } = await GlobalFunc.userProviderToVuex(store);
        if (state) {
          userData.value = userProvider;
          userProv.value = store.getters['programacionModule/getUser'];
        } */
        allEvents.value = store.getters['meetingModule/getEventsList'];
        filterEvents();
      });

      const setCalendarOptions = (newOptions) => {
        calendarOptions.value = { ...calendarOptions.value, ...newOptions };
      };

      // Watch for changes in the Vuex state and update the calendar events
      watchEffect(() => {
        calendarOptions.value.events = store.getters['meetingModule/getEventsList'];
      });

      return {
        calendarOptions,
        showModal,
        selectedItem,
        mobileSet,
        popoverVisible,
        selectedEventData,
        eventoPopover,
        userProv,
        userData,

        setCalendarOptions,
        searchQuery,
      };
    }
  };
</script>


<style lang="scss" scoped>

  .calendar-container {
    height: 650px;
    overflow-y: auto;
  }

  .demo-app-calendar {
    height: 100%;
    width: 100%;
    overflow-y: auto;
  }

  .leyenda {
    height: 50px;
    margin-block: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  .leyenda .componente {
    display: flex;
    flex: row;
    align-items: center;
    margin-inline: 10px;
  }

  .componente .cuadro-verde {
    width: 20px;
    height: 20px;
    background-color: #85D94A;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
  }

  .componente .cuadro-anaranjado {
    width: 20px;
    height: 20px;
    background-color: #F2AF5C;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
  }

  .componente .cuadro-rojo {
    width: 20px;
    height: 20px;
    background-color: #E5342F;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
  }

  .componente p {
    margin: 0;
    margin-left: 5px;
    font-size: 14px;
    font-weight: 400;
  }

  .demo-app {
    display: flex;
    min-height: 100%;
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
    font-size: 14px;
  }

  .demo-app-main {
    flex-grow: 1;
    padding: 0;
    overflow-y: auto;
    min-height: 100%;
  }

  .fc {
    max-width: 1100px;
    margin: 0 auto;
  }







  .search-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .search-box {
    position: relative;
    width: 300px;
  }

  .search-icon {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    color: #aaa;
  }

  .search-input {
    width: 100%;
    padding: 10px 10px 10px 30px;
    border: 2px solid #ddd;
    border-radius: 20px;
    outline: none;
    transition: border-color 0.3s;
    text-align: center;
    letter-spacing: 1px;
  }

  .search-input:focus {
    border-color: var(--color-primary)
  }

 @media (max-width:500px) {
  .calendar-container {
    height: auto;
    max-height: 500px;
    overflow-y: auto;
  }
 } 
</style>
