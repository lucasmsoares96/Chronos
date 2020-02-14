<template>
    <div id="schedule">
        <h1>Quadro de horarios</h1>
        <b-table class="schedule" bordered :items="items" :fields="fields">
        </b-table>
    </div>
</template>

<script>
export default {
    name: "Schedule",
    methods: {
        clickOnCell(e){
            console.log(e)
        },
        catchCell(){
            const tdInfo = [... document.querySelectorAll('td.table-info')]
            tdInfo.forEach(e => {
                e.innerHTML = ''
                e.onclick = this.clickOnCell
                })
            const tdwarning = [... document.querySelectorAll('td.table-warning')]
            tdwarning.forEach(e => {
                e.innerHTML = ''
                e.onclick = this.clickOnCell
                })
            const tdDanger = [... document.querySelectorAll('td.table-danger')]
            tdDanger.forEach(e => {
                e.innerHTML = ''
                e.onclick = this.clickOnCell
                })
        }
    },
    computed: {
        fields(){
            return this.$store.state.fields
        },
        items (){
            return this.$store.state.items
        }
    },
    mounted(){
        this.catchCell(),
        this.$store.commit('resSchedule')
    }
};
</script>

<style>
#schedule {
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 20px;
}

td:hover {
    background-color: #c1c1c1;
}
</style>