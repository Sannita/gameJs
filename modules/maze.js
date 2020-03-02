export { launch as default }

import { Core } from './engine/engine.js'
import { Grid } from './maze/maze.js'

let launch = (containerId, width, height) => {
    console.log('maze')

    width = 1290;
	height = 630;
	let dw = 30;
	let dh = 30;

    let core = new Core()
    core.setDebug(false);
	core.setup(containerId, width, height);
	core.initListeners();
	core.start();


	let grid = new Grid(width, height);
	grid.generate(width, height, dw, dh);
	core.addItem(grid);

	grid.activate();
	grid.findPath();
}