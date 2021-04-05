<template>
  <div>
    <div>{{ turn }}님의 턴입니다</div>
    <table-component :table-data="tableData"></table-component>
    <div v-if="winner">{{ winner }}님 승리!</div>
  </div>
</template>

<script>
import TableComponent from "./components/TableComponent";

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
