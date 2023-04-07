var btncolors=["red","yellow","green","blue"];
var gamepat=[];
var userpat=[];
var level=0;
var start=false;
var maxlevel=0;
$(document).keypress(function(){
    if(start===false)
    {
        $("#level-title").text("Level "+level);
        nextseq();
        start=true;
    }
});
$(document).click(function(){
    if(start===false)
    {
        $("#level-title").text("Level "+level);
        nextseq();
        start=true;
    }
});
$(".btn").click(function(){
    var userchoscolor=$(this).attr("id");
    userpat.push(userchoscolor);
    playSound(userchoscolor);
    animate(userchoscolor);
    var idx=userpat.length-1;
    check(idx);
})
function check(idx)
{
    if(gamepat[idx]===userpat[idx])
    {
        if(userpat.length===gamepat.length)
        {
            setTimeout(function(){
                nextseq();
            },1000);
        }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press any key to Restart");
        maxlevel=Math.max(level,maxlevel);
        $("#highscorehead").text(maxlevel);
        level=0;
       gamepat=[];
        start=false;
    }
}
function nextseq()
{
    userpat=[];
    level++;
    $("#level-title").text("Level " + level);
    var randnum=Math.floor(Math.random()*4);
    var randchosecolor=btncolors[randnum];
    gamepat.push(randchosecolor);
    playSound(randchosecolor);
    $("#"+randchosecolor).fadeIn(100).fadeOut(100).fadeIn(100);
    // animate(randchosecolor);
}
function animate(curcolor)
{
    $("#"+curcolor).addClass("pressed");
    setTimeout(function(){
        $("#"+curcolor).removeClass("pressed");
    },100);

}
function playSound(name)
{
    var sound=new Audio(''+name+'.mp3');
    sound.play();
}
