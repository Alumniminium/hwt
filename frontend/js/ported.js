class Vector2{
    constructor(x,y){
        this.X = x
        this.Y = y
    }
    X = 0
    Y = 0
    
}
let FabToPrice = [
    new Vector2(1000,107) ,
    new Vector2(100, 1077) ,
    new Vector2(1000, 107),
    new Vector2(100, 1077),
    new Vector2(90, 1650),
    new Vector2(65, 1937),
    new Vector2(40, 2274),
    new Vector2(28, 2891),
    new Vector2(20, 3677),
    new Vector2(16, 3984),
    new Vector2(10, 5992),
    new Vector2(7, 9346),
    new Vector2(5, 17000),
    new Vector2(1, 10000)
]
function GetWaferPrice(size)
{
    var start = new Vector2(1,1);
    var end = new Vector2(1,1);
    for (let i = 0; i < FabToPrice.length; i++)
    {
        var cur = FabToPrice[i];
        if (size > cur.X)
        {
            start = FabToPrice[i==0?FabToPrice.length-1:i-1];
            end = FabToPrice[i];
            break;
        }
        if(size == cur.X)
            return cur.Y;
    }
    return start.Y + (size - start.X) * (end.Y - start.Y) / (end.X - start.X);
}