let buttonListener = (event) => {
    let container = document.querySelector('#container')
    
    while(container.firstChild){
        container.removeChild(container.lastChild)
    }

    container.style.width = '0px'
    container.style.height = '0px'
    
    import('./modules/'+app+'.js').then(module=>{
        module.default('#container', 640, 360)
    }).catch(err => {
        console.log(err)
    })
}

let initButton = (app) => {
    let button = document.createElement('button')
    let text = document.createTextNode(app)
    button.appendChild(text)
    button.addEventListener('click', buttonListener)

    let buttonsContainer = document.querySelector('#buttons')
    buttonsContainer.appendChild(button)
}

let apps = [
    'plague'
    , 'maze' 
    //,'rockets' 
    //,'tetris' 
    //,'balls'
    //,'bezier'
]
apps.forEach(app => initButton)