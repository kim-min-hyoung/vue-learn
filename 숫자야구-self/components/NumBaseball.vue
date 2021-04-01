<template>
  <div>
    <h1>{{ result }}</h1>
    <form @submit.prevent="onSubmit">
      <input
        v-model="value"
        ref="answer"
        minlength="4"
        maxlength="4"
        type="number"
      />
      <button>입력</button>
    </form>
    <div>{{ answer }}</div>
    <div>{{ value }}</div>
    <div>시도 : {{ tries }}</div>
    <ul>
      <li></li>
    </ul>
  </div>
</template>

<script>
const getNumbers = () => {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    let chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

export default {
  data() {
    return {
      answer: getNumbers(),
      tries: [],
      value: "",
      result: "",
    };
  },
  methods: {
    onSubmit() {},
  },
};
</script>
