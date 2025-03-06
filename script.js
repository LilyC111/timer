const timerDisplay = document.getElementById('timer');
const statusDisplay = document.getElementById('status');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

let workTime = 25 * 60; // 25分钟
let breakTime = 5 * 60;  // 5分钟
let timeLeft = workTime;
let isWork = true;
let isRunning = false;
let interval;

// 加载音效
const startSound = new Audio('start.mp3'); // 计时开始音效
const endSound = new Audio('end.mp3');     // 计时结束音效

// 更新时间显示
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  statusDisplay.textContent = isWork ? '工作模式' : '休息模式';
}

// 播放音效
function playSound(sound) {
  sound.currentTime = 0; // 重置音效到开头
  sound.play();          // 播放音效
}

// 开始计时
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    playSound(startSound); // 播放计时开始音效
    interval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(interval);
        isRunning = false;
        playSound(endSound); // 播放计时结束音效
        alert(isWork ? '休息时间到！' : '工作时间到！');
        isWork = !isWork;
        timeLeft = isWork ? workTime : breakTime;
        updateDisplay();
      }
    }, 1000);
  }
}

// 暂停计时
function pauseTimer() {
  if (isRunning) {
    clearInterval(interval);
    isRunning = false;
  }
}

// 重置计时
function resetTimer() {
  clearInterval(interval);
  isRunning = false;
  isWork = true;
  timeLeft = workTime;
  updateDisplay();
}

// 绑定按钮事件
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// 初始化显示
updateDisplay();