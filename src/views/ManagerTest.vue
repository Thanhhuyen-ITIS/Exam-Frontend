<template>
    <h3 class="text-center pa-2 font-weight-medium">Quản lý bài Test</h3>
    <div class="ma-4 pa-10 bg-white" v-if="isAdmin">
        <div class="d-flex justify-space-between mb-1">
            <div class="w-50 d-flex">
                <div class="w-33">
                    <v-text-field
                        density="compact"
                        variant="solo"
                        label="Search Test"
                        append-inner-icon="mdi-magnify"
                        single-line
                        hide-details
                        @click:append-inner="onClick"
                        class="ma-2"
                        v-model="searchTest"
                    ></v-text-field>
                </div>
                <div class="w-33">
                    <v-select
                        clearable
                        label="Select Topic"
                        :items="topics"
                        variant="outlined"
                        density="compact"
                        search
                        item-title="topic_name"
                        item-value="id"
                        class="ma-2"
                        v-model="selectedTopic"
                        chips
                    ></v-select>
                </div>
            </div>
            <div>
                <v-btn class="pl-1 pr-1 ma-1" @click="isNewTopic = true">
                    <v-icon start icon="mdi-plus"></v-icon>
                    Thêm Topic</v-btn
                >
                <v-btn class="pl-1 pr-1 ma-1" @click="isNewTest = true">
                    <v-icon start icon="mdi-plus"></v-icon>
                    Thêm bài test</v-btn
                >
            </div>
        </div>
        <div>
            <v-table class="border-sm elevation-1">
                <thead class="bg-grey-lighten-2">
                    <tr>
                        <th>id</th>
                        <th>Test Name</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th>Kết quả</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(test, index) in testsFiltered"
                        :key="test.id"
                        :class="
                            index % 2 != 0 ? 'bg-grey-lighten-5' : 'bg-white'
                        "
                    >
                        <td>{{ test.id }}</td>
                        <td>{{ test.test_name }}</td>
                        <td>{{ test.start_time }}</td>
                        <td>{{ test.end_time }}</td>
                        <td>{{ test.duration }}</td>
                        <td>
                            <span
                                class=""
                                :class="
                                    test.status == 'Ended'
                                        ? 'text-grey-darken-2'
                                        : test.status == 'In progress'
                                        ? 'text-green-accent-3'
                                        : 'text-black'
                                "
                                >{{ test.status }}</span
                            >
                        </td>
                        <td>
                            <router-link
                                :to="{
                                    name: 'ManagerTestDetail',
                                    params: { id: test.id },
                                }"
                                ><v-btn
                                    color="#83ff88"
                                    class="pl-1 pr-1 ma-1 text-none"
                                >
                                    Edit</v-btn
                                ></router-link
                            >

                            <v-btn
                                color="#ff1134"
                                class="pl-1 pr-1 ma-1 text-none"
                                @click="isCfDelete = true"
                                >Delete</v-btn
                            >
                        </td>
                        <td>
                            <v-btn
                                variant="outlined"
                                text="Xem kết quả"
                                class="pl-1 pr-1 text-none"
                                @click="
                                    router.push({
                                        name: 'Dashboard',
                                        params: { id: test.id },
                                    })
                                "
                            ></v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </div>
        <v-pagination
            :total-visible="5"
            v-model="pagination.page"
            :length="pagination.pages"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            class="border mt-5"
        ></v-pagination>
    </div>

    <div class="text-center">
        <v-dialog v-model="isNewTopic" width="400" persistent>
            <v-card>
                <v-card-title>
                    <span class="text-h5">New Topic</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field
                        clearable
                        hide-details="auto"
                        label="Topic Name"
                        v-model="newTopic.topic_name"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions class="d-flex justify-end mr-4">
                    <v-btn
                        variant="elevated"
                        text="Cancel"
                        color="#cecece"
                        class="text-none"
                        @click="isNewTopic = false"
                    ></v-btn>
                    <v-btn
                        variant="elevated"
                        text="Add"
                        color="#6aa84f"
                        class="text-none text-white"
                        @click="addTopic"
                    ></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
    <div class="text-center">
        <v-dialog v-model="isNewTest" persistent class="w-50">
            <v-card>
                <v-card-title class="text-center mt-4">New Test</v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    label="Test Name"
                                    type="text"
                                    variant="solo"
                                    v-model="newTest.test_name"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row justify="">
                            <v-col cols="6">
                                <v-text-field
                                    variant="solo"
                                    label="Start time"
                                    type="datetime-local"
                                    required
                                    v-model="newTest.start_time"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    variant="solo"
                                    label="End time"
                                    type="datetime-local"
                                    v-model="newTest.end_time"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="5"
                                ><v-select
                                    chips
                                    label="Topic"
                                    :items="topics"
                                    variant="solo"
                                    item-title="topic_name"
                                    item-value="id"
                                    v-model="newTest.topic_id"
                                ></v-select
                            ></v-col>
                            <v-col cols="">
                                <v-text-field
                                    variant="solo"
                                    density="compact"
                                    label="Duration (m)"
                                    type="Number"
                                    v-model="newTest.duration"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="">
                                <v-text-field
                                    variant="solo"
                                    density="compact"
                                    label="limit"
                                    type="Number"
                                    v-model="newTest.limit"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <p class="text-grey-lighten-1 d-inline">Display answer</p>
                                <div class="checkbox-wrapper-18 mr-2">
                                    <div class="round">
                                        <input
                                            type="checkbox"
                                            id="permission_review"
                                            v-model="newTest.permission_review"
                                        />
                                        <label for="permission_review"></label>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-container class="d-flex justify-end">
                        <v-btn
                            variant="tonal"
                            class="text-none mr-4"
                            color="#dddddd"
                            @click="isNewTest = false"
                            >Cancel</v-btn
                        >
                        <v-btn
                            variant="flat"
                            class="text-none"
                            color="#d5fcc4"
                            type="submit"
                            @click="addTest"
                            >Submit</v-btn
                        >
                    </v-container>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { testService } from "@/services/testService";
