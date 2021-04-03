<template>
  <div>
    <div id="computer" :style="computerChangeObject"></div>
    <div>
      <button @click="onClick('바위')">바위</button>
      <button @click="onClick('가위')">가위</button>
      <button @click="onClick('보')">보</button>
    </div>
    <div>{{ result }}</div>
    <div>평균점수: {{ score }}점</div>
  </div>
</template>

<script>
const rpsCood = {
  바위: "0",
  가위: "-142px",
  보: "-284px",
};

const score = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgCood) => {
  return Object.entries(rpsCood).find((v) => {
    return v[1] === imgCood;
  })[0];
};

let interval = null;

export default {
  data() {
    return {
      imgCood: rpsCood.바위,
      result: "",
      score: 0,
    };
  },
  computed: {
    computerChangeObject() {
      return {
        background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCood} 0`,
      };
    },
  },

  methods: {
    changeHand() {
      interval = setInterval(() => {
        if (this.imgCood === rpsCood.바위) {
          this.imgCood = rpsCood.가위;
        } else if (this.imgCood === rpsCood.가위) {
          this.imgCood = rpsCood.보;
        } else if (this.imgCood === rpsCood.보) {
          this.imgCood = rpsCood.바위;
        }
      }, 100);
    },

    onClick(choice) {
      clearInterval(interval);
      const myScore = score[choice];
      const computerScore = score[computerChoice(this.imgCood)];
      const diff = myScore - computerScore;

      if (diff === 0) {
        this.result = "비겼습니다";
      } else if ([-1, 2].includes(diff)) {
        this.result = "이겼습니다";
        this.score += 1;
      } else {
        this.result = "졌습니다";
        this.score -= 1;
      }

      setTimeout(() => {
        this.changeHand();
      }, 1000);
    },
  },

  mounted() {
    this.changeHand();
  },

  destroyed() {
    clearInterval(interval);
  },
};
</script>

<style>
#computer {
  width: 142px;
  height: 200px;
  background-position: 0 0;
}
</style>
