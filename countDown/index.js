/*
* @Author: huangqh
* @Date:   2019-03-26 22:34:11
* @Last Modified by:   huangqh
* @Last Modified time: 2019-03-28 23:29:34
*/
(function() {
	console.log(number);
	var WINDOW_WIDTH = 1024; // 屏幕宽
	var WINDOW_HEIGHT = 768; // 屏幕高
	var RADIUS = 8; // 小球半价
    var MARGIN_TOP = 60;
    var MARGIN_LEFT = 30;

    var balls = []; // 小球集合
    const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]; // 小球颜色集合


	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = Math.max(document.body.clientHeight, 400);
    canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;

	var ball = {x:500, y:140, r:20, g:5, vx:-4, vy:0, color: '#005588'} // 小球
	var f = 0.5; // 摩擦系数
	renderDigit(100, 100, 8, context);
	renderColock();
	setInterval(function() {
		// render(context);
		// drop();
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
	function getCurrentTime() {
		let date = new Date();
		let hour = date.getHours().toString().length === 1 ? '0' + date.getHours() : date.getHours().toString();;
		let min = date.getMinutes().toString().length === 1 ? '0' + date.getMinutes() : date.getMinutes().toString();;
		let sec = date.getSeconds().toString().length === 1 ? '0' + date.getSeconds() : date.getSeconds().toString();
		return [hour, min, sec]
	}
	// 画时钟对应的小球
	function renderDigit( x , y , num , cxt ){
		cxt.fillStyle = "rgb(0,102,153)";
		for( var i = 0 ; i < number[num].length ; i ++ )
			for(var j = 0 ; j < number[num][i].length ; j ++ )
				if( number[num][i][j] == 1 ){
					cxt.beginPath();
					cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI )
					cxt.fill()
				}
			}
	function renderColock(time) {
		let [h, m, s] = getCurrentTime()
		console.log(h)
	}		
		})();