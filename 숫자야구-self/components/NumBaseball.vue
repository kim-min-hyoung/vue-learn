<template>
  <div>
    <h1>{{ result }}</h1>
    <form v-on:submit.prevent="onSubmit">
      <input
        v-model="value"
        ref="answers"
        minlength="4"
        maxlength="4"
        type="number"
      />
      <button type="submit">입력</button>
    </form>
    <!-- <div>{{ answer }}</div>
    <div>{{ value }}</div> -->
    <div>시도 : {{ tries.length }}</div>
    <ul>
      <li v-for="t in tries">
        <div>{{ t.try }}</div>
        <div>{{ t.result }}</div>
      </li>
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
      answer: getNumbers(), //정답
      tries: [], //시도
      value: "", //입력값
      result: "", //결과
    };
  },
  methods: {
    onSubmit() {
      console.log(this.answer, this.value);
      if (this.value === this.answer.join("")) {
        alert("홈런, 수고하셨습니다");
        this.tries.push({
          try: this.value,
          result: "홈런",
        });
        this.result = "홈런";
        this.value = "";
        this.tries = [];
        this.answer = getNumbers();
        this.$refs.answers.focus();
      } else {
        if (this.tries.length >= 9) {
          this.result = `10번 넘게 시도 실패, 정답은 ${this.answer.join()}`;
          alert("게임을 다시 시작");
          this.value = "";
          this.tries = [];
          this.answer = getNumbers();
          this.$refs.answers.focus();
        }

        let strike = 0;
        let ball = 0;
        const answerArray = this.value.split("").map((v) => parseInt(v));

        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === this.answer[i]) {
            strike++;
          } else if (this.answer.includes(answerArray[i])) {
            ball++;
          }
        }
        this.tries.push({
          try: this.value,
          result: `${strike} 스트라이크, ${ball} 볼입니다.`,
        });
      }
      this.value = "";
      this.$refs.answers.focus();
    },
  },
};
</script>
