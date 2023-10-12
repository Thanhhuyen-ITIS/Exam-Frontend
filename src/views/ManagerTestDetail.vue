<template>
    <div>{{ id }}</div>
    <span class=""></span>
    <div class="pa-2" v-if="test">
        <v-card class="w-100" @submit.prevent="onSubmit">
            <v-card-title class="text-center">Test Detail</v-card-title>
            <v-card-text class="">
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                label="Test Name"
                                type="text"
                                variant="solo"
                                v-model="test.test_name"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row justify="">
                        <v-col cols="5">
                            <v-text-field
                                variant="solo"
                                label="Start time"
                                type="datetime-local"
                                required
                                v-model="test.start_time"
                            ></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field
                                variant="solo"
                                label="End time"
                                type="datetime-local"
                                v-model="test.end_time"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-select
                                chips
                                label="Topic"
                                :items="topics"
                                variant="solo"
                                item-title="topic_name"
                                item-value="id"
                                v-model="test.topic_id"
                            ></v-select>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field
                                variant="solo"
                                label="Duration (m)"
                                type="Number"
                                v-model="test.duration"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field
                                variant="solo"
                                label="Limit"
                                type="Number"
                                v-model="test.limit"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <div class="checkbox-wrapper-18 mr-2">
                        <p class="text-grey-darken-1 d-inline">Display answer</p>
                        <div class="round">
                            <input
                                type="checkbox"
                                id="permission_review"
                                v-model="test.permission_review"
                            />
                            <label for="permission_review"></label>
                        </div>

                    </div>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-container class="d-flex justify-end">
                    <v-btn
                        variant="elevated"
                        color="#d5ffc4"
                        type="submit"
                        @click="onSubmit"
                        >Save</v-btn
                    >
                </v-container>
            </v-card-actions>
        </v-card>
        <v-card class="mt-4 pa-3">
            <v-card-text class="pa-2">
                <v-container class="d-flex align-center">
                    <span class="text-h5">Questions</span>
                    <span class="text-grey-darken-1"
                        >({{ questions.length }})</span
                    >
                    <!-- <div>
            <input type="text" class="border elevation-1 border-sm mr-3" placeholder="Enter Id question">
            <v-btn prepend-icon="mdi-plus">Add question</v-btn>
          </div> -->
                </v-container>
                <v-container>
                    <div class="d-flex align-end">
                        <textarea
                            type="text"
                            class="border elevation-1 mr-3 pa-2 w-100"
                            placeholder="Enter Id question"
                            v-model="textAddNewQuestion"
                        ></textarea>

                        <button
                            class="pa-2 bg-amber-accent-4 elevation-1 pl-3 pr-3"
                            @click="onAdd"
                        >
                            Add
                        </button>
                    </div>

                    <span
                        class="ma-0 pa-0 d-inline font-italic text-grey-darken-4 note pl-2"
                        >Lines: {{ lines }}</span
                    >
                    <span
                        v-if="err.type == 'add_question'"
                        class="ma-0 pa-0 error"
                        >Error: {{ err.message }}</span
                    >
                    <span
                        v-if="warn.type == 'add_question'"
                        class="pa-0 ma-0 warn font-italic"
                        >Warn: {{ warn.message }}</span
                    >
                    <span
                        v-if="success.type == 'add_question'"
                        class="pa-0 ma-0 success"
                        >{{ success.message }}</span
                    >
                </v-container>

                <v-container>
                    <v-card
                        v-for="(question, index) in questions"
                        :key="question.id"
                        class="mt-3 pt-1 pr-1 pl-5"
                    >
                        <v-row justify="center" align="center">
                            <v-col cols="11">
                                <span
                                    >Question {{ index + 1 }}: ({{
                                        question.question_id
                                    }}) {{ question.question_content }}</span
                                >
                            </v-col>
                            <v-col>
                                <button
                                    class="pa-1 bg-grey-lighten-3"
                                    @click="
                                        onDeleteQuestion($event, question.id)
                                    "
                                >
                                    <v-icon
                                        icon="mdi-trash-can-outline"
                                        color="#000000"
                                    ></v-icon>
                                </button>
                            </v-col>
                            <!-- <v-col cols="1" class="my-auto">
                <v-btn class="text-none pl-1 pr-1" color="#f01010"
                  >Delete</v-btn
                >
              </v-col> -->
                        </v-row>
                        <div
                            v-for="answer in question.answers"
                            :key="answer.id"
                            class="pa-1 pl-3"
                        >
                            <div class="d-flex">
                                <div class="checkbox-wrapper-18">
                                    <div class="round">
                                        <input
                                            type="checkbox"
                                            :id="'Answer' + answer.id"
                                            :checked="answer.is_correct_answer"
                                            disabled="true"
                                        />
                                        <label
                                            :for="'Answer' + answer.id"
                                        ></label>
                                    </div>
                                </div>
                                <span class="ma-0 pa-0 ml-1">{{
                                    answer.answer_content
                                }}</span>
                            </div>
                        </div>
                    </v-card>
                </v-container>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup>
import { questionsService } from "@/services/questionsService";
import { testService } from "@/services/testService";
import { topicService } from "@/services/topicService";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const { getTest, updateTest } = testService();
const {
    status,
    error,
    getQuestionByTest,
    deleteQuestionInTest,
    addQuestionToTest,
} = questionsService();
const { getTopics } = topicService();

const err = ref({
    type: "",
    message: "add question fail",
});

const warn = ref({
    type: "",
    message: "add question fail",
});

const success = ref({
    type: "",
    message: "add question success",
});

const test = ref();
const questions = ref([]);
const topics = ref();
const textAddNewQuestion = ref("");
const idQuestions = ref([]);

const setupStatus = () => {
    err.value = {
        type: "",
        message: "",
    };
    warn.value = {
        type: "",
        message: "",
    };
    success.value = {
        type: "",
        message: "",
    };
};

const lines = computed(() => {
    setupStatus();
    return textAddNewQuestion.value.split("\n").length;
});

const onSubmit = async () => {
    await updateTest(route.params.id, test.value);
    test.value = await getTest(route.params.id);
};

const onAdd = async () => {
    // split textAddNewQuestion and save in idQuestions using join
    idQuestions.value = textAddNewQuestion.value.split("\n");

    await addQuestionToTest(route.params.id, idQuestions.value);

    if (status.value.status_code == 207) {
        warn.value = {
            type: "add_question",
            message: status.value.detail,
        };
    }

    if (error.value) {
        err.value = {
            type: "add_question",
            message: error.value,
        };
        return;
    }

    success.value = {
        type: "add_question",
        message: "Add question success",
    };

    questions.value = await getQuestionByTest(route.params.id);
    setTimeout(() => {
        textAddNewQuestion.value = "";
    }, 2000);
};

const onDeleteQuestion = async (event, id) => {
    event.preventDefault();
    await deleteQuestionInTest(route.params.id, id);
    questions.value = await getQuestionByTest(route.params.id);
};

onMounted(async () => {
    const id = route.params.id;
    test.value = await getTest(id);
    topics.value = await getTopics();
    questions.value = await getQuestionByTest(id);
});
</script>

<style scoped>
.note {
    font-size: 0.8rem;
    font-weight: 340;
}

.error {
    font-size: 0.8rem;
    font-weight: 340;
    color: red;
}

.warn {
    font-size: 0.8rem;
    font-weight: 340;
    color: orange;
}

.success {
    font-size: 0.8rem;
    font-weight: 340;
    color: green;
}
</style>
```
