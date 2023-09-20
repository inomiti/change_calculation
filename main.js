
function calculateChange() {
  const money = parseInt(document.getElementById("money").value);
  const product = parseInt(document.getElementById("product").value);

  // おつりの計算ロジックを呼び出し
  const changeResult = calculateChangeLogic(money, product);

  document.getElementById("changeAmount").textContent = `おつりの金額: ${changeResult.amount}円`;

  const changeBreakdown = document.getElementById("changeBreakdown");
  changeBreakdown.innerHTML = ""; // 内容をクリア

  for (const denomination in changeResult.breakdown) {
      const count = changeResult.breakdown[denomination];
      const li = document.createElement("li");
      li.textContent = `${denomination}: ${count}枚`;
      changeBreakdown.appendChild(li);
  }
}

// おつりの計算ロジックを関数として定義
function calculateChangeLogic(money, product) {
  const moneytype = {
      '一万円札': 10000,
      '五千円札': 5000,
      '千円札': 1000,
      '五百円玉': 500,
      '百円玉': 100,
      '五十円玉': 50,
      '十円玉': 10,
      '五円玉': 5,
      '一円玉': 1
  };

  let change = money - product;
  const currencyBreakdown = {};

  // 額面を大きい順に処理
  const denominations = ['一万円札', '五千円札', '千円札', '五百円玉', '百円玉', '五十円玉', '十円玉', '五円玉', '一円玉'];
  for (const name of denominations) {
      const value = moneytype[name];
      const count = Math.floor(change / value);
      if (count > 0) {
          currencyBreakdown[name] = count;
          change -= count * value;
      }
  }

  return {
      amount: money - product,
      breakdown: currencyBreakdown
  };
}