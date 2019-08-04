var c = document.getElementById("1");
var ctx = c.getContext("2d");
c.width = innerWidth;
c.height = innerHeight;

addEventListener('resize',function(){c.width = innerWidth;c.height = innerHeight;});

var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66','#E95131','#F0FF00']
function randomNoInRange(min,max)
{
	return Math.floor((Math.random()*(max - min + 1) + min));
}
Object.prototype.draw = function()
{
	ctx.beginPath();
	ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
	ctx.fillStyle = this.color;
	ctx.fill();
	ctx.stroke();
}
Object.prototype.update = function()
{
	if((this.y + this.radius) > c.height)
	{
		this.dy = -this.dy * friction;
	}
	else
	{	
		this.dy += 1;
	}
	if((this.x + this.radius + this.dx > c.width) || (this.x - this.radius) < 0 )
	{
		this.dx = -this.dx;
	}
	 
	this.y += this.dy;
	this.x += this.dx;
	this.draw();
}
var friction = 0.99;
function ball(x,y,dx,dy,radius)
{
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.color = colors[Math.floor(Math.random() * colors.length)];
	this.radius = radius;
	this.update();
}
function animate()
{
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,c.width,c.height);
	for(var i = 0;i<400;i++)
	{
		balls[i].update();
	}
}
var balls = [];
function init()
{
	for(var  i = 0;i<400;i++)
	{
		var radius = randomNoInRange(8,25);
		var x = randomNoInRange(10,c.width-radius);
		var y = randomNoInRange(10,c.height-radius);
		var dx = randomNoInRange(-2,3);
		var dy = randomNoInRange(-2,3);
		balls.push(new ball(x,y,dx,dy,radius));
	}
}
init();
animate();

