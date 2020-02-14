import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        items: [],
        fields: []
    },
    mutations: {
        resSchedule(state, obj) {
            axios
                .get("http://localhost:3000/dataRecursos", {
                    params: {
                        data : obj[0],
                        tipoRecurso : obj[1]
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
        }
    }
});
