import { projectFirestore } from "../firebase/config";
import { ref } from "vue";

const getPosts = () => {
  const posts = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      const response = await projectFirestore
        .collection("posts")
        .orderBy("created")
        .get();
      posts.value = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (err) {
      error.value = err.message;
    }
  };

  return { posts, error, load };
};

export default getPosts;
