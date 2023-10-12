import axios from "axios";
import { ref } from "vue";

const topics = ref([]);
const topic = ref();
const error = ref();
const isPending = ref(false);

const getTopics = async () => {
  isPending.value = true;
  error.value = null;
  try {

    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("access_token");

    const response = await axios.get("/topics");
    topics.value = response.data;
    isPending.value = false;

    return topics.value;
  } catch (err) {
    error.value = err.message;
    isPending.value = false;
  }
}


const addTopic = async (topic) => {
  isPending.value = true;
  error.value = null;
  try {
    axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");

    const response = await axios.post("/create_topic", topic);
    topics.value = response.data;
    isPending.value = false;
  }
  catch (err) {
    console.log(err);
    isPending.value = false;
  }
}

export function topicService() {
  return { topics, error, isPending, getTopics, addTopic };
}
