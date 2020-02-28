export { AStar }

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