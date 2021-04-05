<template>
  <div>
    <div>{{ turn }}님의 턴입니다</div>
    <table-component :table-data="tableData"></table-component>
    <div v-if="winner">{{ winner }}님 승리!</div>
  </div>
</template>

<script>
import TableComponent from "./components/TableComponent";
import EventBus from "./EventBus";

export default {
  components: {
    TableComponent,
  },

  data() {
    return {
      tableData: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      turn: "O",
      winner: "",
    };
  },

  methods: {
    onChangeData() {
      this.$set(this.tableData[1], 0, "X");
      //this.$set(바꾸고 싶은 값, 키, "X") => (1, 0)에 X를 넣는 것!
    },

    onClickTd(rowIndex, cellIndex) {
      if (this.cellData) {
        return;
      }

      console.log(this.$root.$data);

      this.$set(this.tableData[rowIndex], this.cellIndex, this.turn);

      let win = false;
      if (
        this.tableData[rowIndex][0] === this.turn &&
        this.tableData[rowIndex][1] === this.turn &&
        this.tableData[rowIndex][2] === this.turn
      ) {
        win = true;
      }
      if (
        this.tableData[0][cellIndex] === this.turn &&
        this.tableData[1][cellIndex] === this.turn &&
        this.tableData[2][cellIndex] === this.turn
      ) {
        win = true;
      }
      if (
        this.tableData[0][2] === this.turn &&
        this.tableData[1][1] === this.turn &&
        this.tableData[2][0] === this.turn
      ) {
        win = true;
      }
      if (
        this.tableData[0][0] === this.turn &&
        this.tableData[1][1] === this.turn &&
        this.tableData[2][2] === this.turn
      ) {
        win = true;
      }
      console.log(win);
      if (win) {
        //이긴 경우: 3줄 달성
        console.log(win);
        this.winner = this.turn;
        this.turn = "O";
        this.tableData = [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ];
      } else {
        //무승부
        let all = true; //all이 true면 무승부라는 뜻
        this.tableData.forEach((row) => {
          row.forEach((cell) => {
            if (!cell) {
              all = false;
            }
          });
        });
        if (all) {
          this.turn = "O";
          this.winner = "";
          this.tableData = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
          ];
        }
        this.turn = this.turn === "O" ? "X" : "O";
      }
    },
  },

  created() {
    EventBus.$on("clickTd", this.onClickTd);
  },
};
</script>

<style>
table {
  border-collapse: collapse;
}
td {
  border: 1px solid black;
  width: 40px;
  height: 40px;
  text-align: center;
}
</style>
