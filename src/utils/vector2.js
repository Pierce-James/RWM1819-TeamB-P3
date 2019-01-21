class Vector2
{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  //Operators
  plus(v)
  {
    return new Vector2(this.x + v.x, this.y + v.y);
  }
  plusEquals(v)
  {
    this.x += v.x;
    this.y += v.y;
  }

  multiply(val)
  {
    if(typeof(val) === Vector2){
      return new Vector2(this.x * val.x, this.y * val.y);
    }
    else{
      return new Vector2(this.x - v.x, this.y - v.y);
    }
  }

  multiplyEquals(val)
  {
    if(typeof(val) === Vector2){
      this.x *= val.x;
      this.y *= val.y;
    }
    else{
      this.x *= val;
      this.y *= val;
    }
  }

  minus(v)
  {
    return new Vector2(this.x - v.x, this.y - v.y);
  }

  //Converts vector to string
  toString()
  {
    return "(" + this.x.toString() + "," + this.y.toString() + ")";
  }


}
