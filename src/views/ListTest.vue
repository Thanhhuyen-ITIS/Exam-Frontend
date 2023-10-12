<template>
    <div>
        <div>Danh sách bài test</div>
        <div>
            <v-card class="bg-grey-lighten-5 h-screen ml-6 mr-6">
                <v-container>
                    <v-card
                        v-for="test in tests"
                        :key="test.id"
                        class="pl-10 pr-10 border-sm elevation-1 mb-4"
                    >
                        <div class="d-flex align-center justify-space-between">
                            <div>
                                <span class="pl-0 text-h5">{{
                                    test.test_name
                                }}</span>
                                <span class="pa-0 info-test"
                                    >Begin time:
                                    {{ formatDatetime(test.start_time) }}</span
                                >
                                <span class="pa-0 info-test"
                                    >End Time:
                                    {{ formatDatetime(test.end_time) }}</span
                                >
                                <span class="pa-0 info-test"
                                    >Duration: {{ test.duration }} munites</span
                                >
                                <span class="pl-0 status-time">{{
                                    test.status
                                }}</span>
                            </div>
                            <button
                                :disabled="!test.is_start"
                                class="pa-1 pl-3 pr-3 text-white"
                                :class="
                                    test.is_start
                                        ? 'btn-detail-test'
                                        : 'bg-grey-lighten-2 border-sm pointer-not-allowed'
                                "
                                @click="
                                    test.status === 'Finished'
                                        ? router.push({
                                              name: 'TestResult',
                                              params: { id: test.id },
                                          })
                                        : router.push({
                                              name: 'Test',
                                              params: { id: test.id },
                                          })
                                "
                            >
                                {{
                                    test.status === "Finished"
                                        ? "Result"
                                        : "Start"
                                }}
                            </button>
                        </div>
                    </v-card>
                </v-container>
            </v-card>
        </div>
    </div>
</template>

<script setup>
import { testService } from "@/services/testService";
import moment from "moment";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const { getTestByUser } = testService();

const tests = ref([]);

const formatDatetime = (datetime) => {
    return datetime
        ? moment(datetime, "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY HH:mm")
        : "";
};

setInterval(() => {
    tests.value.forEach((test) => {
        const now = moment();
        const start = moment(test.start_time, "YYYY-MM-DD HH:mm:ss");
        const end = moment(test.end_time, "YYYY-MM-DD HH:mm:ss");
        if (now.isBefore(start)) {
            test.is_start = false;
            test.status = "Not Started " + moment(test.start_time).fromNow();
        } else if (now.isAfter(end)) {
            test.is_start = true;
            test.status = "Finished";
        } else {
            test.is_start = true;
            test.status = "In progress " + moment(test.end_time).fromNow();
        }
    });
}, 1000);

onMounted(async () => {
    const id = route.params.id;
    console.log(id);
    tests.value = await getTestByUser(id);
});
</script>

<style scoped>
.btn-detail-test {
    background-color: #47a3ef;
    box-shadow: inset 0 0 1px 1px #e0e0e0;
}

.btn-detail-test:hover {
    box-shadow: inset 0 0 1px 1px #d3d2d2;
    background-color: #4d97e6;
    cursor: pointer;
}

.btn-detail-test:active {
    box-shadow: inset 0 0 1px 1px #c6c6c6;
    background-color: #4281d9;
}

.info-test {
    font-size: 12px;
    color: #1c1a1a;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.status-time {
    font-size: 12px;
    color: #433812;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-weight: bold;
}

.pointer-not-allowed {
    cursor: not-allowed;
}
</style>
