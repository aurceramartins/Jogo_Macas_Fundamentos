var canvas;
var ctx;
var larg, alt;
var xMaza, yMaza;
var xRede, yRede;
var pontos = 0;
var coraçoes = 3;

var luzOn = new Image();
luzOn.src = "on.png";

var luzOff = new Image();
luzOff.src = "off.png";

var coraçao = new Image();
coraçao.src = "corazon.png";

var fundo = new Image();
fundo.src = "fondo2.jpg";

var fail = new Image();
fail.src = "fail.jpg";

var eureka = new Image();
eureka.src = "eureka.jpg";

var maza = new Image();
maza.src = "maza.png";

var rede = new Image();
rede.src = "einstein.png";

function init() {
    canvas = document.getElementById("cvs");
    ctx = canvas.getContext("2d");
    xMaza = 50;
    yMaza = 50;
    redimensiona();
    xRede = larg / 2 - 200;
    yRede = alt - 200;
    gameLoop();
}

function update() {

    yMaza += 5;
    if (yMaza > alt + 100) {
        repoeMaza();
        coraçoes--;
    }

    var xCentro, yCentro;
    xCentro = xMaza + maza.width / 2;
    yCentro = yMaza + maza.height / 2;
    if (xCentro > xRede && xCentro < xRede + rede.width &&
            yCentro > yRede && yCentro < yRede + rede.height) {
        pontos++;
        repoeMaza();
    }

}
function render() {
    if (coraçoes > 0 && pontos < 30) {
        ctx.fillStyle = "#80C0FF";
        ctx.beginPath();
        ctx.clearRect(0, 0, larg, alt);
        ctx.drawImage(fundo, 0, 0, larg, alt);
        ctx.fill();
        // Desenhar Coraçoes
        if (coraçoes == 3) {
            ctx.drawImage(coraçao, larg - 60, 90, 50, 50);
            ctx.drawImage(coraçao, larg - 115, 90, 50, 50);
            ctx.drawImage(coraçao, larg - 170, 90, 50, 50);
        } else if (coraçoes == 2) {
            ctx.drawImage(coraçao, larg - 60, 90, 50, 50);
            ctx.drawImage(coraçao, larg - 115, 90, 50, 50);
        } else if (coraçoes == 1) {
            ctx.drawImage(coraçao, larg - 60, 90, 50, 50);
        }
        // Desenhar Luz
        if (pontos < 10) {
            ctx.drawImage(luzOff, larg - 60, 10, 50, 50);
            ctx.drawImage(luzOff, larg - 115, 10, 50, 50);
            ctx.drawImage(luzOff, larg - 170, 10, 50, 50);
        } else if (pontos >= 10 && pontos < 20) {
            ctx.drawImage(luzOff, larg - 60, 10, 50, 50);
            ctx.drawImage(luzOff, larg - 115, 10, 50, 50);
            ctx.drawImage(luzOn, larg - 170, 10, 50, 50);
        } else if (pontos >= 20 && pontos < 30) {
            ctx.drawImage(luzOff, larg - 60, 10, 50, 50);
            ctx.drawImage(luzOn, larg - 115, 10, 50, 50);
            ctx.drawImage(luzOn, larg - 170, 10, 50, 50);
        }
        // Desenhar a Mazá
        ctx.drawImage(maza, xMaza, yMaza);
        // Desenhar ao Einstein
        ctx.drawImage(rede, xRede, yRede);
        // Colocar os pontos
        ctx.fillStyle = "yellow";
        ctx.font = "bold 20px serif";
        ctx.fillText("Pontos: " + pontos, larg - 130, 80);
    } else if (coraçoes == 0) {
        ctx.clearRect(0, 0, larg, alt);
        ctx.drawImage(fail, 0, 0, larg, alt);
        ctx.fillStyle = "yellow";
        ctx.font = "bold 50px serif";
        ctx.fillText("Voçe não descobriu a formula da relatividade", 50, alt / 2 + 30);
        ctx.fillText("pressione F5 para começar de novo", 200, alt / 2 + 90);
    }
    if (pontos == 30) {
        ctx.clearRect(0, 0, larg, alt);
        ctx.drawImage(eureka, 0, 0, larg, alt);
        ctx.fillStyle = "red";
        ctx.font = "bold 50px serif";
        ctx.fillText("EUREKA!!!", larg / 2 - 120, alt / 2 + 180);
        ctx.fillText("pressione F5 para começar de novo", 200, alt / 2 + 240);
    }
}
function gameLoop() {
    window.requestAnimationFrame(gameLoop);
    update(); // atualiza as vari�veis dos objetos da anima��o
    render(); // desenha os objetos
}

function repoeMaza() {
    xMaza = Math.floor((larg - maza.width) * Math.random());
    yMaza = -maza.height;
}
function redimensiona() {
    larg = window.innerWidth;
    alt = window.innerHeight;
    canvas.setAttribute("width", larg);
    canvas.setAttribute("height", alt);
}

function teclaEmBaixo(evento) {
    var tecla = evento.keyCode;
    //console.log(tecla);
    switch (tecla) {
        case 37:	// esquerda
            xRede -= 13;
            if (xRede < 0)
                xRede = 0;
            break;
        case 39:	// direita
            xRede += 13;
            if (xRede > larg - rede.width)
                xRede = larg - rede.width;
            break;
    }
}

window.addEventListener('resize', redimensiona);
window.addEventListener('keydown', teclaEmBaixo);

