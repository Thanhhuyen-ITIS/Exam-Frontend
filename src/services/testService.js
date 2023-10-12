import axios from "axios";
import { ref } from "vue";
import { userService } from "./userService";

const tests = ref([]);
const test = ref();
const error = ref(null);
const isPending = ref(false);

const { user, getUser } = userService();

const getTest = async (id) => {
    isPending.value = true;
    error.value = "";

    axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("access_token");

    await axios

        .get("test/" + id)
        .then((response) => {
            test.value = response.data;
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
    isPending.value = false;
    return test.value;
};

const getTests = async (page, size) => {
    isPending.value = true;
    error.value = "";

    axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("access_token");

    await axios.get("/tests", { params: { page, size } }).then((response) => {
        tests.value = response.data;
        console.log(response.data);
    });
    return tests.value;
};

const getTestByTopic = async (id, page, size) => {
    isPending.value = true;
    error.value = "";

    axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("access_token");

    await axios
        .get("about_topic/" + id, { params: { page, size } })
        .then((response) => {
            tests.value = response.data;
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            isPending.value = false;
        });
    return tests.value;
};

const getTestByUser = async (id) => {
    tests.value = [];
    isPending.value = true;
    error.value = "";
    await getUser();
    let URL = (user.value.role == 1 ? "" : "user/") + "topic/" + id + "/tests/";

    console.log(URL);
    try {
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("access_token");

        const response = await axios.get(URL);
        tests.value = response.data;
        console.log(response.data);
    } catch (err) {
        console.log(err);
    } finally {
        isPending.value = false;
    }
    return tests.value;
};

const addTest = async (test) => {
    isPending.value = true;
    error.value = null;

    axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("access_token");

    await axios
        .post("/create_test", test)
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            isPending.value = false;
        });
};

const deleteTest = async (id) => {
    isPending.value = true;
    error.value = null;

    axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("access_token");

    await axios
        .delete("delete_test/" + id)
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            isPending.value = false;
        });
};

const updateTest = async (id, test) => {
    isPending.value = true;
    error.value = null;

    axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("access_token");

    await axios
        .put("update_test/" + id, test)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })

        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            isPending.value = false;
        });
};

const submitTest = async (id, end_time, answers) => {
    isPending.value = true;
    error.value = null;

    axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("access_token");

    await axios
        .post("create_answers_of_user", { end_time: end_time , result_id: id, answers: answers })
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            isPending.value = false;
        });
};

export function testService() {
    return {
        error,
        isPending,
        getTests,
        addTest,
        getTestByTopic,
        deleteTest,
        getTest,
        updateTest,
        getTestByUser,
        submitTest,
    };
}
