import axios from "axios";
import { ref } from "vue";

const questions = ref([]);
const error = ref("");
const isPending = ref(false);
const status = ref();
const question = ref();

const getQuestions = async (page, size) => {
  error.value = null;
  isPending.value = true;

  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");

  await axios
    .get("questions", { params: { page, size } })
    .then((response) => {
      questions.value = response.data;
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      isPending.value = false;
    });
  return questions.value;
};

//for admin
const getQuestionByTest = async (id) => {
  error.value = null;
  isPending.value = true;

  if (!localStorage.getItem("access_token")) {
    isPending.value = false;
    return;
  }

  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");

  await axios
    .get("get_test_detail/" + id)
    .then((response) => {
      questions.value = response.data;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      isPending.value = false;
    });

  return questions.value;
};

const addQuestion = async (question) => {
  error.value = null;
  isPending.value = true;

  if (!localStorage.getItem("access_token")) {
    isPending.value = false;
    return;
  }

  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");

  await axios
    .post("create_question", question)
    .then((response) => {
      console.log(response.data);
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      isPending.value = false;
    });
};

const addQuestionToTest = async (id_test, id_questions) => {
  error.value = null;
  isPending.value = true;

  if (!localStorage.getItem("access_token")) {
    isPending.value = false;
    return;

  }

  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");

  await axios
    .post("create_test_detail/" + id_test, id_questions)
    .then((response) => {
      status.value = response.data;
    })
    .catch((e) => {
      error.value = e.response.data.detail;
    })
    .finally(() => {
      isPending.value = false;
    });
};


const updateQuestion = async (question, id) => {
  error.value = null;
  isPending.value = true;

  if (!localStorage.getItem("access_token")) {
    isPending.value = false;
    return;
  }
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");

  await axios

    .put("update_question/" + id, question)
    .then((response) => {
      console.log(response.data);
    })
    .catch((e) => {
      console.log(e);
    });
};

const deleteQuestionInTest = async (id_test, id_question) => {
  error.value = null;
  isPending.value = true;

  if (!localStorage.getItem("access_token")) {
    isPending.value = false;
    return;
  }
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");

  await axios
    .delete("delete_test_detail/" + id_test + "/" + id_question)
    .then((response) => {
      console.log(response.data);
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      isPending.value = false;
    });
};



export function questionsService() {
  return {
    questions,
    status,
    error,
    isPending,
    getQuestions,
    question,
    addQuestion,
    updateQuestion,
    getQuestionByTest,
    deleteQuestionInTest,
    addQuestionToTest
  };
}
