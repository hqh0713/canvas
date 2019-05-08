/*
* @Author: huangqh
* @Date:   2019-04-03 22:47:38
* @Last Modified by:   hqh
* @Last Modified time: 2019-05-08 23:23:17
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
		let y = Math.random() * canvas.height * 0.4;
		let rote = Math.random() * 360;
		draw(context, r, x, y, rote);
	}
	fillMoon(context, 2, 1000, 150, 100, -30);
	drawLand(context, 0, canvas.height - 100,canvas.width,canvas.height - 100, ['#030', '#580']);

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

	function drawStar(ctx) {
		ctx.beginPath();
		for(let i = 0; i < 5; i++) {
			ctx.lineTo(Math.cos((18 + 72 * i) / 180 * Math.PI)  * 20, - Math.sin((18 + 72 * i) / 180 * Math.PI)  * 20);
			ctx.lineTo(Math.cos((54 + 72 * i) / 180 * Math.PI)  * 10, - Math.sin((54 + 72 * i) / 180 * Math.PI)  * 10);
		}
		ctx.closePath();
	}


	function pathMoon(ctx, d, r) {
		ctx.beginPath();
		ctx.arc(0, 0, 1,0.5 * Math.PI,1.5 * Math.PI, true);
		ctx.moveTo(0, -1);
		ctx.arcTo(d, 0, 0, 1, dis(0,-1,d,0)/d);
		ctx.lineWidth = 1/r;
		ctx.stroke(); // 若使用stroke()绘制，因为scale会放大倍数，导致lineWidth也会被相应放大，使用将lineWidth设置为 1/r；或者不使用sroke，则无需设置lineWidth
		ctx.closePath();
	}

	function fillMoon(ctx, d, x, y, r, rot, color) {
		ctx.save();
		ctx.translate(x, y);
		ctx.rotate(rot * Math.PI / 180);
		ctx.scale(r, r);
		pathMoon(ctx, d, r);
		ctx.fillStyle = color || '#fb3';
		ctx.shadowBlur = 40; // 设置月亮阴影
        ctx.shadowColor = '#fff';
		ctx.fill();
		ctx.restore();
	}

    /**
    * 绘制地面函数
    * (x0,y0)：绘制的起点;(x1,y1):绘制的终点;color:填充色,color支持多种颜色选择
    */
	function drawLand(ctx,x0,y0,x1,y1,color) {
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(x0, y0);
		ctx.bezierCurveTo(canvas.width / 3,canvas.height / 2, canvas.width / 2, canvas.height, x1, y1);
		ctx.lineTo(canvas.width, canvas.height);
		ctx.lineTo(0, canvas.height);
		ctx.stroke();
		ctx.closePath();

		var grd=ctx.createLinearGradient(0,canvas.height,0,0);
		let mycolor = color || 'green'
		switch (typeof mycolor) {
			case 'string':
			ctx.fillStyle = mycolor;
			break;
			case 'object':
			for (var i = 0; i < mycolor.length; i++) {
				grd.addColorStop(i/mycolor.length,mycolor[i]);
			}
			ctx.fillStyle = grd;
			break;
		}
		ctx.fill();
		ctx.restore();
	}
	function people(x,y, color) {
		this.x = x;
		this.y = y;
		this.color = color;
	}
	people.prototype.draw = function(ctx) {
		ctx.save();
		ctx.fillStyle = this.color;
		ctx.beginPath();
        ctx.arc(this.x,this.y,15,0,Math.PI*2,true);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
	}
	people.prototype.walk = function(ctx) {
		this.x += 50;
		if (this.x > canvas.width) {
			this.x = 100
		}
		this.draw(ctx);
	}
	var pp = new people(0,550, 'white');

   /*
    返回两点间距离
   */
	function dis(x1,y1,x2,y2) {
		return Math.sqrt((x1-x2) * (x1-x2) + (y1-y2) * (y1-y2));
	}
	function render() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		let sky = context.createRadialGradient(canvas.width / 2,canvas.height,0, canvas.width / 2,canvas.height, canvas.height * 1.2);
	    sky.addColorStop(0,'#035');
	    sky.addColorStop(1,'black');
	    context.fillStyle = sky;
	    context.fillRect(0, 0, canvas.width, canvas.height);
		for (let i = 0; i <= 40; i++) {
			let r = Math.random() * 10 +5;
		    let x = Math.random() * canvas.width;
		    let y = Math.random() * canvas.height * 0.4;
		    let rote = Math.random() * 360;
		    draw(context, r, x, y, rote);
	    }
	    fillMoon(context, 2, 1000, 150, 100, -30);
	    drawLand(context, 0, canvas.height - 100,canvas.width,canvas.height - 100, ['#030', '#580']);
	    pp.walk(context);
	}
	function init() {
		setInterval(()=> {
			render();
		}, 1000)
	}
	init();
})();