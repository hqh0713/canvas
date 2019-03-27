/*
* @Author: huangqh
* @Date:   2019-03-26 22:34:11
* @Last Modified by:   huangqh
* @Last Modified time: 2019-03-27 23:23:01
*/
(function() {
	var canvas = document.getElementById('canvas');
	canvas.width = 800;
	canvas.height = 668;
	var context = canvas.getContext('2d');
	var ball = {x:500, y:140, r:20, g:5, vx:-4, vy:0, color: '#005588'} // 小球
	var f = 0.5; // 摩擦系数
	setInterval(function() {
		render(context);
		drop();
	}, 50);
	/*
	* 小球掉落函数：x坐标为小球当前x坐标加上x方向的速度vx，同理y坐标
	*             y方向的速度vy因为需要加上重力加速度g，所以vy=vy+g
	* 当小球的y坐标大于等于画布高度（减去小球半价）时，即视为小球与画布底部发生碰撞，
	* 这时小球的y坐标即为底部y坐标，y方向的速度相反，但是需要考虑摩擦系数，所以y方向的速度有损耗
	*/
	function drop() {
		ball.x += ball.vx;
		ball.y += ball.vy;
		ball.vy += ball.g;
		if (ball.y >= canvas.height - ball.r) {
			ball.y = canvas.height - ball.r;
			ball.vy = -ball.vy * f;
		}
	}
	function render(ctx) {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.fillStyle = ball.color;
		ctx.beginPath();
		ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
		ctx.fill();
	}
})();