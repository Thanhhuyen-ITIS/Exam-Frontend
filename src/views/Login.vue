<template>
    <div class="ma-14">
        <!-- <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img> -->

        <v-form @submit.prevent="onSubmit" class="mx-auto">
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
                    v-model="username"
                    :rules="rules.username"
                ></v-text-field>

                <div
                    class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
                >
                    Password

                    <a
                        class="text-caption text-decoration-none text-blue"
                        href="#"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Forgot login password?</a
                    >
                </div>

                <v-text-field
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'"
                    density="compact"
                    placeholder="Enter your password"
                    prepend-inner-icon="mdi-lock-outline"
                    variant="outlined"
                    @click:append-inner="visible = !visible"
                    v-model="password"
                ></v-text-field>

                <v-card class="mb-7" color="surface-variant" variant="tonal">
                </v-card>

                <v-btn
                    block
                    class="mb-8"
                    color="blue"
                    size="large"
                    variant="tonal"
                    type="submit"
                >
                    Log In
                </v-btn>

                <v-card-text class="text-center">
                    <router-link
                        :to="{ name: 'SignUp', params: {} }"
                        class="text-blue text-decoration-none"
                        rel="noopener noreferrer"
                    >
                        Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
                    </router-link>
                </v-card-text>
            </v-card>
        </v-form>
    </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { userService } from "@/services/userService";
import { useRouter } from "vue-router";

const router = useRouter();

const visible = ref(false);
const username = ref("");
const password = ref("");

const error = ref("");

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
});

const { signIn } = userService();

const onSubmit = async () => {
    //console.log(username.value, password.value);
    await signIn(username.value, password.value);
    router.push({ name: "Home", params: {} });
};
</script>
