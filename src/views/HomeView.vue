<template>
  <div class="home">
    <h1>Refs</h1>
    <h3>Username: {{ user.name }}</h3>
    <h3>Age: {{ user.age }}</h3>
    <button @click="user.age++">Add 1 to year</button>
    <button @click="user.age--">Subtract 1 to year</button>

    <h1>Reactive</h1>
    <h3>Username: {{ reactiveUser.name }}</h3>
    <h3>Age: {{ reactiveUser.age }}</h3>
    <button @click="reactiveUser.age++">Add 1 to year</button>
    <button @click="reactiveUser.age--">Subtract 1 to year</button>

    <button @click="updateUser">Change names</button>

    <h1>Computed</h1>
    <input type="text" v-model="search" />
    <button @click="handleClick">Stop watching</button>
    <div v-for="name in matchingNames" :key="name">{{ name }}</div>
  </div>
</template>

<script>
import { ref, reactive } from "@vue/reactivity";
import { computed, watch, watchEffect } from "@vue/runtime-core";

export default {
  name: "HomeView",
  setup() {
    const user = ref({ name: "Shaun", age: 33 });
    const reactiveUser = reactive({ name: "Carol", age: 17 });
    const search = ref("");
    const names = ref([
      "Adam",
      "Steven",
      "Martha",
      "Carol",
      "Erik",
      "Susan",
      "Bart",
    ]);

    const stopWatch = watch(search, () => {
      console.log("Watch ran");
    });

    const stopEffect = watchEffect(() => {
      console.log("WatchEffect ran", search.value);
    });

    const handleClick = () => {
      console.log("All watching is stopped");
      stopWatch();
      stopEffect();
    };

    const matchingNames = computed(() =>
      names.value.filter((name) => name.includes(search.value))
    );

    const updateUser = () => {
      user.value.name = "Erik";
      reactiveUser.name = "Susan";
    };

    return {
      user,
      reactiveUser,
      updateUser,
      names,
      search,
      matchingNames,
      handleClick,
    };
  },
};
</script>
