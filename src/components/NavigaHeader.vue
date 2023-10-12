<template>
  <div
    class="d-flex align-center justify-lg-space-between pa-1 pl-2 bg-blue-lighten-4"
  >
    <div class="ml-14">
      <span class="font-weight-bold app-name">Exam</span>
    </div>
    <div class="nav">
      <router-link :to="{ name: 'Home', params: {} }" class="nav-item"
        >Trang chủ</router-link
      >
      <router-link :to="{ name: 'ListTopic', params: {} }" class="nav-item"
        >Bài kiểm tra</router-link
      >
      <router-link :to="{ name: 'Home', params: {} }" class="nav-item"
        >Lịch sử</router-link
      >
      <router-link
        :to="{ name: 'ManagerTest', params: {} }"
        class="nav-item"
        v-if="isAdmin"
        >Quản lý bài kiểm tra</router-link
      >
      <router-link
        :to="{ name: 'Home', params: {} }"
        class="nav-item"
        v-if="isAdmin"
        >Quản lý người dùng</router-link
      >
    </div>

    <div>
      <v-btn
        v-if="!user"
        color="#64B5F6"
        class="mr-2 pr-1 pl-1"
        @click="goToLogin"
        >Đăng nhập</v-btn
      >
      <v-btn v-if="!user" color="#E3F2FD" class="mr-5" @click="goToSignUp"
        >Đăng ký</v-btn
      >

      <div class="dropdown" v-if="user">
        <v-btn color="#ffffff" class="pr-1 pl-1 ma-1"
          >Hi, {{ user.username }}</v-btn
        >
        <div class="dropdown-content">
          <router-link :to="{ name: 'Home', params: {} }"
            >Thông tin</router-link
          >
          <span @click="onLogout">Đăng xuất</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { userService } from "@/services/userService";
import { onMounted, ref, computed, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goToSignUp = () => {
  router.push({ name: "SignUp", params: {} });
};

const goToLogin = () => {
  router.push({ name: "Login", params: {} });
};

const { user, getUser, logOut } = userService();
const isAdmin = ref(false);

watch(user.value, () => {
  if (user.value) {
    isAdmin.value = user.value.role === 1;
  }
});

const onLogout = () => {
  logOut();
  isAdmin.value = false;
};

onMounted(async () => {
  await getUser();
  if (user.value)
    isAdmin.value = user.value.role === 1;

});
</script>

<style scope>
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 125px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 4%;
  margin-top: 2px;
}

.dropdown-content a,
span {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #f1f1f1;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

.nav a {
  text-decoration: none;
  color: black;
  padding: 15px;
  box-shadow: inset;
}

.nav-item:hover {
  box-shadow: 1px 1px 1px 1px rgb(176, 209, 241);
}

.app-name {
  font-size: larger;
  font-family: sans-serif;
}
</style>
