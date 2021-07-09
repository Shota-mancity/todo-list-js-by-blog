import "./styles.css";

const addTask = () => {
  // taskの新規追加
  // 入力されたタスクの文字列を格納
  const newTask = document.getElementById("add-task").value;
  // inputを初期化
  document.getElementById("add-task").value = "";
  // listの雛形を生成
  const li = document.createElement("li");
  const div = document.createElement("div");
  div.className = "list-arrangement";
  const p = document.createElement("p");
  p.innerText = newTask;
  // 検索用にタスク名をidにとる
  p.id = newTask;
  const i = document.createElement("i");
  i.className = "fas fa-trash-alt";
  li.appendChild(div);
  div.appendChild(p);
  div.appendChild(i);
  document.getElementById("task-list").appendChild(li);

  // クリックされたtaskはinputタグに変化し、編集後再度pタグに戻る
  p.addEventListener("click", () => changeTaskName(p));

  //list削除
  i.addEventListener("click", () => deleteList(i));

  // 検索用にliを配列へ格納
  taskNameLists.push(document.getElementById(newTask).parentNode.parentNode);
  // タスク検索
  document.getElementById("search-task").addEventListener("input", () => {
    // キーワード取得
    const keyWord = document.getElementById("search-task").value;
    // 検索キーワードを含むliを取り出して新しい配列に格納
    const matchTasks = taskNameLists.filter((taskNameList) => {
      return taskNameList.textContent.indexOf(keyWord) !== -1;
    });
    if (matchTasks !== []) {
      // リストの初期化
      document.getElementById("task-list").removeChild(li);
      // キーワードにマッチしたタスクを再度リスト表示
      matchTasks.forEach((matchTask) => {
        document.getElementById("task-list").appendChild(matchTask);
      });
    }
  });
};

const changeTaskName = (p) => {
  // task名を取得しinputに格納
  const input = document.createElement("input");
  input.value = p.innerText;
  input.id = input.value;
  // リストの構造をpからinputに書き換え
  const targetDiv = p.parentNode;
  targetDiv.textContent = null;
  const i = document.createElement("i");
  i.className = "fas fa-trash-alt";
  targetDiv.appendChild(input);
  targetDiv.appendChild(i);

  // 文字入力が終わったタイミングでリストの構造をinputからpに再書き換え
  input.addEventListener("change", () => {
    p.innerText = input.value;
    p.id = p.innerText;
    targetDiv.textContent = null;
    targetDiv.appendChild(p);
    targetDiv.appendChild(i);
  });
  //list削除(i)を新しく定義したため
  i.addEventListener("click", () => deleteList(i));
};

//list削除
const deleteList = (i) => {
  const target = i.parentNode.parentNode;
  document.getElementById("task-list").removeChild(target);
};

// 検索用li格納配列
const taskNameLists = [];
// 文字入力が終わったタイミングでリスト作成
document
  .getElementById("add-task")
  .addEventListener("change", () => addTask(taskNameLists));