import { userService } from "@/services/userService";
import { topicService } from "@/services/topicService";
import { computed, onMounted, ref, watch } from "vue";
import moment from "moment";
import { useRouter } from "vue-router";

const { user, getUser } = userService();
const { getTests, getTestByTopic } = testService();
const { getTopics } = topicService();

const isAdmin = ref(false);
const router = useRouter();

const pagination = ref({
    page: 1,
    pages: 0,
    size: 20,
    total: 0,
});

const dataPagination = ref();

const tests = computed(() => {
    if (dataPagination.value == null) return [];

    pagination.value.pages = dataPagination.value.pages;
    pagination.value.total = dataPagination.value.total;

    return dataPagination.value.items;
});

const newTest = ref({
    test_name: "",
    start_time: null,
    end_time: null,
    duration: Number,
    topic_id: "",
    limit: Number,
    permission_review: false,
});

const newTopic = ref({ topic_name: "" });
const topics = ref([]);
const selectedTopic = ref();
const searchTest = ref("");

const isNewTopic = ref(false);
const isNewTest = ref(false);
const isCfDelete = ref(false);

const formatDatetime = (datetime) => {
    return moment(datetime, "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY HH:mm");
};

// watch
watch(
    () => pagination.value.page,
    async () => {
        dataPagination.value = selectedTopic.value
            ? await getTestByTopic(
                  selectedTopic.value,
                  pagination.value.page,
                  pagination.value.size
              )
            : await getTests(pagination.value.page, pagination.value.size);
    }
);

//function

const test_status = (test) => {
    const now = moment();
    const start_time = moment(test.start_time, "YYYY-MM-DD HH:mm:ss");
    const end_time = moment(test.end_time, "YYYY-MM-DD HH:mm:ss");
    if (now.isBefore(start_time)) test.status = "Not started";
    else if (now.isAfter(end_time)) {
        test.status = "Ended";
    } else test.status = "In progress";
};

const testsFiltered = computed(() => {
    return tests.value.filter((test) => {
        test_status(test);
        test.start_time = formatDatetime(test.start_time);
        test.end_time = formatDatetime(test.end_time);
        return test.test_name
            .toLowerCase()
            .includes(searchTest.value.toLowerCase());
    });
});

const addTopic = async () => {
    await topicService().addTopic(newTopic.value);
    isNewTopic.value = false;
    topics.value = await getTopics();
};

const addTest = async () => {
    await testService().addTest(newTest.value);
    isNewTest.value = false;
    dataPagination.value = await getTests(
        pagination.value.page,
        pagination.value.size
    );
};

const onClick = computed(async () => {
    if (!selectedTopic.value)
        return (dataPagination.value =
            (await getTests(pagination.value.page, pagination.value.size)) ||
            []);
    return (dataPagination.value =
        (await getTestByTopic(
            selectedTopic.value,
            pagination.value.page,
            pagination.value.size
        )) || []);
});

onMounted(async () => {
    await getUser();
    isAdmin.value = !user.value || user.value.role != 1 ? false : true;
    dataPagination.value = await getTests(
        pagination.value.page,
        pagination.value.size
    );
    topics.value = await getTopics();
});
</script>

<style scope>
.bd {
    border: 2px solid rgb(127, 227, 97);
}
</style>
