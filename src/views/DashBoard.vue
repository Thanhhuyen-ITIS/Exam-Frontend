<template>
    <div class="text-center pa-6 position-relative">
        <p class="text-h5">Dashboard - {{ test.test_name }}</p>
        <p>Time: {{ test.duration }} munites</p>
    </div>

    <div class="ml-5 mr-5 pa-2 elevation-1 border-sm">
        <v-table class="">
            <thead>
                <tr class="bg-grey-lighten-1 text-grey-lighten-2">
                    <th class="border-sm">STT</th>
                    <th class="border-sm">username</th>
                    <th class="border-sm">Name</th>
                    <th class="border-sm">Score</th>
                    <th class="border-sm">Time</th>
                    <!-- <th class="border-sm">Detail</th> -->
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(result, index) in results"
                    :key="result.id"
                    :class="index % 2 == 0 ? 'bg-white' : 'bg-grey-lighten-4'"
                >
                    <td class="border-sm">{{ index + 1 }}</td>
                    <td class="border-sm">{{ result.user.username }}</td>
                    <td class="border-sm">{{ result.user.name }}</td>
                    <td class="border-sm">{{ result.score }}</td>
                    <td class="border-sm">{{ result.completion_time }}</td>
                    <!-- <td class="border-sm">
                        <button class="pa-2 border">Detail</button>
                    </td> -->
                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<script setup>
import { resultService } from "@/services/resultService";
import { testService } from "@/services/testService";
import { ref } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const { getResultsByTestId } = resultService();
const { getTest } = testService();

const results = ref([]);
const test = ref({});

onMounted(async () => {
    const id = route.params.id;
    test.value = await getTest(id);
    results.value = await getResultsByTestId(id);
});
</script>

<style scoped>
.btn-detail-outlined:hover {
    background-color: #e4e4e4;
    color: #000000;
    box-shadow: 0 0 1px 1px #ffffff;
}
.btn-detail-outlined:active {
    background-color: #e0e0e0;
    color: #4b4949;
    box-shadow: 0 0 1px 1px #f1efef;
}
th td {
    border: #000000;
}

.test-info {
    position: absolute;
    top: 1px;
    right: 3px;
}
</style>
