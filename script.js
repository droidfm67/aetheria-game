let selectedRace = null;
let selectedClass = null;

document.querySelectorAll("#races .option").forEach(option => {
  option.addEventListener("click", () => {
    document.querySelectorAll("#races .option").forEach(o => o.classList.remove("selected"));
    option.classList.add("selected");
    selectedRace = option.dataset.value;
    checkReady();
  });
});

document.querySelectorAll("#classes .option").forEach(option => {
  option.addEventListener("click", () => {
    document.querySelectorAll("#classes .option").forEach(o => o.classList.remove("selected"));
    option.classList.add("selected");
    selectedClass = option.dataset.value;
    checkReady();
  });
});

function checkReady() {
  const btn = document.getElementById("start-game");
  if (selectedRace && selectedClass) {
    btn.disabled = false;
    btn.onclick = () => {
      const player = { race: selectedRace, class: selectedClass, hp: 120, mp: 80 };
      localStorage.setItem("player", JSON.stringify(player));
      window.location.href = "battle.html";
    };
  }
}

let playerHP = 120;
let playerMP = 80;
let enemyHP = 150;

function fireball() {
  if (playerMP < 40) return;
  playerMP -= 40;
  enemyHP -= 35;
  const fireball = document.getElementById("fireball-animation");
  fireball.classList.remove("hidden");
  fireball.style.left = "100px";
  fireball.style.top = "300px";
  setTimeout(() => {
    fireball.classList.add("hidden");
    updateStats();
    enemyAttack();
  }, 1000);
}

function attack() {
  enemyHP -= 20;
  const slash = document.getElementById("slash-animation");
  slash.style.display = "block";
  setTimeout(() => {
    slash.style.display = "none";
    updateStats();
    enemyAttack();
  }, 500);
}

function updateStats() {
  document.getElementById("player-hp").textContent = playerHP;
  document.getElementById("player-mp").textContent = playerMP;
  document.getElementById("enemy-hp").textContent = enemyHP;
  document.getElementById("player-health-bar").style.width = (playerHP / 120) * 100 + "%";
  document.getElementById("enemy-health-bar").style.width = (enemyHP / 150) * 100 + "%";
  if (enemyHP <= 0) setTimeout(() => alert("Победа 🎉"), 300);
}

function enemyAttack() {
  if (enemyHP <= 0) return;
  setTimeout(() => {
    playerHP -= 25;
    updateStats();
    if (playerHP <= 0) alert("Поражение... 💀");
  }, 800);
}

if (window.location.pathname.includes("battle.html")) {
  updateStats();
}