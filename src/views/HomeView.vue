<template>
  <div class="home">
    <h1>Home</h1>
    <div class="error" v-if="error">{{ error }}</div>
    <button
      v-if="posts.length"
      class="action-button"
      @click="showPosts = !showPosts"
    >
      Toggle posts
    </button>
    <div v-if="posts.length" class="layout">
      <PostList v-if="showPosts" :posts="posts" />
      <TagCloud :posts="posts" />
    </div>
    <div v-if="!posts.length && !error">
      <Spinner />
    </div>
  </div>
</template>

<script>
import TagCloud from "../components/TagCloud.vue";
import Spinner from "../components/Spinner.vue";
import PostList from "@/components/PostList.vue";
import getPosts from "@/composables/getPosts";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

export default {
  name: "HomeView",
  components: { PostList, Spinner, TagCloud },
  setup() {
    const { posts, error, load } = getPosts();
    const showPosts = ref(true);

    onMounted(() => load());

    return { posts, error, showPosts };
  },
};
</script>

<style>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}
.action-button {
  padding: 12px;
  position: relative;
  margin: 8px;
  background: rgb(104, 206, 9);
  color: #fff;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 10px;
}
.action-button:hover::after {
  content: "";
  height: 100%;
  width: 100%;
  inset: 0;
  border-radius: 10px;
  opacity: 0.05;
  position: absolute;
  background-color: #2c2c2c;
  display: block;
}
.layout {
  display: grid;
  grid-template-columns: 3fr 1fr;
  /* gap: 20px; */
}
</style>
