let canvas=document.querySelector("canvas");
let ctx=canvas.getContext('2d');

let cell_size=50;

let direction='right';

let gameOVERflag=false;

let khaana=khaanaBnao();



let score=0;

document.addEventListener('keydown',(event)=>{
    // event.preventDefault();
    //console.log(event);
    var dir=event.key;
    if(dir==="ArrowUp"&& direction!='down'){
        direction='up';
    }
    else if(dir==="ArrowDown"&&direction!='up'){
        direction='down';
    }
    else if(dir==="ArrowLeft"&&direction!='right'){
        direction='left';
    }
    else if(dir==="ArrowRight"&&direction!='left'){
        direction='right';
    }
 
 })

//snake board starting point
let Cells=[[0,0]];

//function to draw snake
function draw(){
        if(gameOVERflag===true){
            clearInterval(intervalID);
            ctx.fillStyle="skyblue";
            ctx.font="55px monospace";
            ctx.fillText("GAME OVER !!",560,350);
           
            return;
        }
        
//Saanp Paal rha hu 
    ctx.clearRect(0,0,1500,700);
for(let cell of Cells){
    ctx.fillStyle='red';
    ctx.fillRect(cell[0],cell[1],cell_size,cell_size);
    ctx.strokeStyle='white';
    ctx.strokeRect(cell[0],cell[1],cell_size,cell_size);
}
//food
ctx.fillStyle="green";
ctx.fillRect(khaana[0],khaana[1],cell_size,cell_size);
ctx.fillStyle="white";
ctx.font="30px monospace";
ctx.fillText(`SCORE: ${score}`,20,25);

}


//function to update snake
function update(){
    let headX=Cells[Cells.length-1][0];
    let headY=Cells[Cells.length-1][1];
    let newheadX=headX;
    let newheadY=headY;
   
    if(direction==='right'){
        newheadX+=cell_size;
    }
    else if(direction==='left'){
        newheadX-=cell_size; 
    }
    else if(direction==='down'){
        newheadY+=cell_size;
    }
    else if(direction==='up'){
        newheadY-=cell_size;
    }

    if(newheadX===1500||newheadY===700||newheadY<0||newheadX<0||selfharm(newheadX,newheadY)){
        gameOVERflag=true;
        
    }
   

    Cells.push([newheadX,newheadY]);
    // Cells.shift();
    if(newheadX===khaana[0]&&newheadY===khaana[1]){
        score++;
        khaana=khaanaBnao();
    }
    else{
        Cells.shift();
    }
}

function khaanaBnao(){
return[
    Math.round((Math.random()*(1500-cell_size))/cell_size)*cell_size,
    Math.round((Math.random()*(700-cell_size))/cell_size)*cell_size,

]
}
function selfharm(nx,ny){
    for(let cell of Cells){
        if(cell[0]==nx&&cell[1]==ny){
            return true;
        }
    }
    return false;
}

//repeat
let intervalID=setInterval(()=>{
  
update();
draw();
},100);