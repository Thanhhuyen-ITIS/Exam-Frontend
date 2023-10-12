<template>
  <HelloWorld />
</template>

<script setup>
import HelloWorld from '@/components/HelloWorld.vue'
import { userService } from '@/services/userService';
import { onMounted } from 'vue';

const { user, getUser } = userService();

onMounted(async () => {
  await getUser();
})
</script>
