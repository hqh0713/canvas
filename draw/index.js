/*
* @Author: huangqh
* @Date:   2019-04-03 22:47:38
* @Last Modified by:   huangqh
* @Last Modified time: 2019-04-03 23:16:38
*/
(function() {
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	canvas.width = 800;
	canvas.height = 800;

	drawStar(context, 100, 50, 30,  300, 'green');
	/*
	* R：大圆半径；r：小圆半径；rote：旋转角度（顺时针）
	*/
	function drawStar(ctx, R, r, rote, pos, color) {
		ctx.fillStyle = color;
		ctx.beginPath();
		for(let i = 0; i < 5; i++) {
			ctx.lineTo(Math.cos((18 + 72 * i - rote) / 180 * Math.PI) * R + pos, - Math.sin((18 + 72 * i - rote) / 180 * Math.PI) * R + pos);
			ctx.lineTo(Math.cos((54 + 72 * i - rote) / 180 * Math.PI) * r + pos, - Math.sin((54 + 72 * i - rote) / 180 * Math.PI) * r + pos);
		}
		ctx.closePath();
		ctx.fill();
	}
})();