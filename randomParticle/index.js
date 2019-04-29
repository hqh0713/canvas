/*
* @Author: huangqh
* @Date:   2019-04-18 11:53:09
* @Last Modified by:   huangqinghai
* @Last Modified time: 2019-04-22 11:03:04
*/
(function() {
	var canvas = document.getElementById('canvas'),
	    context = canvas.getContext('2d'),
	    starArr = [],
	    starNum = 200,
	    circle = {
	    	x: 0,
	    	y: 0,
	    	color: 'white'
	    },
	    circleArr = [], // 上升粒子集合
        meteorArr = []; // 流星集合
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;  

	function star(index,x,y) {
		this.x = x;
		this.y = y;
		this.index = index
		this.r = Math.random() * 2 + 1;
		var alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
        this.color = "rgba(255,255,255," + alpha + ")";
	}
	star.prototype.draw = function(ctx) {
		ctx.fillStyle = this.color;
        ctx.shadowBlur = this.r * 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
	}
	star.prototype.move = function(ctx) {
		this.y -= 0.16;
		if (this.y <= -10) {
            this.y = canvas.height + 10;
        }
        this.draw(ctx);
	}
    /*
    x,y: 流星的起始点坐标；speed：流星的速度
    */
    function meteor(x,y,speed,color) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.color = color || 'white';
    }
    meteor.prototype.draw = function(ctx) {
        var my_gradient=ctx.createLinearGradient(this.x,this.y,this.x + 100,this.y - 100);
        my_gradient.addColorStop(0,this.color);
        my_gradient.addColorStop(1,"black");
        ctx.strokeStyle=my_gradient;
        ctx.lineWidth = 1;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(this.x + 100, this.y - 100);
        ctx.stroke();
        ctx.closePath();
    }
    meteor.prototype.move = function(ctx) {
        // 改变流星x，y大小，达到流星下落的效果
        this.x -= this.speed;
        this.y += this.speed;
        // 当流星不在画布可视区域时，重新设置流星的位置和速度
        if (this.x < -50) {
            this.y = Math.random() * -100;
            this.x = Math.random() * canvas.width;
            this.speed = Math.random() * 10 + 1;
        }
        this.draw(ctx)
    }
	function animate() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        mouseMove(context);

        for (var i in starArr) {
            starArr[i].move(context);
        }
        for (var i in meteorArr) {
             meteorArr[i].move(context);
        }
        requestAnimationFrame(animate)
    }
    function mouseMove(ctx) { // 鼠标移动时画圈圈
    	for (var i in circleArr) {
    		ctx.fillStyle = circleArr[i].color;
    		ctx.beginPath();
    		ctx.arc(circleArr[i].x,circleArr[i].y,i,0,2 * Math.PI,false);
    		ctx.closePath();
    		ctx.fill();
    	}
    }
	function init() {
        for(var i = 0; i < starNum; i++ ){
            starArr[i] = new star(i,Math.random() * canvas.width,Math.random() * canvas.height);
            starArr[i].draw(context);
        }
        for (var i = 0; i < 3; i++) {
            meteorArr[i] = new meteor(Math.random() * canvas.width, Math.random() * -100, Math.random() * 10 + 1);
            meteorArr[i].draw(context);
        }
         animate();
    }
    init();
    canvas.addEventListener('mousemove', function(event) {
    	circle = {x: event.x,y: event.y};
    	if (circleArr.length>=10) {
    		circleArr.shift();
    	}
    	circleArr.push(circle);
    })
})();