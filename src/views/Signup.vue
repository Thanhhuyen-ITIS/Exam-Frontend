<template>
  <div class="mt-14">
    <!-- <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img> -->
    <v-form @submit.prevent="onSubmit">
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
      >
        <div class="text-subtitle-1 text-medium-emphasis">Account</div>

        <v-text-field
          density="compact"
          placeholder="Username"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
          v-model="user.username"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Password
        </div>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          v-model="user.password"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Repeat your password
        </div>
        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-repeat-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          v-model="repassword"
        ></v-text-field>

        <v-btn
          block
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          type="submit"
        >
          Sign Up
        </v-btn>
        <v-card-text class="text-center">
          <router-link
            :to="{ name: 'Login', params: {} }"
            class="text-blue text-decoration-none"
          >
            Login now <v-icon icon="mdi-chevron-right"></v-icon>
          </router-link>
        </v-card-text>
      </v-card>
    </v-form>
  </div>
</template>
<script setup>
import { userService } from "@/services/userService";
import { reactive, ref } from "vue";

const visible = ref(false);

const user = reactive({ username: "", password: "" });

const repassword = ref("");

const rules = reactive({
  username: [
    (value) => {
      if (value) return error.value ? error.value : true;
      return "Username is required.";
    },
  ],
  password: [
    (value) => {
      if (value) {
        return true;
      }
      return "Password is required.";
    },
  ],
  repassword: [
    (value) => {
      return value === user.password;
    },
  ],
});

const { signUp } = userService();

const onSubmit = async () => {
  await signUp(user);
}
</script>
