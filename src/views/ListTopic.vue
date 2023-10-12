<template>
  <div>List Test</div>

  <v-card class="pl-2 pr-2 ml-8 mr-8 h-screen">

      <v-container>
        <div class="w-33">
          <v-text-field
            density="compact"
            variant="solo"
            label="Search Test"
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
            class=""
            v-model="searchTopic"
          ></v-text-field>
        </div>
      </v-container>
    <v-container
      v-for="(topic, index) in topicsFiltered"
      :key="topic.id"
      class="d-flex justify-space-between align-center pl-8 pr-8 mx-auto topic-item"
      :class="index % 2 == 0? 'bg-white': 'bg-grey-lighten-4'"
    >
      <div>
        <span class="text-h6 pa-1 ma-0"
          >{{ topic.topic_name }}</span
        >
        <span class="pa-1 ma-0">Create time: {{ topic.create_time }}</span>
      </div>
      <button class="pa-1 pl-3 pr-3 btn-detail-topic" @click="() => {router.push({name: 'ListTest', params: {id: topic.id}})}">Detail</button>
    </v-container>
  </v-card>
</template>

<script setup>
import { topicService } from "@/services/topicService";
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import moment from "moment";

const router = useRouter();


const { getTopics } = topicService();

const topics = ref([]);
const searchTopic = ref("");

const formatDatetime = (datetime) => {
  return datetime? moment(datetime, "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY HH:mm"): "";
};

const topicsFiltered = computed(() => {
  return topics.value.filter((topic) => {
    topic.create_time = formatDatetime(topic.create_time);
    return topic.topic_name
      .toLowerCase()
      .includes(searchTopic.value.toLowerCase());
  });
});

onMounted(async () => {
  topics.value = await getTopics();

});
</script>

<style scoped>
.topic-item {

  border: 1px solid #e9e9e9;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 1px 1px 1px 1px rgba(147, 146, 146, 0.2) ;
}
.topic-item:hover {
  box-shadow: 0 0 0 1px rgba(147, 146, 146, 0.2);
}
.btn-detail-topic {
  background-color: #569ff8;
  color: white;
  cursor: pointer;
  box-shadow: inset 0 0 0 1px rgba(237, 233, 233, 0.2);
}
.btn-detail-topic:hover {
  background-color: #3e94f5;
  color: white;
  cursor: pointer;
  border: #b8b8b8 1px solid;
  box-shadow: inset 0 0 0 1px rgba(174, 173, 173, 0.2);
}

.btn-detail-topic:active {
  background-color: #127bf4;
  color: white;
  cursor: pointer;
}
</style>
