<template>
    <div class="calendar">
        <header>
            <div class="monthChange prev" @click="prevMonth"></div>
            <div class="month">{{ labels.months[currentDate.getMonth()] + ' ' + currentDate.getFullYear() }}</div>
            <div class="monthChange next" @click="nextMonth"></div>
        </header>

        <table class="dates">
            <thead>
                <tr>
                    <td v-for="day in labels.weekdays">
                        {{ day }}
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="week in dates">
                    <td v-for="day in week" :class="{ current: day && day.getTime() === currentDate.getTime() }" @click="click($event, day)">
                        <div>
                            {{ day === null ? '' : day.getDate() }}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="js">
    import Vue from "vue";

    const ru = {
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            weekdays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
        },
        en = {
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        };

    export default Vue.extend( {
        name: "calendar",
        data() {
            return {
                labels: en,
                currentDate: new Date(),
                dates: []
            };
        },
        props: {
            date: {
                type: Date,
                default() {
                    return new Date();
                }
            },
            lang: {
                type: String,
                default: 'en',
                validator: function (value) {
                    return ['ru', 'en'].indexOf(value) !== -1
                }
            }
        },
        methods: {
            click(event, day) {
                if(day !== null) {
                    this.currentDate = day;

                    this.$emit('input', day);
                }
            },
            createMonth(date) {
                let dateCopy = new Date(date),
                    month = dateCopy.getMonth(),
                    monthArray = [];

                dateCopy.setDate(1);

                while(dateCopy.getMonth() === month) {
                    let currentWeek = [];

                    for(let i = 0; i < 7; i++) {
                        if(dateCopy.getMonth() === month && dateCopy.getDay() === i) {
                            currentWeek.push(new Date(dateCopy));

                            dateCopy.setDate(dateCopy.getDate() + 1);
                        } else {
                            currentWeek.push(null);
                        }
                    }

                    monthArray.push(currentWeek);
                }

                return monthArray;
            },
            nextMonth() {
                this.currentDate.setMonth(this.currentDate.getMonth() + 1);

                this.dates = this.createMonth(this.currentDate);
            },
            prevMonth() {
                this.currentDate.setMonth(this.currentDate.getMonth() - 1);

                this.dates = this.createMonth(this.currentDate);
            }
        },
        created() {
            this.currentDate = this.date;
            this.dates = this.createMonth(this.date);

            if(this.lang === 'ru') {
                this.labels = ru;
            }
        }
    });
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

    .calendar {
        box-sizing: border-box;
        width: 250px;
        height: 250px;
        padding: 17px;
        user-select: none;
    }

    header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 6px;
        font-family: Roboto, sans-serif;
        font-size: 14px;
        font-weight: 500;
        color: #313131;
    }

    header .monthChange {
        width: 15px;
        color: #94A1B3;
        cursor: pointer;
        background-position: center;
        background-repeat: no-repeat;
    }

    header .monthChange.prev {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 512'%3E%3Cpath fill='%2394A1B3' d='M137.4 406.6l-128-127.1C3.125 272.4 0 264.2 0 255.1s3.125-16.38 9.375-22.63l128-127.1c9.156-9.156 22.91-11.9 34.88-6.943S192 115.1 192 128v255.1c0 12.94-7.781 24.62-19.75 29.58S146.5 415.8 137.4 406.6z'/%3E%3C/svg%3E");
    }

    header .monthChange.next {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 512'%3E%3Cpath fill='%2394A1B3' d='M118.6 105.4l128 127.1C252.9 239.6 256 247.8 256 255.1s-3.125 16.38-9.375 22.63l-128 127.1c-9.156 9.156-22.91 11.9-34.88 6.943S64 396.9 64 383.1V128c0-12.94 7.781-24.62 19.75-29.58S109.5 96.23 118.6 105.4z'/%3E%3C/svg%3E");
    }

    .dates {
        font-size: 12px;
        font-weight: 400;
        font-family: 'Roboto',Arial,sans-serif;
        text-align: center;
    }

    .dates td {
        width: 31px;
        height: 23px;
    }

    .dates tbody {
        line-height: 20px;
    }

    .dates tbody td:first-child,
    .dates tbody td:last-child {
        font-weight: 500;
        color: #1CA1C1;
    }

    .dates tbody td {
        cursor: pointer;
    }

    .dates tbody td div {
        width: 20px;
        height: 20px;
    }

    .dates tbody td.current div {
        color: #FFFFFF;
        background-color: #1CA1C1;
        border-radius: 50%;
    }

    .dates tbody td:not(.current):hover div {
        background-color: #F4F5F9;
        border-radius: 50%;
    }
</style>