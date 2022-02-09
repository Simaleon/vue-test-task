<template>
    <div class="testTask">
        <div>
            <h1>Current date</h1>
            <calendar @input="alert($event)"></calendar>
        </div>
        <div>
            <h1>Noize MC's birthday</h1>
            <calendar :date="new Date('9.3.1985')" :lang="'ru'" @input="alert($event)"></calendar>
        </div>
    </div>
</template>

<script lang="js">
    import Vue from "vue";
    import calendar from "./calendar.vue";

    export default Vue.extend({
        name: "client",
        components: {
            calendar
        },
        methods: {
            alert(date) {
                window.alert(date.toLocaleString());
            }
        }
    });
</script>

<style scoped>
    .testTask {
        width: 600px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
    }

    .testTask h1 {
        text-align: center;
    }
</style>