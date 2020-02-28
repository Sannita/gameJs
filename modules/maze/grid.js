export { Grid }

import { Item, Utils } from '../engine/engine.js'

import { Cell, AStar, Path } from './maze.js'

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

                //this.grid[i][j].id = j * this.rows + i;
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
