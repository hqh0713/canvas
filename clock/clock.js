/*
* @Author: huangqinghai
* @Date:   2019-03-25 22:38:42
* @Last Modified by:   huangqinghai
* @Last Modified time: 2019-03-26 11:28:32
*/
var dom = document.getElementById('colck');
var ctx = dom.getContext('2d');
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width / 2;
var rm = width / 200;
var timer;

function drawBackground() {
	ctx.save();
	ctx.translate(r, r); // 将canvas的中心转移到圆的中点
	ctx.beginPath(); // 开始绘制
	ctx.lineWidth = 10 * rm;
	ctx.arc(0, 0, r - 5 * rm, 2 * Math.PI, false);
	ctx.stroke();

	var hoursNumList = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2]; // 小时数集合
	ctx.font = 18 * rm + 'px Arial';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	hoursNumList.forEach((num, i) => {
		let rad = 2 * Math.PI / 12 * i; // 钟表上每个时间对应的弧度
		let x = Math.cos(rad) * (r - 30 * rm); // 小时数对应的x坐标，r-30 是为了文本在圆内，30是个可调整的距离
		let y = Math.sin(rad) * (r - 30 * rm);
		ctx.fillText(num, x, y);
	})

	// 画小时之间的分钟点 60个点
	for (var i = 0; i < 60; i++) {
		let rad = 2 * Math.PI / 60 * i; 
		let x = Math.cos(rad) * (r - 16 * rm);
		let y = Math.sin(rad) * (r - 16 * rm);
		ctx.beginPath();
		if (i % 5 === 0) {
			ctx.fillStyle = '#000';
			ctx.arc(x, y, 3 * rm, 0, 2 * Math.PI, false);
		} else {
			ctx.fillStyle = '#ccc';
			ctx.arc(x, y, 3 * rm, 0, 2 * Math.PI, false);
		}
		ctx.fill();
	}
}
function drawHour(hour, minute) { // 画时针
	ctx.save(); // 保存画时针前的画布环境
	let rad = 2 * Math.PI / 12 * hour; // 计算小时数对应的弧度
	let minRad = 2 * Math.PI / (12 * 60) * minute; 
	ctx.beginPath();
	ctx.rotate(rad + minRad); // 旋转时针
	ctx.lineWidth = 6 * rm;
	ctx.lineCap = 'round'; // 绘制圆形的结束线帽
	ctx.moveTo(0, 10 * rm);
	ctx.lineTo(0, - r / 3);
	ctx.stroke();
	ctx.restore(); // 返回画时针前的画布环境
}
function drawMinute(minute) {
	ctx.save(); // 保存画分针前的画布环境
	let rad = 2 * Math.PI / 60 * minute; // 传入分针数对应的弧度
	ctx.beginPath();
	ctx.rotate(rad); // 旋转分针
	ctx.lineWidth = 3 * rm;
	ctx.lineCap = 'round'; // 绘制圆形的结束线帽
	ctx.moveTo(0, 10 * rm);
	ctx.lineTo(0, - r + 45 * rm);
	ctx.stroke();
	ctx.restore(); // 返回分时针前的画布环境
}
function drawSecond(second) {
	ctx.save(); // 保存画秒针前的画布环境
	ctx.beginPath();
	let rad = 2 * Math.PI / 60 * second; // 传入秒针数对应的弧度
	ctx.fillStyle = '#c14543';
	ctx.rotate(rad); // 旋转秒针
	ctx.lineTo(2, 20 * rm);
	ctx.lineTo(1, -r + 18 * rm);
	ctx.lineTo(-1, -r + 18 * rm);
	ctx.lineTo(-2, 20 * rm)
	ctx.fill();
	ctx.restore(); // 返回秒时针前的画布环境
}
function drawCicle() { // 画时分秒之间的空心圆
	ctx.save();
	ctx.beginPath()
	ctx.fillStyle = '#fff';
	ctx.arc(0, 0, 3, 0 , 2 * Math.PI, false);
	ctx.fill();
	ctx.restore()
}
function start() {
	ctx.clearRect(0, 0, width, height);
	let now = new Date();
	let h = now.getHours();
	let m = now.getMinutes();
	let s = now.getSeconds();
	drawBackground();
	drawHour(h, m);
    drawMinute(m);
    drawSecond(s);
    drawCicle();
    ctx.restore();
}
timer = setInterval(start, 1000);
document.getElementById('stop').addEventListener('click', function() {
	if (timer) {
		clearInterval(timer);
	}
})
document.getElementById('start').addEventListener('click', function() {
	if (timer) {
		clearInterval(timer);
	}
	timer = setInterval(start, 1000);
})


