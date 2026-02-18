window.onload = function() {
    const canvas = document.getElementById("cityCanvas");
    const ctx = canvas.getContext("2d");
    const tileSize = 40;
    
    let score = 0;
    let timeLeft = 60;
    let vanPos = { x: 3, y: 0 };

    // MAPA: 0=Grama, 1=Rua, 2=Casa, 3=Escola, 4=Criança
    const map = [
        [1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,3],
        [1,0,0,1,0,2,2,0,0,2,0,1,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1],
        [1,0,2,1,0,0,4,0,0,0,0,1,0,2,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [0,0,0,1,0,0,0,4,0,0,0,1,0,0,0,0],
        [0,2,0,1,0,0,0,0,0,0,0,1,0,2,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,4,0,1,0,2,0,0,4,0,0,1,0,0,4,1],
        [1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];

    // FUNÇÕES DE DESENHO "NA MÃO"
    function drawGrass(x, y) {
        ctx.fillStyle = "#71B924";
        ctx.fillRect(x, y, tileSize, tileSize);
        // Detalhe de matinho
        ctx.fillStyle = "#65a320";
        ctx.fillRect(x + 10, y + 10, 2, 2);
        ctx.fillRect(x + 25, y + 20, 2, 2);
    }

    function drawRoad(x, y) {
        ctx.fillStyle = "#444";
        ctx.fillRect(x, y, tileSize, tileSize);
        ctx.strokeStyle = "#555";
        ctx.strokeRect(x, y, tileSize, tileSize);
    }

    function drawHouse(x, y) {
        drawGrass(x, y);
        ctx.fillStyle = "#a52a2a"; // Parede
        ctx.fillRect(x + 5, y + 15, 30, 20);
        ctx.fillStyle = "#5d1a1a"; // Telhado
        ctx.beginPath();
        ctx.moveTo(x + 5, y + 15);
        ctx.lineTo(x + 20, y + 5);
        ctx.lineTo(x + 35, y + 15);
        ctx.fill();
        ctx.fillStyle = "#fff"; // Janela
        ctx.fillRect(x + 10, y + 20, 8, 8);
    }

    function drawSchool(x, y) {

        drawGrass(x, y);
        ctx.fillStyle = "#d08c2eff"; // Parede
        ctx.fillRect(x + 5, y + 15, 30, 20);
        ctx.fillStyle = "#5d1a1a"; // Telhado
        ctx.beginPath();
        ctx.moveTo(x + 5, y + 15);
        ctx.lineTo(x + 20, y + 5);
        ctx.lineTo(x + 35, y + 15);
        ctx.fill();
        ctx.font = "bold 10px Arial";
        ctx.fillText(" Fim.", x + 8, y + 25);
    }

    function drawChild(x, y) {
        drawRoad(x, y);
        ctx.fillStyle = "#e74c3c"; // Mochila
        ctx.fillRect(x + 12, y + 12, 16, 16);
        ctx.fillStyle = "white";
        ctx.fillRect(x + 16, y + 15, 8, 2); // Alça da mochila
    }

    function drawVan(x, y) {
        // Corpo da Van
        ctx.fillStyle = "#f1c40f";
        ctx.roundRect(x + 4, y + 8, 32, 24, 5);
        ctx.fill();
        // ctx.strokeStyle = "#000";
        // ctx.lineWidth = 2;
        // ctx.stroke();
        
        // Janelas
        ctx.fillStyle = "#3498db";
        ctx.fillRect(x + 8, y + 12, 10, 10);
        ctx.fillRect(x + 22, y + 12, 8, 10);
        
        // Rodas
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(x + 10, y + 32, 4, 0, Math.PI*2);
        ctx.arc(x + 30, y + 32, 4, 0, Math.PI*2);
        ctx.fill();
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for(let r = 0; r < map.length; r++) {
            for(let c = 0; c < map[r].length; c++) {
                let x = c * tileSize;
                let y = r * tileSize;
                let type = map[r][c];

                if(type === 0) drawGrass(x, y);
                if(type === 1) drawRoad(x, y);
                if(type === 2) drawHouse(x, y);
                if(type === 3) drawSchool(x, y);
                if(type === 4) drawChild(x, y);
            }
        }
        drawVan(vanPos.x * tileSize, vanPos.y * tileSize);
    }

    document.addEventListener("keydown", (e) => {
        let nx = vanPos.x;
        let ny = vanPos.y;

        if(e.key === "ArrowLeft") nx--;
        if(e.key === "ArrowRight") nx++;
        if(e.key === "ArrowUp") ny--;
        if(e.key === "ArrowDown") ny++;

        if(map[ny] && (map[ny][nx] === 1 || map[ny][nx] === 4 || map[ny][nx] === 3)) {
            if(map[ny][nx] === 4) {
                score++;
                map[ny][nx] = 1;
                document.getElementById("score").innerText = score;
            }
            if(map[ny][nx] === 3) {
                if(score >= 5) { alert("Vitória! Crianças entregues!"); location.reload(); }
                else alert("Pegue todas as crianças primeiro!");
                return;
            }
            vanPos.x = nx;
            vanPos.y = ny;
            render();
        }
    });

    setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;
        if(timeLeft <= 0) { alert("Game Over!"); location.reload(); }
    }, 1000);

    render();
};

if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        this.beginPath();
        this.moveTo(x + r, y);
        this.arcTo(x + w, y, x + w, y + h, r);
        this.arcTo(x + w, y + h, x, y + h, r);
        this.arcTo(x, y + h, x, y, r);
        this.arcTo(x, y, x + w, y, r);
        this.closePath();
        return this;
    };
}