export { launch as default }

import { Core } from './engine/core.js'
import { Item } from './engine/item.js'
import * as Utils from './engine/utils.js'

let Cell = class {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.wall = false;
        this.color = 'white';
        this.border = 'black';
    }

    setWall(wall) {
        this.wall = wall;
        if (this.wall) {
            this.color = 'black';
        } else {
            this.color = 'white';
        }
    }

    setColor(color) {
        this.color = color;
    }

    setBorder(color) {
        this.border = color;
    }

    render(ctx, dw, dh) {
        ctx.beginPath();
        ctx.rect(Math.floor(this.i * dw), Math.floor(this.j * dh), dw, dh);
        //ctx.ellipse(this.i * dw + dw/2, this.j * dh + dh/2, dw / 4, dh / 4, 0, 0 , 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        //ctx.strokeStyle = this.border;
        ctx.stroke();
    }
}


let heuristic = (start, end) => {
    let dx = Math.abs(start.i - end.i);
    let dy = Math.abs(start.j - end.j);
    let dc = Math.abs(end.value - start.value);

    let d = Math.sqrt(dx * dx + dy * dy + dc * dc);

    return d;
}

let distance = (start, end) => {


    let dx = Math.abs(start.i - end.i);
    let dy = Math.abs(start.j - end.j);
    let dc = Math.abs(end.value - start.value);

    //let d = (dx + dy) + (Math.sqrt(2) - 2 ) * Math.min(dx, dy);
    /*
    if(dc > 0){
        dc = dc * 1.1;
    }else{
        dc = dc * 0.9;
    }*/
    let d = Math.sqrt(dx * dx + dy * dy + dc * dc);
    return d;

}

let heuristic2 = (start, end) => {

    let dx = Math.abs(start.i - end.i);
    let dy = Math.abs(start.j - end.j);
    let dc = Math.abs(end.value - start.value);

    return dx + dy + dc;
}

let distance2 = (start, end) => {
    return 1;
}

let findLowFScore = (set) => {
    let min;
    let keys = Object.keys(set);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let item = set[key];
        if (min === undefined || item.fScore < min.fScore) {
            min = item;
        }
    }
    return min;
}

let reconstructPath = (node) => {
    let path = [];
    let temp = node;
    path.push(temp);
    while (temp.cameFrom) {
        temp = temp.cameFrom;
        path.push(temp);
    }
    return path.reverse();
}

let AStar = class {
    constructor(grid) {
        this.grid = grid;
    }

    findPath() {
        let start = this.grid.start;
        let end = this.grid.end;

        let openSet = {};
        let closedSet = {};

        openSet[start.id] = start;

        start.gScore = 0;
        start.fScore = heuristic2(start, end);

        let keys = Object.keys(openSet);
        while (keys.length > 0) {

            let current = findLowFScore(openSet);

            if (current === end) {
                return reconstructPath(current);
            }

            delete openSet[current.id];
            closedSet[current.id] = current;

            let neighbors = this.grid.getNeighbors4(current);
            for (let i = 0; i < neighbors.length; i++) {
                let neighbor = neighbors[i];
                if (neighbor.value === undefined || closedSet[neighbor.id] !== undefined) {
                    continue;
                }
                let tentativeGScore = current.gScore + distance2(current, neighbor);
                if (openSet[neighbor.id] === undefined) {
                    openSet[neighbor.id] = neighbor;
                } else if (neighbor.gScore !== undefined && tentativeGScore >= neighbor.gScore) {
                    continue;
                }

                neighbor.cameFrom = current;
                neighbor.gScore = tentativeGScore;
                neighbor.fScore = tentativeGScore + heuristic2(neighbor, end);
            }
            keys = Object.keys(openSet);
        }

        return [];
    }

}

class Path extends Item {
    constructor(path) {
        super()

        this.path = path;
        this.pos = 0;
    }

    update(dt) {
        if (this.pos < this.path.length) {
            this.pos++;
        }
    }

    render(ctx, dw, dh) {
        if (this.path.length == 0) {
            return;
        }
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        var start = this.path[0];
        ctx.moveTo(Math.floor(start.i * dw + dw / 2), Math.floor(start.j * dh + dh / 2));
        for (var i = 1; i < this.pos; i++) {
            var item = this.path[i];
            ctx.lineTo(Math.floor(item.i * dw + dw / 2), Math.floor(item.j * dh + dh / 2));
        }
        ctx.stroke();
        ctx.restore();
    }

}

class Grid extends Item {
    constructor(width, height) {
        super(0,0,width,height)
        
        this.width = width;
        this.height = height;
    }

