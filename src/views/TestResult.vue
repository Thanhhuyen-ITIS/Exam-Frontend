<template>
    <div class="position-fixed" v-if="resultData">
        <v-card class="bg-light-blue-lighten-5 pa-2">
            <p>test name: {{ resultData.test.test_name }}</p>
            <p>username: {{ resultData.user.username }}</p>
            <p>name: {{ resultData.user.name }}</p>
            <p>Email: {{ resultData.user.email }}</p>
            <p>score : {{ resultData.score }}</p>
            <p>time: {{ timeCompletion }}</p>
        </v-card>
    </div>
    <div class="mx-auto bg-light-blue-lighten-5 v-col-8 mt-8" v-if="resultData">
        <v-col>
            <v-card
                v-for="(answerOfUser, index) in resultData.answer_of_users"
                :key="answerOfUser.id"
                class="ma-3 pl-3 pr-3 pt-3"
            >
                <p>
                    Question {{ index + 1 }}:
                    {{ answerOfUser.question.question_content }}
                </p>
                <div
                    v-for="(option, index) in answerOfUser.answer"
                    :key="option.id"
                    class="pl-2 mb-1"
                    :class="
                        answerOfUser.question.answers[index]?.is_correct_answer
                            ? 'bg-green-lighten-5'
                            : ''
                    "
                >
                    <div class="d-flex align-center">
                        <div class="checkbox-wrapper-18">
                            <div class="round">
                                <input
                                    disabled
                                    type="checkbox"
                                    :id="
                                        'AnswerOfUser' + index + ' ' + option.id
                                    "
                                    v-model="option.is_selected"
                                />
                                <label
                                    :for="
                                        'AnswerOfUser' + index + ' ' + option.id
                                    "
                                ></label>
                            </div>
                        </div>
                        <span class="ma-0 pa-0 ml-1">{{
                            option.answer_content
                        }}</span>
                    </div>
                </div>
                <div class="position-absolute score-a-question">
                    {{ answerOfUser.is_correct ? 1 : 0 }}/1
                </div>
            </v-card>
        </v-col>
    </div>
</template>

<script setup>
import { resultService } from "@/services/resultService";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import moment from "moment";
import { userService } from "@/services/userService";

const { error, getResultByTestIdUser } = resultService();

const route = useRoute();
const resultData = ref(null);
const {user, getUser} = userService();

const err = ref();

//function
const formatDatetime = (datetime) => {
    return moment(datetime).format("DD/MM/YYYY HH:mm:ss");
};

const timeCompletion = computed(() => {
    return moment
        .utc(resultData.value.completion_time * 1000)
        .format("HH:mm:ss");
});

onMounted(async () => {
    const id = route.params.id;
    resultData.value = 0;
    await getUser();
    if (user.value.role == 1) {
        
    }
    resultData.value = await getResultByTestIdUser(id);
    console.log(resultData.value);
    if (error.value) {
        err.value = error.value;
    }
});
</script>

<style scoped>
.score-a-question {
    color: rgb(82, 81, 80);
    opacity: 50%;
    bottom: 6px;
    right: 4px;
}
</style>
