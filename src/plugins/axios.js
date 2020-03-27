import axios from 'axios'
import { userKey } from "@/global";

const success = res => res
const error = err => {
    if (401 === err.response.status) {
        localStorage.setItem(
            userKey,
            JSON.stringify({ auth: false, token: null, payload: {} })
        );
        this.$store.commit("setUser", {
            auth: false,
            token: null,
            payload: {}
        });
        if (
            window.location.pathname != "/" &&
            window.location.pathname != "/schedule"
        ) {
            this.$router.push("/");
        }
    } else {
        return Promise.reject(err)
    }
}

axios.interceptors.response.use(success, error)