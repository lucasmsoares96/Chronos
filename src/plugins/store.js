import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        obj: {},
        items: [],
        fields: [],
        user: {
            nome: 'Lucas Martins',
            email: 'lucasmartinssoares@live.com'
        },
    },
    mutations: {
        resSchedule(state) {
            axios
                .get("http://localhost:3000/dataRecursos", {
                    params: {
                        data: state.obj.data,
                        tipoRecurso: state.obj.tipoRecurso,
                    }
                })
                .then(res => {
                    state.items = res.data;
                    state.items.forEach((e, index1) => {
                        state.items[index1]["_cellVariants"] = {};
                        Object.values(e).forEach((el, index2) => {
                            if (
                                el == 2 &&
                                Object.keys(state.items[index1])[index2] !=
                                    "idhorario"
                            ) {
                                let col = String(
                                    Object.keys(state.items[index1])[index2]
                                );
                                state.items[index1]["_cellVariants"][col] =
                                    "danger";
                            } else if (
                                el == 1 &&
                                Object.keys(state.items[index1])[index2] !=
                                    "idhorario"
                            ) {
                                let col = String(
                                    Object.keys(state.items[index1])[index2]
                                );
                                state.items[index1]["_cellVariants"][col] =
                                    "warning";
                            } else if (
                                el == 0 &&
                                Object.keys(state.items[index1])[index2] !=
                                    "idhorario"
                            ) {
                                let col = String(
                                    Object.keys(state.items[index1])[index2]
                                );
                                state.items[index1]["_cellVariants"][col] =
                                    "info";
                            }
                        });
                    });
                    state.fields = Object.keys(state.items[0]).filter(obj => {
                        return obj == "idhorario" || obj == "_cellVariants"
                            ? false
                            : true;
                    });
                });
        },
        setObj(state,obj){
            state.obj.data = obj[0],
            state.obj.tipoRecurso = obj[1]

        }
    }
});
