export { launch as default }

import { Core} from './engine/engine.js'
import * as Utils from './engine/utils.js'

let core = new Core()
core.setDebug(false)

class District{
    constructor(name){
        this.name = name
    }
}

class Place{
    constructor(name, district, instable){
        this.name = name
        this.district = district
        this.instable = instable
        this.roads = new Map()
    }

    addRoad(place, color){
        this.roads.set(place, color)
    }
}

const SKILL = 'Abilità';
const COMMON_ITEM = 'Oggetti Comuni';
const ALLY = 'Alleati';
const UNIQUE_ITEM = 'Oggetti Unici';
const BLESS = 'Benedizione';
const RESISTANCE = 'Resistenza';
const MONEY = 'Denaro';
const SANITY = 'Sanità Mentale';
const SPELLS = 'Incantesimi';
const CLUES = 'Segnalini Indizi';

const YELLOW = 0
const BLACK = 1
const WHITE = 2
const BLACKWHITE = 3

const districts = [
    { id : 'NORTHSIDE', name : 'Northside' },
    { id : 'DOWNTOWN', name : 'Downtown' },
    { id : 'EASTTOWN', name : 'Easttown' },
    { id : 'RIVERTOWN', name : 'Rivertown' },
    { id : 'MERCHANT_DISTRICT', name : 'Merchant District' },
    { id : 'MISKATONIC_UNIVERSITY', name : 'Miskatonic University' },
    { id : 'FRENCH_HILL', name : 'French Hill' },
    { id : 'UPTOWN', name : 'Uptown' },
    { id : 'SOUTHSIDE', name : 'Southside' }
]

const places = [
    { id : 'NORTHSIDE' , name : 'Northside', district : 'NORTHSIDE', x : 290, y : 390, w : 210, h : 110},
    { id : 'TRAIN_STATION' , name : 'Train Station', district : 'NORTHSIDE', unstable : false, x : 180, y : 20, w : 180, h : 180 },
    { id : 'NEWSPAPER' , name : 'Newspaper', district : 'NORTHSIDE', unstable : false, x : 40, y : 210, w : 180, h : 180},
    { id : 'CURIOSITY_SHOPPE' , name : 'Curiosity Shoppe', district : 'NORTHSIDE', unstable : false, x : 40, y : 405, w : 180, h : 240}
]

const roads = [
    { source : 'TRAIN_STATION', destination : 'NORTHSIDE', color : BLACKWHITE},
    { source : 'NORTHSIDE', destination : 'TRAIN_STATION', color : YELLOW},
    { source : 'NEWSPAPER', destination : 'NORTHSIDE', color : BLACKWHITE},
    { source : 'NORTHSIDE', destination : 'NEWSPAPER', color : YELLOW},
    { source : 'CURIOSITY_SHOPPE', destination : 'NORTHSIDE', color : BLACKWHITE},
    { source : 'NORTHSIDE', destination : 'CURIOSITY_SHOPPE', color : YELLOW},
/*    { source : 'DOWNTOWN', destination : 'NORTHSIDE', color : BLACK},
    { source : 'NORTHSIDE', destination : 'DOWNTOWN', color : WHITE},
    { source : 'MERCHANT_DISTRICT', destination : 'NORTHSIDE', color : WHITE},
    { source : 'NORTHSIDE', destination : 'MERCHANT_DISTRICT', color : BLACK}*/
]

const NORTHSIDE = new District('Northside')
const DOWNTOWN = new District('Downtown')
const EASTTOWN = new District('Easttown')
const RIVERTOWN = new District('Rivertown')
const MERCHANT_DISTRICT = new District('Merchant District')
const MISKATONIC_UNIVERSITY = new District('Miskatonic University')
const FRENCH_HILL = new District('French Hill')
const UPTOWN = new District('Uptown')
const SOUTHSIDE = new District('Southside')

const TRAIN_STATION = new Place('Train Station', NORTHSIDE, false)
const NEWSPAPER = new Place('Newspaper', NORTHSIDE, false)
const CURIOSITY_SHOPPE = new Place('Curiosity Shoppe', NORTHSIDE, false)

const start = (width, height) => {
    core.resize(width, height)
    core.initListeners()
    core.start()
}
const createDragger = () =>{
    let currentRect = null
    
    let dragger = new Utils.Dragger(core,
        (mouseX,mouseY)=>{
            currentRect = Utils.createRectangle(mouseX,mouseY,0,0)
            core.addItem(currentRect)
        },
        (mouseX,mouseY)=>{
            let x = currentRect.geometry.getX()
            let y = currentRect.geometry.getY()
            currentRect.geometry.setSize(mouseX - x , mouseY - y)
        },
        (mouseX,mouseY)=>{
            let x = currentRect.geometry.getX()
            let y = currentRect.geometry.getY()
            currentRect.geometry.setSize(mouseX - x , mouseY - y)
            console.log('rect', x, y, mouseX - x , mouseY - y)
        }
    )
    dragger.hide()
    dragger.activate()

    core.addItem(dragger)
}

const loadData = () => {
    
    let dmap = districts.map(district => {
        console.log('Load district',district)
        return [district.id, new District(district.name)]
    })

    const districtLookup = new Map(dmap)

    let pmap = places.map(place=>{
        console.log('Load place',place)
        let placeData = new Place(place.name, districtLookup.get(place.district), place.unstable)
        let placeItem = Utils.createRectangle(place.x , place.y , place.w , place.h)
        placeItem.data = placeData
        placeItem.activate()
        core.addItem(placeItem)
        
        return [place.id, placeData]
    })

    const placesLookup = new Map(pmap)

    console.log(placesLookup)

    roads.forEach(road => {
        console.log('Load road',road)
        let source = placesLookup.get(road.source)
        let destination = placesLookup.get(road.destination)
        console.log('Connect',source,destination)
        source.addRoad(destination, road.color)
    })

    console.log(placesLookup)
    
    createDragger()
}


const launch = (containerId, width, height) =>{
    console.log('arkham')
    core.setup(containerId, width, height)

    let p = Utils.loadImage('static/board.jpg')

    p.then(img => {
        let width = img.geometry.getWidth()
        let height = img.geometry.getHeight()
      
        core.addItem(img)
        img.activate()

        loadData()
        start(width, height)
    })

}