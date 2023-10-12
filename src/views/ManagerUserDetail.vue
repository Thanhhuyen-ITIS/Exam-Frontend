<template>
  <div class="main ma-2">
    <div class="info_user d-flex justify-center">
      <v-card class="mt-5 pa-5">
        <div class="d-flex">
          <span class="label-info">Username</span>
          <span>{{ user.username }}</span>
        </div>
        <div class="d-flex">
          <span class="label-info">Email</span>
          <span>{{ user.email }}</span>
        </div>
        <div class="d-flex">
          <span class="label-info">Fullname</span>
          <span>{{ user.name }}</span>
        </div>
      </v-card>
    </div>
    <div class="exam_attend"></div>
  </div>
</template>

<script setup>
import { userService } from "@/services/userService";
import { onMounted, ref } from "vue";

const user = ref({
  username: "Admin",
  email: "admin@gmail.com",
  name: "Admin",
});
const { getUserbyAdmin } = userService();

onMounted(async () => {
  await getUserbyAdmin();
});
</script>

<style scoped>
.label-info {
  font-weight: 700;
  font-family: "Roboto", sans-serif;
}
</style>
