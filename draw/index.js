/*
* @Author: huangqh
* @Date:   2019-04-03 22:47:38
* @Last Modified by:   huangqh
* @Last Modified time: 2019-04-09 00:02:35
*/
(function() {
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	canvas.width = 1200;
	canvas.height = 600;

	// let sky = context.createLinearGradient(0,0,0,canvas.height);
	// sky.addColorStop(0,'black');
	// sky.addColorStop(1,'#035');
	let sky = context.createRadialGradient(canvas.width / 2,canvas.height,0, canvas.width / 2,canvas.height, canvas.height * 1.2);
	sky.addColorStop(0,'#035');
	sky.addColorStop(1,'black');
	context.fillStyle = sky;
	context.fillRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i <= 40; i++) {
		let r = Math.random() * 10 +5;
		let x = Math.random() * canvas.width;
		let y = Math.random() * canvas.height * 0.6;
		let rote = Math.random() * 360;
		draw(context, r, x, y, rote);
	}

	function draw(ctx, R, x, y, rote) {
		ctx.save();

		ctx.translate(x, y);
		ctx.rotate(rote / 180 * Math.PI);

		drawStar(ctx);

		ctx.fillStyle = '#fb3';
		ctx.strokeStyle = '#fd5';

		ctx.fill();
		ctx.stroke();

		ctx.restore();
	}

	/*
	* R：大圆半径；r：小圆半径；rote：旋转角度（顺时针）
	*/
	function drawStar(ctx) {
		ctx.beginPath();
		for(let i = 0; i < 5; i++) {
			ctx.lineTo(Math.cos((18 + 72 * i) / 180 * Math.PI)  * 20, - Math.sin((18 + 72 * i) / 180 * Math.PI)  * 20);
			ctx.lineTo(Math.cos((54 + 72 * i) / 180 * Math.PI)  * 10, - Math.sin((54 + 72 * i) / 180 * Math.PI)  * 10);
		}
		ctx.closePath();
	}
})();