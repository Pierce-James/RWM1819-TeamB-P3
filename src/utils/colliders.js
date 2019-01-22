class CollisionBox
{
  constructor(x, y, w, h)
  {
    this.position = new Vector2(x, y);
    this.width = w;
    this.height = h;
    this.min = new Vector2(x, y);
    this.max = new Vector2(x + w, y + h);
  }

  draw(ctx)
  {
    ctx.save();
    ctx.strokeStyle = "#f7392e";
    ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    ctx.restore();
  }

  setPosition(x, y)
  {
    this.position.x = x;
    this.position.y = y;
  }

  setPosition(v)
  {
    this.position = v;
  }

  updateMinMax()
  {
    this.min = new Vector2(x, y);
    this.max = new Vector2(x + w, y + h);
  }
}

class CollisionCircle
{
  constructor(x, y, r)
  {
    this.position = new Vector2(x, y);
    this.radius = r;
  }

  draw(ctx)
  {
    ctx.save();
    ctx.strokeStyle = "#f7392e";
    ctx.beginPath();
    ctx.arc(this.position.x + this.radius, this.position.y + this.radius, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
  }

  setPosition(x, y)
  {
    this.position.x = x;
    this.position.y = y;
  }
}

class Collision
{
  //Collision detection methods
  CircleVsCircle(a, b)
  {
    var r = a.radius + b.radius;
    r *= r;
    return r < Math.pow(a.position.x + b.position.x, 2) + Math.pow(a.position.y + b.position.y, 2);
  }

  AABBvsAABB(a, b)
  {
    // Exit with no intersection if found separated along an axis
  	if (a.max.x < b.min.x || a.min.x > b.max.x)
  		return false;
  	if (a.max.y < b.min.y || a.min.y > b.max.y)
  		return false;

  	// No separating axis found, therefor there is at least one overlapping axis
  	return true;
  }
}
