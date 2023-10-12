<template>
  <div>Header</div>
  <div class="pl-16 pr-16 pa-4">
    <div class="d-flex justify-space-between align-center mb-4">
      <div class="w-25">
        <v-text-field
          density="compact"
          variant="solo"
          label="Search User"
          append-inner-icon="mdi-magnify"
          single-line
          hide-details
          @click:append-inner="onClick"
          class="ma-2"
          v-model="searchQuestion"
        ></v-text-field>
      </div>
      <v-btn prepend-icon="mdi-plus" class="text-none">Add User</v-btn>
    </div>
    <div>
      <v-table class="border-sm elevation-1">
        <thead>
          <tr>
            <th class="text-left font-weight-bold bg-grey-lighten-2">ID</th>
            <th class="text-left font-weight-bold bg-grey-lighten-2">Username</th>
            <th class="text-left font-weight-bold bg-grey-lighten-2">Name</th>
            <th class="text-left font-weight-bold bg-grey-lighten-2">Email</th>
            <th class="text-left font-weight-bold bg-grey-lighten-2">View</th>
            <th class="text-left font-weight-bold bg-grey-lighten-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.username"  :class="index % 2 == 1? 'bg-grey-lighten-4': 'bg-white'">
            <td>{{ index + 1 }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <v-btn variant="outlined" class="text-none"  @click="() => {router.push({name: 'ManagerUserDetail', params: {id: user.username}})}" >Detail</v-btn>
            </td>
            <td>Action</td>
          </tr>
        </tbody>
      </v-table>
      <v-pagination

        :total-visible="5"
        v-model="pagination.page"
        :length="pagination.pages"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        class="border mt-5 pa-0"
      ></v-pagination>
    </div>
  </div>
</template>

<script setup>
import { userService } from "@/services/userService";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";


const { getAllUsers } = userService();

const router = useRouter();

const pagination = ref({
  page: 1,
  pages: 1,
  size: 2,
  total: 0,
});

const paginationData = ref();

//watch
watch([() => pagination.value.page, () => pagination.value.size], async () => {
  paginationData.value = await getAllUsers(pagination.value.page, pagination.value.size);
});

const users = computed(() => {
  pagination.value.pages = paginationData.value?.pages;
  pagination.value.total = paginationData.value?.total;
  return paginationData.value?.items;
});

onMounted(async () => {
  paginationData.value = await getAllUsers(pagination.value.page, pagination.value.size);

})

</script>
