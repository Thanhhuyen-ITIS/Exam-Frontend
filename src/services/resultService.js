import axios from "axios";
import { ref } from "vue";

const error = ref(null);
const isPending = ref(false);

const addResult = async (idTest) => {
    isPending.value = true;
    error.value = "";

    try {
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("access_token");

        const response = (
            await axios.post("create_result", {
                test_id: idTest,
            })
        ).data;
        console.log(response);
        return response;
    } catch (err) {
        error.value = err.response.data.detail;
        console.log(err);
    }
    isPending.value = false;
};

const getResultByTestIdUser = async (idTest) => {
    isPending.value = true;
    error.value = "";

    try {
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("access_token");

        const response = (await axios.get("user/test/" + idTest + "/result")).data;
        console.log(response);
        return response;
    } catch (err) {
        error.value = err.response.data.detail;
        console.log(err);
    }

    isPending.value = false;
};

const getResultsByTestId = async (idTest) => {
    isPending.value = true;
    error.value = "";

    try {
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("access_token");

        const response = (await axios.get("test/" + idTest + "/results")).data;
        console.log(response);
        return response;
    } catch (err) {
        error.value = err.response.data.detail;
        console.log(err);
    }

    isPending.value = false;
};





export function resultService() {
    return { error, isPending, addResult, getResultByTestIdUser, getResultsByTestId };
}
