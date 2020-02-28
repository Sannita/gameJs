export { launch as default }

import { Core } from './engine/engine.js'
import { Grid } from './maze/maze.js'

let launch = (containerId, width, height) => {
    console.log('maze')

    var width = 1290;
	var height = 630;
	var dw = 30;
	var dh = 30;

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