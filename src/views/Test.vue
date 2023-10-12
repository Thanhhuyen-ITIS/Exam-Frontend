<template>
    <div
        v-if="inforUser"
        class="card-info position-fixed bg-light-blue-lighten-5 text-light-blue-darken-4 pa-4 v-col-2"
    >
        <span class="text-h6 pa-0"> Test name </span>
        <p>
            Username: <strong>{{ inforUser.username }}</strong>
        </p>
        <p class="text-break">Họ tên: {{ inforUser.name }}</p>
        <p>Số câu</p>
        <p>Thời gian: {{ timeFormatted }}</p>
    </div>
    <div
        class="v-col-7 mx-auto bg-light-blue-lighten-5 mt-5"
        v-if="testData"
        @submit.prevent="submit"
    >
        <v-col>
            <v-card
                v-for="(question_test, index) in questions_test"
                :key="question_test.id"
                class="mt-2"
            >
                <v-card-text class="">
                    <div class="d-flex justify-space-between">
                        <span class="ma-0 pa-2 font-weight-bold"
                            >Question {{ index + 1 }}:
                            {{ question_test.question.question_content }}</span
                        >
                    </div>

                    <div
                        v-for="answer in question_test.question.answers"
                        :key="answer.id"
                        class="pa-1 pl-3"
                    >
                        <div class="d-flex align-center">
                            <div class="checkbox-wrapper-18">
                                <div class="round">
                                    <input
                                        type="checkbox"
                                        :id="'AnswerOfUser' + answer.id"
                                        v-model="answer.is_selected"
                                    />
                                    <label
                                        :for="'AnswerOfUser' + answer.id"
                                    ></label>
                                </div>
                            </div>
                            <span class="ma-0 pa-0 ml-1">{{
                                answer.answer_content
                            }}</span>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </v-col>
        <button
            type="submit"
            @click="submit"
            class="pa-2 w-100 mx-auto bg-amber-accent-1"
        >
            Submit
        </button>
    </div>
    <v-snackbar
        v-model="err"
        multi-line
        timeout="10000"
        color="primary"
    >
        {{ err }}
    </v-snackbar>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { userService } from "@/services/userService";
import { resultService } from "@/services/resultService";
import { testService } from "@/services/testService";
import moment from "moment";

const route = useRoute();
const { getInforUser } = userService();
const { addResult, error } = resultService();
const { submitTest } = testService();

const err = ref();

const inforUser = ref();

const testData = ref();

const questions_test = ref([]);

const time_test = ref(0);

const timeFormatted = computed(() => {
    const minutes = Math.floor(time_test.value / 60);
    const seconds = time_test.value - minutes * 60;
    return `${minutes}:${seconds}`;
});

//function

const formatDatetime = (datetime) => {
    return moment(datetime).format("YYYY-MM-DD HH:mm:ss");
};

const calcTimeRemaining = () => {
    const now = new moment();
    const end_time = moment(testData.value.start_time).add(
        testData.value.test.duration,
        "minutes"
    );

    return end_time.diff(now, "seconds");
};

//event

const idInterval = setInterval(() => {
    time_test.value = time_test.value - 1;
}, 1000);

const Interval = computed(() => {
    const now = new moment();
    const end_time_test = new moment(testData.value.test.end_time);
    const diffToEndTime = end_time_test.diff(now, "seconds");
    if (time_test.value <= 0 || diffToEndTime <= 0) {
        clearInterval(idInterval);
        submit();
    }
});

const submit = async () => {
    clearInterval(idInterval);
    let answers = [];
    questions_test.value.forEach((question_test) => {
        console.log(question_test.question.answers);
        answers.push({
            question_id: question_test.question.id,
            answer: question_test.question.answers,
        });
    });
    console.log(answers);

    await submitTest(testData.value.id, formatDatetime(new moment()) , answers);
};

onMounted(async () => {
    const id = route.params.id;
    testData.value = await addResult(id);

    if (error.value) {
        err.value = error.value;
    } else {
        time_test.value = calcTimeRemaining();
        questions_test.value = testData.value.test.question_tests;
        inforUser.value = await getInforUser();
    }
});
</script>

<style scoped>
.card-info {
    position: fixed;
    left: 1%;
    top: 20%;
    border-radius: 2px;
    box-shadow: 0 0 2px 1px #9fc5f0;
}
</style>
