<template>
  <div class="details-wrapper">
    <div v-if="error">{{ error }}</div>
    <div v-if="post" class="post">
      <h3>{{ post.title }}</h3>
      <div>
        <span v-for="tag in post.tags" :key="tag"> #{{ tag }} </span>
      </div>
      <p class="pre">{{ post.body }}</p>
      <button @click="handleClick" class="delete">delete post</button>
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script>
import { projectFirestore } from "@/firebase/config";
import { useRoute, useRouter } from "vue-router";
import Spinner from "../components/Spinner.vue";
import getPost from "../composables/getPost";

export default {
  components: { Spinner },
  props: ["id"],
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const { post, error, load } = getPost(route.params.id);
    load();

    const handleClick = async () => {
      await projectFirestore.collection("posts").doc(props.id).delete();
      router.push({ name: "Home" });
    };

    return { post, error, handleClick };
  },
};
</script>

<style>
.post {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 40px;
}
.post p {
  color: #444;
  line-height: 1.5em;
}
.pre {
  white-space: pre-wrap;
}
button.delete {
  margin: 10px auto;
}
</style>
