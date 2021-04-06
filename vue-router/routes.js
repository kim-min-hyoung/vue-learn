import Vue from "vue";
import VueRouter from "vue-router";
import NumberBaseball from "../숫자야구/NumberBaseball.vue";
import ResponseCheck from "../반응속도/ResponseCheck";
import RockSeaserPaper from "../가위바위보/RockSeaserPaper";
import LottoGenerator from "../로또/LottoGenerator";
import GameMatcher from "./GameMatcher.vue";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    { path: "/number-baseball", component: NumberBaseball },
    { path: "/response-check", component: ResponseCheck },
    { path: "/rock-seaser-paper", component: RockSeaserPaper },
    { path: "/lotto-generator", component: LottoGenerator },
    { path: "/game/:name", component: GameMatcher },
  ],
});
