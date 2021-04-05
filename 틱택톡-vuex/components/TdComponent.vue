<template>
  <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    cellIndex: Number,
    rowIndex: Number,
  },

  computed: {
    ...mapState({
      tableDate: (state) => state.tableDate,
      turn: (state) => state.turn,
      cellData(state) {
        return state.tableDate[this.rowIndex][this.cellIndex];
      },
    }),
  },
};
</script>

<style></style>
