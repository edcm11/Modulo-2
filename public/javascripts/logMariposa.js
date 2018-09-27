//canvas confiuration
var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');
var rect = canvas.getBoundingClientRect()
var pay = document.getElementById('pay')

console.log(pay)
//test
//ctx.fillRect(0,0,canvas.width,canvas.height)

// variables globales
var enemies = []
var interval
var frames = 0
var xClick
var yClick
var bullets = []
var score = 0
var loose = 524
var pruebaloose=0 // no es necesario
var bool = true
// var municiones = []
var x = 0
var bosses = []
var reds = []
var contador=0
var player2 = false

//clases
class Board {
  constructor(){
    this.x=0
    this.y=0
    this.w=canvas.width
    this.h=canvas.height
    this.image = new Image()
    // this.image.src = 'https://www.google.com.mx/search?q=background+gradient&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjktrrj4NndAhUB7qwKHXx6AWYQ_AUICigB&biw=1280&bih=721#imgrc=uGkaZ-BKIY9iyM:'
    /*this.image.onload = ()=>{
      this.draw()
    }*/
  }
  draw(){
    ctx.drawImage(this.image,this.x,this.y,this.w,this.h)
    
  }
}//board

class Vampire{
  constructor(){
    this.x=Math.floor(Math.random()*canvas.width)
    this.y=400
    this.cachoX = 0
    this.cachoXE = 0
    this.w=255/4
    this.wE=242/7 
    this.horizontal = bool
    bool = !bool
    this.vertical = false
    this.image = new Image()
    this.image.src='../images/Red.png'
    this.h=this.image.naturalHeight
    this.image2 = new Image()
  }
  draw(){
    if(this.vertical){this.moveDown()}
    else{this.moveTop()}
    if(this.horizontal){this.moveRight()}
    else{this.moveLeft()}

    //draw 
    if(frames%10==0) this.changeSprite()
    ctx.drawImage(this.image,this.cachoX,0,this.w,this.h,this.x,this.y,this.w,this.h)
  }
  changeSprite(){
    this.cachoX+=this.w
    if(this.cachoX>this.image.naturalWidth-this.w) this.cachoX=0
  }
  changeSpriteE(){
  this.cachoXE+=this.wE
  if(this.cachoXE>this.image2.naturalWidth-this.wE) this.cachoXE=0
  }
  deathAnimation(){
      if(frames%60===0)this.changeSpriteE()
      ctx.drawImage(this.image2,this.cachoXE,0,this.wE,this.image2.naturalHeight,this.x,this.y,this.wE,this.image2.naturalHeight)
  }
  moveRight(){
    if(this.x<(canvas.width-this.w)){this.x+=2}
    else{this.horizontal=false}
  }
  moveLeft(){
    if(this.x>=0){this.x-=2}
    else{
        this.horizontal=true
    }
  }
  moveDown(){
    if(this.y<500){this.y+=2}
    else{this.vertical=false}
  }
  moveTop(){
    if(this.y>=0){this.y-=2}
    else{this.vertical=true}
  }
  crashWith(){
    return  (this.x-10<xClick)&&
            (this.x + this.w+10> xClick)&&
            (this.y-10< yClick)&&
            (this.y+this.h+10 >yClick);
  }
  crashLoose(){
    return (this.y+this.h) === loose
  }
}//enemy



//objetos
var board = new Board()


//funciones principales
function start(){
  if(interval)return
  interval = setInterval(update,1000/60)
  enemies=[]
  municiones=[]
  frames = 0
}//start


//funcion de iteracion
function update(){
  frames++
  ctx.clearRect(0,0,canvas.width,canvas.height)
  board.draw()  
  /*if(frames%100===0 && score<20 && player2===false){
    createEnemys()
    createEnemys()
  }
  if(frames%100===0 && score<20 && player2===true){
    createEnemys()
    createEnemys()
    createEnemys()
    createEnemys()
  }
  if(frames%100===0 && score>19 && score<50 && player2 === false){
    createEnemys()
    createEnemys()
    createEnemys()
    }
  if(frames%100===0 && score>19 && score<50 && player2 === true){
    createEnemys()
    createEnemys()
    createEnemys()
    createEnemys()
    createEnemys()
    }*/
//   if(frames%800===0){
//     createMuniciones()
//   }
//   if(frames%90 === 0 && score>50 && player2===false){
//     createRed()
//     createRed()
//   }
//   if(frames%70 === 0 && score>50 && player2===true){
//     createRed()
//     createRed()
//     createRed()
//   }
//   if(score>49)drawBoss()
//   if(player2)mira.draw()
  drawReds()
  drawEnemys()
  xClick=null
  yClick=null
} //update

//funciones auxilires
function createEnemys(num){
  for(let i=0; i<=num;i++){
    enemy = new Vampire()
    enemies.push(enemy)
  }
  
}//create Enemy

function drawEnemys(){
  enemies.forEach(function(element){
    element.draw()
  }) 
} // drawEnemy

function createRed(){
  red = new redVamp((bosses[0].x+(bosses[0].w)/2),(bosses[0].y+70))
  reds.push(red)
}//creatRed

function drawReds(){
  reds.forEach(function(element){
  element.draw()
  })
}
 // Inicia la instancias de las balas iniciales
    start()
//listener

  createEnemys(5)
  console.log(causita)

