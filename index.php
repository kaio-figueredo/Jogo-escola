<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Van Escolar Adventure</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { background: #121212; color: white; height: 100vh; display: flex; align-items: center; }
        .game-card { background: #1e1e1e; border: 2px solid #780000ff; border-radius: 15px; padding: 20px; box-shadow: 0 0 30px rgba(0,0,0,0.5); }
        canvas { border-radius: 10px; cursor: none; background: #cf8911ff; }
        .stats-box { background: #252525; border-radius: 10px; padding: 10px 20px; border: 1px solid #780000ff; }
    </style>
</head>
<body>

<div class="container">
    <div class="row justify-content-center">
        <div class="col-auto game-card">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h2 class="m-0 " style="color: #990505ff;">Bus Stop City</h2>
                <div class="stats-box d-flex gap-4">
                    <span>Crianças: <b id="score" class="text-warning">0</b>/5</span>
                    <span>Tempo: <b id="timer" class="text-danger">60</b>s</span>
                </div>
            </div>

            <canvas id="cityCanvas" width="640" height="480"></canvas>

            <div class="mt-3 text-center text-secondary">
                <small>Use as <b>Setas do Teclado</b> para dirigir a van até a escola. </small>
            </div>
        </div>
    </div>
</div>

<script src="game.js"></script>
</body>
</html>