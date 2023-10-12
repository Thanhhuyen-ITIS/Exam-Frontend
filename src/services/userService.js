import axios from "axios";
import { ref } from "vue";

const error = ref("");
const isPending = ref(false);
const user = ref();

const users = ref([]);


const signUp = async (user) => {
  error.value = null;
  isPending.value = true;
  await axios
    .post("create_user", user)
    .then((response) => {
      console.log(response.data);
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      isPending.value = false;
      console.log("success");
    });
};

const signIn = async (username, password) => {
  error.value = null;
  isPending.value = true;
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  await axios
    .post("login", formData)
    .then((response) => {
      localStorage.setItem("access_token", response.data.access_token);
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      isPending.value = false;
    });
};

const getUser = async () => {
  error.value = null;
  isPending.value = true;
  if (!localStorage.getItem("access_token")) {
    isPending.value = false;
    return;
  }
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");

  await axios
    .get("me")
    .then((response) => {
      user.value = response.data;
    })
    .catch((e) => {
      error.value = e.response.data.detail;
      console.log(e);
    })
    .finally(() => {
      isPending.value = false;
    });
};

const getInforUser = async () => {
  error.value = null;
  isPending.value = true;
  if (!localStorage.getItem("access_token")) {
    isPending.value = false;
    return;
  }

  try {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("access_token");

    let response = (await axios.get("user")).data;
    console.log(response);

    return response;
  }
  catch (e) {
    error.value = e.response.data.detail;
    console.log(e);
  }
  return null;
}

const getUserByAdmin = async (username) => {
  error.value = "";
  isPending.value = false;

  try {
    axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");

    let response = (await axios.get("user/" + username)).data;
  }
  catch (e) {
    error.value = e.response.data.detail;
    console.log(e);
  }
}

const logOut = () => {
  localStorage.removeItem("access_token");
  user.value = null;
};

const getAllUsers = async (page, size) => {
  error.value = null;
  isPending.value = true;
  if (!localStorage.getItem("access_token")) {
    isPending.value = false;
    return;
  }
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");

  await axios

    .get("users", { params: { page, size } })
    .then((response) => {
      users.value = response.data;
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      isPending.value = false;
    });

  return users.value;
};



export function userService() {
  return {
    user,
    error,
    isPending,
    signIn,
    getUser,
    signUp,
    logOut,
    getAllUsers,
    getUserByAdmin,
    getInforUser
  };
}
