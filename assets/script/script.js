plx = undefined;
ply = undefined;
plvelx = 0;
plvely = 0;
plgr = false;
currlvl = undefined;
colliders = [];
let howFarRight = 0
let scrolledRight = 0

var keys = {};
window.onkeyup = function(e) { keys[e.keyCode] = false; }
window.onkeydown = function(e) { keys[e.keyCode] = true; }

function setup() {
	createCanvas(1000, 600);
	background("black");
	loadLevel(levels.l1);
}

function draw() {
	renderlvl(currlvl);
	player();
}

const player = function() {
	fill("pink");
	stroke("black");
	rect(plx, ply, 50, 50);

	if (!plgr) { plvely += 0.2; }

	//Move player based on keyboard inputs
	if (plgr && (keys["32"] || keys["87"])) {
		plvely -=7;
		plgr = false;
	}
	if (keys["65"] && !keys["68"]) {
		plvelx -= 1.5;
	}
	if (keys["68"] && !keys["65"]) {
		plvelx += 1.5;
	}

	if (plvelx > 0 || plvelx < 0) {
		plvelx = plvelx / 1.25;
	}
	
	plgr = false;
	for (let hitbox of colliders) {
		if (plx + plvelx + 50 > hitbox[0] && plx + plvelx < hitbox[0] + 25) {
			if (ply + plvely + 45 > hitbox[1] && ply + plvely < hitbox[1] + 45) {
				plvelx = -0.5;
			}
		}
		if (plx + plvelx < hitbox[0] + 50 && plx + plvelx > hitbox[0] + 25) {
			if (ply + plvely + 45 > hitbox[1] && ply + plvely < hitbox[1] + 45) {
				plvelx = 0.5;
			}
		}
		if (ply + plvely + 50 > hitbox[1] && ply + plvely < hitbox[1] + 25) {
			if (plx + plvelx + 45 > hitbox[0] && plx + plvelx < hitbox[0] + 45) {
				plvely = 0;
				plgr = true;
			}
		}
		if (ply + plvely < hitbox[1] + 50 && ply + plvely > hitbox[1] + 25) {
			if (plx + plvelx + 45 > hitbox[0] && plx + plvelx < hitbox[0] + 45) {
				plvely = 1;
				plgr = false;
			}
		}
	}
	
	ply += plvely;
	plx += plvelx;
}

const loadLevel = function(map) {
    currlvl = map;
    let currentPlayerBlock = plx/50
    let howFarRight = Math.floor(currentPlayerBlock-10)
    if (currentPlayerBlock >= 11) {
        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                switch (map[y][x+howFarRight]) {
                    case "S":
                        fill("lightblue");
                        noStroke();
                        rect(x*50, y*50, 50, 50);
                        plx = x*50;
                        ply = y*50;
                        break;
                }
            }
        }
    } else {
        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                switch (map[y][x]) {
                    case "S":
                        fill("lightblue");
                        noStroke();
                        rect(x*50, y*50, 50, 50);
                        plx = x*50;
                        ply = y*50;
                        break;
                }
            }
        }
    }
}

const renderlvl = function(map) {
    colliders = []
    let currentPlayerBlock = Math.floor(plx/50);
    //change 16 to the expression
    if (currentPlayerBlock > 16) {
        scrolledRight++;
        plx = 250;
        howFarRight += 12;
    } else if (currentPlayerBlock < 2) {
        plx = 700;
        scrolledRight -= 1;
    }

    noStroke();
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            switch (map[y][x+(scrolledRight*12)]) {
                case "-":
                    fill("lightblue");
                    rect(x*50, y*50, 50, 50);
                    break;
                case "S":
                    fill("lightblue");
                    rect(x*50, y*50, 50, 50);
                    break;
                case "Z":
                    fill("lightblue");
                    rect(x*50, y*50, 50, 50);
                    colliders.push([x*50, y*50, map[y][x]]);
                    break;
                case "T":
                    fill("lightblue");
                    rect(x*50, y*50, 50, 50);
                    fill("#473320");
                    rect((x*50)+7, (y*50)-150, 35, 300);
                    fill("#4B7043");
                    rect((x*50)-50, (y*50)-200, 150, 75);
                    rect((x*50)-10, (y*50)-230, 75, 110);
                    break;
                case "C":
                    fill("lightblue");
                    //rect(x*50, y*50, 50, 50);
                    fill("#CCE3DD");
                    rect((x*50)-100, (y*50), 3120, 30);
                    rect((x*50)+60, (y*50)-15, -150, 100);
                    rect((x*50)-20, (y*50)+30, -70, 30);
                    break;
                case "0":
                    fill("lightgreen");
                    rect(x*50, y*50, 50, 50);
                    colliders.push([x*50, y*50, map[y][x]]);
                    break;
                case "1":
                    fill("#82736D");
                    rect(x*50, y*50, 50, 50);
                    colliders.push([x*50, y*50, map[y][x]]);
                    break;
                case "2":
                    fill("#757575");
                    rect(x*50, y*50, 50, 50);
                    colliders.push([x*50, y*50, map[y][x]]);
                    break;
            }
        }
    }
}


let levels = {
	l1: [
		"-Z--------------------------------------------------------------------------------------------------------------------",
		"-Z------C--------------------------------------------------------------------------------------------------------------",
		"-Z--C------------------------------------------------------------------------------------------------------------------",
		"-Z-------------C-------------------------------------------------------------------------------------------------------",
		"-Z--------------------------------------------------------------------------------------------------------------------",
		"-Z------------------------------------------------------------------------------------------------------------------",
		"-Z--------------------------------------------------------------------------------------------------------------------",
		"-Z---------2-----------------------------------------------------------------------------------",
		"TZ---------2---------------------------------------------------------------------------",
		"00-----2---22-----------------------------------------------------------------------------------------------",
		"1000-S-----222---T--------------------------------------------------------------------------------------------",
		"1110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
	],
};