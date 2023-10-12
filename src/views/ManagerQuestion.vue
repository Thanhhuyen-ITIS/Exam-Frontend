<template>
  <h2 class="text-center mt-3">List question</h2>
  <div class="ma-16 mt-4" v-if="!isAdmin">
    <div class="d-flex justify-space-between mb-4">
      <div class="w-33">
        <v-text-field
          density="compact"
          variant="solo"
          label="Search Question"
          append-inner-icon="mdi-magnify"
          single-line
          hide-details
          class="ma-2"
          v-model="searchQuestion"
        ></v-text-field>
      </div>
      <v-btn class="pl-1 pr-1 ma-1" @click="isNewQuestion = true">
        <v-icon start icon="mdi-plus"></v-icon>
        New Question</v-btn
      >
    </div>
    <div>
      <v-card
        v-for="(question, index) in questionsFiltered"
        :key="question.id"
        class="ma-2 pa-0"
      >
        <v-card-text class="">
          <div class="d-flex justify-space-between">
            <span class="ma-0 pa-2 font-weight-bold"
              >{{ question.question_id }}: {{ question.question_content }}</span
            >
            <button
              class="pa-1 bg- rounded-sm btn-edit"
              @click="onEditQuestion($event, index)"
            >
              <v-icon color="#999999" icon="mdi-square-edit-outline"></v-icon>
            </button>
          </div>

          <div
            v-for="answer in question.answers"
            :key="answer.id"
            class="pa-1 pl-3"
          >
            <div class="d-flex align-center">
              <div class="checkbox-wrapper-18">
                <div class="round">
                  <input
                    type="checkbox"
                    :id="'Answer' + answer.id"
                    :checked="answer.is_correct_answer"
                    disabled="true"
                  />
                  <label :for="'Answer' + answer.id"></label>
                </div>
              </div>
              <span class="ma-0 pa-0 ml-1">{{ answer.answer_content }}</span>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <v-pagination
        :total-visible="5"
        v-model="pagination.page"
        :length="pagination.pages"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        class="border ma-2"
      ></v-pagination>
    </div>
  </div>
  <div class="text-center">
    <v-dialog v-model="isNewQuestion" width="800" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">New Question</span>
        </v-card-title>
        <v-card-text>
          <label for="question_id" class="mr-2 question_id_label"
            >Question_id:</label
          >
          <input
            type="text"
            class=""
            id="question_id"
            placeholder="Id question"
            v-model="newQuestion.question_id"
          />

          <v-textarea
            counter
            label="Question"
            :rules="rules"
            v-model="newQuestion.question_content"
            variant="outlined"
          ></v-textarea>
          <div class="ma-0 pa-0">
            <div class="mb-2">
              <span class="pa-0 ma-0 d-inline mr-4 text-blue-grey-lighten-1"
                >Answer</span
              >
              <v-btn
                size="small"
                class="text-none pa-0 ma-0"
                text="Add"
                @click="addAnswer"
              ></v-btn>
            </div>
            <div
              v-for="i in countAnswers"
              :key="i"
              class="d-flex align-start mt-2 pl-2"
            >
              <div class="checkbox-wrapper-18 mr-2">
                <div class="round">
                  <input
                    type="checkbox"
                    :id="'NewAnswer' + i"
                    v-model="newQuestion.answers[i - 1].is_correct_answer"
                  />
                  <label :for="'NewAnswer' + i"></label>
                </div>
              </div>
              <textarea
                type="text"
                class="border rounded-sm w-100 pa-1"
                v-model="newQuestion.answers[i - 1].answer_content"
              ></textarea>
              <button
                class="border ml-2 rounded-sm elevation-1 minus"
                @click="eraseAnswer($event, i - 1)"
              >
                <v-icon icon="mdi-minus"></v-icon>
              </button>
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="d-flex justify-end mr-4">
          <v-btn
            variant="elevated"
            text="Cancel"
            color="#cecece"
            class="text-none"
            @click="cancelNewQuestion"
          ></v-btn>
          <v-btn
            variant="elevated"
            text="Add"
            color="#6aa84f"
            class="text-none text-white"
            @click="addNewQuestion"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>

