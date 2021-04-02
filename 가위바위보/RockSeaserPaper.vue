<template>
  <div>
    <div id="computer" :style="computStyleObject"></div>
    <div>
      <button @click="onClickBtn('바위')">바위</button>
      <button @click="onClickBtn('가위')">가위</button>
      <button @click="onClickBtn('보')">보</button>
    </div>
    <div>{{ result }}</div>
    <div>현재 {{ score }}점</div>
  </div>
</template>

<script>
const rspCoord = {
  바위: "0",
  가위: "-142px",
  보: "-284px",
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgcoord) => {
  return Object.entries(rspCoord).find(function(v) {
    // console.log(Object.entries(rspCoord));
    // console.log("v1:", v[1]);
    // console.log("v1-img", v[1] === imgcoord);
    return v[1] === imgcoord;
  })[0];
};

let interval = null;

export default {
  data() {
    return {
      imgCoord: rspCoord.바위,
      result: "",
      score: 0,
    };
  },

  computed: {
    computStyleObject() {
      return {
        background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`,
      };
    },
  },

  methods: {
    changeHande() {
      interval = setInterval(() => {
        if (this.imgCoord === rspCoord.바위) {
          this.imgCoord = rspCoord.가위;
        } else if (this.imgCoord === rspCoord.가위) {
          this.imgCoord = rspCoord.보;
        } else if (this.imgCoord === rspCoord.보) {
          this.imgCoord = rspCoord.바위;
        }
      }, 100);
    },

    onClickBtn(choice) {
      clearInterval(interval);
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(this.imgCoord)];
      const diff = myScore - cpuScore;
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
        this.changeHande();
      }, 1300);
    },
  },

  mounted() {
    this.changeHande();
  },

  beforeDestroy() {
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
