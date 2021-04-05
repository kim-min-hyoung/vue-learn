const body = document.body;
const table = document.createElement("table");
const 줄들 = [];
const 칸들 = [];
let 턴 = "X";
const result = document.createElement("div");
let 다참;

function 결과체크(몇줄, 몇칸) {
  // 세칸 다 채워졌나?

  다참 = false;

  //가로줄 검사

  if (
    칸들[몇줄][0].textContent === 턴 &&
    칸들[몇줄][1].textContent === 턴 &&
    칸들[몇줄][2].textContent === 턴
  ) {
    다참 = true;
  }
  if (
    칸들[0][몇칸].textContent === 턴 &&
    칸들[1][몇칸].textContent === 턴 &&
    칸들[2][몇칸].textContent === 턴
  ) {
    다참 = true;
  }
  if (
    칸들[0][0].textContent === 턴 &&
    칸들[1][1].textContent === 턴 &&
    칸들[2][2].textContent === 턴
  ) {
    다참 = true;
  }
  if (
    칸들[0][2].textContent === 턴 &&
    칸들[1][1].textContent === 턴 &&
    칸들[2][0].textContent === 턴
  ) {
    다참 = true;
  }
  return 다참;
}

function 초기화(무승부) {
  if (무승부) {
    result.textContent = "무승부";
  } else {
    result.textContent = 턴 + "님이 승리";
  }

  setTimeout(() => {
    result.textContent = "";
    칸들.forEach(function (줄) {
      줄.forEach(function (칸) {
        칸.textContent = "";
      });
    });
    턴 = "X";
  }, 1500);
}

let 비동기콜백 = function (event) {
  if (턴 === "O") {
    return;
  }

  const 몇줄 = 줄들.indexOf(event.target.parentNode);
  const 몇칸 = 칸들[몇줄].indexOf(event.target);

  console.log("몇줄", 몇줄);
  console.log("몇칸", 몇칸);

  if (칸들[몇줄][몇칸].textContent !== "") {
    //칸이 이미 채워져있는가?
    console.log("빈공간이 아닙니다");
  } else {
    //빈 칸이면

    console.log("빈 칸입니다");
    칸들[몇줄][몇칸].textContent = 턴;

    let 승리여부 = 결과체크(몇줄, 몇칸);

    let 후보칸 = [];
    칸들.forEach(function (줄) {
      줄.forEach(function (칸) {
        후보칸.push(칸);
      });
    });
    후보칸 = 후보칸.filter(function (칸) {
      return !칸.textContent;
    });
    if (승리여부) {
      초기화();
    } else if (후보칸.length === 0) {
      초기화(true);
    } else {
      if (턴 === "X") {
        턴 = "O";
      }
      setTimeout(function () {
        console.log("컴퓨터의 턴입니다");
        let 선택칸 = 후보칸[Math.floor(Math.random() * 후보칸.length)];
        선택칸.textContent = 턴;

        const 몇줄 = 줄들.indexOf(event.target.parentNode);
        const 몇칸 = 칸들[몇줄].indexOf(event.target);
        let 승리여부 = 결과체크(몇줄, 몇칸);

        if (승리여부) {
          초기화();
        }

        턴 = "X";
      }, 1000);
    }
  }
};

for (let i = 1; i <= 3; i++) {
  const 줄 = document.createElement("tr");
  줄들.push(줄);
  칸들.push([]);

  for (let j = 1; j <= 3; j++) {
    const 칸 = document.createElement("td");
    칸.addEventListener("click", 비동기콜백);
    칸들[i - 1].push(칸);
    줄.appendChild(칸);
  }
  table.appendChild(줄);
}
body.appendChild(table);
body.appendChild(result);