import { onMounted, ref, computed, watch } from "vue";
import { questionsService } from "@/services/questionsService";

const { getQuestions, addQuestion, updateQuestion } = questionsService();

const pagination = ref({
  total: 0,
  page: 1,
  size: 5,
  pages: 0,
});
const isAdmin = ref(false);
const dataPagination = ref(null);

const questions = computed(() => {
  if (!dataPagination.value) {
    return [];
  }
  pagination.value = {
    total: dataPagination.value.total,
    page: dataPagination.value.page,
    size: dataPagination.value.size,
    pages: dataPagination.value.pages,
  };
  return dataPagination.value.items;
});

const searchQuestion = ref("");
const isNewQuestion = ref(false);
const countAnswers = ref(0);

const answer = ref({
  id: 0,
  answer_content: "",
  is_correct_answer: false,
});
const newQuestion = ref({
  id: 0,
  question_content: "",
  question_id: "",
  answers: [],
});

//add sort by question_id and question_content

const questionsFiltered = computed(() => {
  const filteredQuestions = !searchQuestion.value? questions.value :questions.value.filter((question) => {
    return (
      question.question_content
        .toLowerCase()
        .includes(searchQuestion.value.toLowerCase()) ||
      question.id.toString().includes(searchQuestion.value) ||
      question.question_id
        .toString()
        .toLowerCase()
        .includes(searchQuestion.value.toLowerCase())
    );
  });

  return filteredQuestions.sort((a, b) => {
    return a.question_id.localeCompare(b.question_id);
  });
});

//watch

watch(
  () => pagination.value.page,
  async () => {
    dataPagination.value = await getQuestions(
      pagination.value.page,
      pagination.value.size
    );
  }
);

// function
const cancelNewQuestion = () => {
  isNewQuestion.value = false;
  newQuestion.value = {
    question_id: "",
    question_content: "",
    answers: [],
  };
  countAnswers.value = 0;
};

const addAnswer = () => {
  countAnswers.value = countAnswers.value + 1;
  newQuestion.value.answers.push(Object.assign({}, answer.value));
  console.log(newQuestion.value.answers);
};

const eraseAnswer = (event, id) => {
  countAnswers.value = countAnswers.value - 1;
  newQuestion.value.answers.splice(id, 1);
  console.log(newQuestion.value.answers);
};

const addNewQuestion = async () => {
  if (!newQuestion.value.id) {
    await addQuestion(newQuestion.value);
  } else {
    await updateQuestion(newQuestion.value, newQuestion.value.id);
  }
  dataPagination.value = await getQuestions(
    pagination.value.page,
    pagination.value.size
  );
  cancelNewQuestion();
};

const onEditQuestion = (event, index) => {
  isNewQuestion.value = true;
  newQuestion.value = JSON.parse(JSON.stringify(questions.value[index]));
  countAnswers.value = newQuestion.value.answers.length;
};

onMounted(async () => {
  dataPagination.value = await getQuestions(
    pagination.value.page,
    pagination.value.size
  );
});
</script>

<style scoped>
textarea {
  border: 1px solid #cecece;
  height: 27px;
  outline: none;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
}
.minus:hover {
  background-color: #f4f4f4cb;
  box-shadow: inset;
}

.btn-edit {
  background-color: #f9f8f6;
  box-shadow: 1px 0px 2px #f8f2f7;
}

.btn-edit:hover {
  background-color: #f4f1ee;
  box-shadow: -1px 0px 5px #e1dce0;
}

#question_id {
  border: 1px solid #aeaeae;
  padding: 5px 8px;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  border-radius: 3px;
  margin: 0 0 10px 0;
}
input:placeholder-shown {
  font-size: small;
  color: #ffffff;
  opacity: 0.8;
}
#question_id:hover {
  border: 1px solid #41463e;
}

input:focus {
  border: 1px solid #6b6b69;
  box-shadow: #aeaeae;
}

input:focus::placeholder {
  color: #84847b;
  opacity: 0.4;
}

.question_id_label {
  font-size: 16px;
  font-weight: 400;
  font-family: "Roboto", sans-serif;
  color: #889ea0;
  opacity: 0.9;
}
</style>
