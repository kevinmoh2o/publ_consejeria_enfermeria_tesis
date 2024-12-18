<template>
   <!-- <div class="slider">
            <input type="radio" name="slider" id="slideOne" checked>
            <input type="radio" name="slider" id="slideTwo" checked>
            <input type="radio" name="slider" id="slideThree" checked>
            <input type="radio" name="slider" id="slideFourth" checked>

            <div class="buttons">
                <label for="slideOne"></label>
                <label for="slideTwo"></label>
                <label for="slideThree"></label>
                <label for="slideFourth"></label>
            </div>

            <div class="content">
                <div class="firstslide"><img src="@/assets/workteam/uno.png" class="scaled-image" alt="Italian Trulli">
                </div>
                <div class="secondslide"><img src="@/assets/workteam/dos.png" class="scaled-image" alt="Italian Trulli">
                </div>
                <div class="thirdslide"><img src="@/assets/workteam/tres.png" class="scaled-image" alt="Italian Trulli">
                </div>
                <div class="fourthslide"><img src="@/assets/workteam/cuatro.png" class="scaled-image"
                        alt="Italian Trulli"></div>
            </div>

        </div> -->
  <div class="wrapper">
    <header>
      <p class="current-date">{{ currentMonth }}</p>
      <div class="icons">
        <div class="icon" @click="changeMonth(-1)">
          <span class="material-symbols-outlined">
            chevron_left
          </span>
        </div>
        <div class="icon">
          <span class="material-symbols-outlined" @click="changeMonth(1)">
            chevron_right
          </span>
        </div>

      </div>
    </header>
    <div class="calendar">
      <ul class="weeks">
        <li>Do</li>
        <li>Lu</li>
        <li>Ma</li>
        <li>Mi</li>
        <li>Ju</li>
        <li>Vi</li>
        <li>Sa</li>
      </ul>
      <ul class="days">
        <li v-for="(day, index) in calendarDays" :key="index" :class="{ inactive: day.inactive, active: day.active }"
          @click="onSelect(day, currYear, currMonth)">{{
            day.day }} </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentMonth: "Holi",
        calendarDays: [],
        currYear: 0,
        currMonth: 0,
        months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      };
    },
    mounted() {
      this.currentDate = document.querySelector(".current-date"),
        this.dayTag = document.querySelector(".days"),
        this.prevNextIcon = document.querySelectorAll(".icons span");
      let date = new Date();
      this.currYear = date.getFullYear();
      this.currMonth = date.getMonth();
      this.renderCalendar();
    },
    methods: {
      renderCalendar() {
        let firstDayOfMonth = new Date(this.currYear, this.currMonth, 1).getDay();
        let lastDateofMonth = new Date(this.currYear, this.currMonth + 1, 0).getDate();
        let lastDayofMonth = new Date(this.currYear, this.currMonth, lastDateofMonth).getDay();
        let lastDateofLastMonth = new Date(this.currYear, this.currMonth, 0).getDate();
        let calendarDays = [];

        for (let i = firstDayOfMonth; i > 0; i--) {
          calendarDays.push({ day: lastDateofLastMonth - i + 1, inactive: true });
        }

        for (let i = 1; i <= lastDateofMonth; i++) {
          let isToday = i === new Date().getDate() && this.currMonth === new Date().getMonth()
            && this.currYear === new Date().getFullYear() ? "active" : "";
          let decidir = isToday ? { day: i, active: isToday, today: isToday } : { day: i, inactive: isToday, today: isToday };
          calendarDays.push(decidir);
        }

        for (let i = lastDayofMonth; i < 6; i++) {
          calendarDays.push({ day: i - lastDayofMonth + 1, inactive: true });
        }

        //this.currentDate = `${this.months[this.currMonth]} ${this.currYear}`;
        this.currentDate.innerText = `${this.months[this.currMonth]} ${this.currYear}`;
        this.calendarDays = calendarDays;
      },
      changeMonth(step) {
        this.currMonth += step;
        if (this.currMonth < 0 || this.currMonth > 11) {
          let date = new Date(this.currYear, this.currMonth);
          this.currYear = date.getFullYear();
          this.currMonth = date.getMonth();
        }
        //this.currentDate = `${this.months[this.currMonth]} ${this.currYear}`
        this.renderCalendar();
      },
      onSelect(day, currYear, currMonth) {
        console.log("day,index: ", { day: day.day, currYear, currMonth })
        //this.$emit('selectedObjConsejeria', {day,index})
      }
    },
    computed: {

    }
  };
</script>


<style lang="scss" scoped>





  .wrapper {
    width: 100%;
    background: #fff;
    border-radius: 10px;
    padding: 0 0 5px 0;
  }

  .wrapper header {
    height: 35px;
    display: flex;
    align-items: center;
    padding-inline: 5px;
    justify-content: space-between;

  }

  header p {
    margin: 0;
  }

  header .current-date {
    font-size: 14px;
    font-weight: 700;
    color: rgb(82, 82, 82);
  }

  header .icons {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 25px;
  }

  header .icons .icon:hover {
    border-radius: 50%;
    background: #e1dfdf;
  }

  .icons .icon {
    user-select: none;
    cursor: pointer;
    margin-inline: 5px;
    color: rgb(91, 91, 91);
    /* background-color: #e1dfdf; */
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icons .icon span {
    font-size: 18px;
  }


  li {
    width: 24px;
    height: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 12px !important;
  }



  li::before {
    width: 27px !important;
    height: 27px !important;
    margin: none !important;
  }

  .calendar {
    height: 230px;
    padding: 10px;
  }

  .calendar .days li {
    width: 30px !important;
    height: 30px !important;
    margin-top: 5px !important;
  }


  .weeks {
    /* border: 1px solid red; */
    margin: 0 !important;
    padding: 0 !important;
  }

  .days {
    /* border: 1px solid blue; */
    margin: 0 !important;
    padding: 0 !important;

  }

  .days ul {
    border: 1px solid green;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;

  }


  .calendar ul {
    display: flex;
    list-style: none;
    flex-wrap: wrap;
    text-align: center;
  }


  .calendar .weeks li {
    /* border: 1px solid purple; */
    font-weight: 500;
  }


  .calendar ul li {
    /* border: 1px solid green; */
    position: relative;
    width: calc(100% / 7);
  }


  .calendar .days li {
    /* border: 1px solid yellow; */
    z-index: 1;
    cursor: pointer;
    width: calc(100% / 7) !important;
  }

  .days li.inactive {
    color: #aaa;
  }

  .days li.active {
    color: #fff;
  }

  .calendar .days li::before {
    position: absolute;
    content: "";
    height: 35px;
    width: 35px;
    top: 50%;
    left: 50%;
    z-index: -1;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background: rgba($color: var(--color-button-agenda), $alpha: 0.1);
  }

  .days li:hover::before {
    background: #f2f2f2;
  }

  .days li.active::before {
    background: var(--color-button-agenda);
  }
  
</style>