/*
* @Author: huangqh
* @Date:   2019-04-18 11:53:09
* @Last Modified by:   huangqh
* @Last Modified time: 2019-04-19 13:41:24
*/
(function() {
	var canvas = document.getElementById('canvas'),
	    context = canvas.getContext('2d'),
	    starArr = [],
	    starNum = 100,
	    circle = {
	    	x: 0,
	    	y: 0,
	    	color: 'white'
	    },
	    circleArr = [];
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
        drawCircle(ctx);
	}
	function animate() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        for (var i in starArr) {
            starArr[i].move(context);
        }
        requestAnimationFrame(animate)
    }
    function drawCircle(ctx) {
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