    load(url) {
        var self = this;
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == XMLHttpRequest.DONE) {
                if (request.status == 200) {
                    var json = JSON.parse(request.responseText);
                    var map = json.map;
                    self.rows = map.length;
                    self.cols = map[0].length;
                    self.dw = Math.floor(self.width / self.cols);
                    self.dh = Math.floor(self.height / self.rows);
                    self.grid = new Array(self.cols);
                    for (var i = 0; i < self.cols; i++) {
                        self.grid[i] = new Array(self.rows);
                        for (var j = 0; j < self.rows; j++) {
                            var cell = map[j][i];

                            var hex = cell.toString(16);
                            var c = 255 - cell;

                            var color = 'rgb(' + c + ',' + c + ',' + c + ')';

                            self.grid[i][j] = new Cell(i, j);
                            self.grid[i][j].value = cell;
                            self.grid[i][j].setColor(color);
                            self.grid[i][j].id = j * self.rows + i;

                        }
                    }

                    self.start = self.grid[0][0];
                    self.end = self.grid[self.cols - 1][self.rows - 1];
                } else {
                    console.log('errore');
                    console.log(request);
                }
            }
        }

        request.open("GET", url, false);
        request.send();
    }

    generate(width, height, dw, dh) {
        this.width = width;
        this.height = height;
        this.dw = dw;
        this.dh = dh;
        this.cols = Math.floor(this.width / this.dw);
        this.rows = Math.floor(this.height / this.dh);

        var stack = [];

        this.grid = new Array(this.cols);
        for (var i = 0; i < this.cols; i++) {
            this.grid[i] = new Array(this.rows);
            for (var j = 0; j < this.rows; j++) {
                this.grid[i][j] = new Cell(i, j);
                if (i % 2 == 0 && j % 2 == 0) {
                    this.grid[i][j].value = 0;
                    this.grid[i][j].setColor('white');
                    this.grid[i][j].setBorder('white');
                    stack.push(this.grid[i][j]);
                } else {
                    this.grid[i][j].value = undefined;
                    this.grid[i][j].setColor('black');
                    this.grid[i][j].setBorder('black');
                }

                this.grid[i][j].id = j * this.rows + i;
            }
        }

        this.draw(stack);

        this.start = this.grid[0][0];
        this.end = this.grid[this.cols - 1][this.rows - 1];
    }

    draw(stack) {
        var unvisited = stack.length;
        var current = stack.pop();
        current.visited = true;
        unvisited--;
        while (unvisited > 0) {
            var neighbors = [];
            if (current.j > 1 && !this.grid[current.i][current.j - 2].visited) {
                neighbors.push(this.grid[current.i][current.j - 2]);
            }

            if (current.i > 1 && !this.grid[current.i - 2][current.j].visited) {
                neighbors.push(this.grid[current.i - 2][current.j]);
            }

            if (current.i < this.cols - 2 && !this.grid[current.i + 2][current.j].visited) {
                neighbors.push(this.grid[current.i + 2][current.j]);
            }

            if (current.j < this.rows - 2 && !this.grid[current.i][current.j + 2].visited) {
                neighbors.push(this.grid[current.i][current.j + 2]);
            }

            if (neighbors.length > 0) {
                stack.push(current);
                var r = Utils.getRandomInt(0, neighbors.length - 1);
                var c = neighbors[r];
                this.removeWall(c, current);
                current = c;
                current.visited = true;
                unvisited--;
            } else if (stack.length > 0) {
                current = stack.pop();
            }
        }

    }

    removeWall(a, b) {

        var w;
        if (a.i == b.i) {
            if (a.j < b.j) {
                w = this.grid[a.i][a.j + 1];
            } else {
                w = this.grid[a.i][a.j - 1];
            }
        }
        if (a.j == b.j) {
            if (a.i < b.i) {
                w = this.grid[a.i + 1][a.j];
            } else {
                w = this.grid[a.i - 1][a.j];
            }
        }
        w.value = 0;
        w.setColor('white');
        w.setBorder('white');
    }


    getCell(i, j) {
        return this.grid[i][j];
    }

    findPath() {
        var aStar = new AStar(this);
        var p = aStar.findPath();
        var path = new Path(p);
        this.path = path;
        //console.log(p);
        //console.log(this.path);
    }


    getNeighbors8(cell) {
        var neighbors = [];

        if (cell.j > 0) {
            if (cell.i > 0) {
                neighbors.push(this.grid[cell.i - 1][cell.j - 1]);
            }
            neighbors.push(this.grid[cell.i][cell.j - 1]);
            if (cell.i < this.cols - 1) {
                neighbors.push(this.grid[cell.i + 1][cell.j - 1]);
            }
        }

        if (cell.i > 0) {
            neighbors.push(this.grid[cell.i - 1][cell.j]);
        }

        if (cell.i < this.cols - 1) {
            neighbors.push(this.grid[cell.i + 1][cell.j]);
        }

        if (cell.j < this.rows - 1) {
            if (cell.i > 0) {
                neighbors.push(this.grid[cell.i - 1][cell.j + 1]);
            }
            neighbors.push(this.grid[cell.i][cell.j + 1]);
            if (cell.i < this.cols - 1) {
                neighbors.push(this.grid[cell.i + 1][cell.j + 1]);
            }
        }

        return neighbors;
    }

    getNeighbors4(cell) {
        var neighbors = [];

        if (cell.j > 0) {
            neighbors.push(this.grid[cell.i][cell.j - 1]);
        }

        if (cell.i > 0) {
            neighbors.push(this.grid[cell.i - 1][cell.j]);
        }

        if (cell.i < this.cols - 1) {
            neighbors.push(this.grid[cell.i + 1][cell.j]);
        }

        if (cell.j < this.rows - 1) {
            neighbors.push(this.grid[cell.i][cell.j + 1]);
        }

        return neighbors;
    }

    update(dt) {
        if (this.path) {
            this.path.update(dt);
        }
    }

    render(ctx, alpha) {
        for (var i = 0; i < this.cols; i++) {
            for (var j = 0; j < this.rows; j++) {
                this.grid[i][j].render(ctx, this.dw, this.dh);
            }
        }
        if (this.path) {
            this.path.render(ctx, this.dw, this.dh);
        }
    }
}


let launch = (containerId, width, height) => {
    console.log('maze')

    var width = 500;
	var height = 500;
	var dw = 20;
	var dh = 20;

    let core = new Core()
    core.setDebug(false);
	core.setup(containerId, width, height);
	core.initListeners();
	core.start();


	var grid = new Grid(width, height);
	grid.generate(width, height, dw, dh);
	core.addItem(grid);

	grid.activate();
	grid.findPath();
}