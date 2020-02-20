let apps = [
    'plague'
    , 'maze' 
    //,'rockets' 
    //,'tetris' 
    //,'balls'
    //,'bezier'
]

let buttonsContainer = document.querySelector('#buttons')
    
apps.forEach(app => {
    let button = document.createElement('button')
    
    button.addEventListener('click', event => {
        let container = document.querySelector('#container')
        while(container.firstChild){
            container.removeChild(container.lastChild)
        }
        
        import('./modules/'+app+'.js').then(module=>{
            module.default('#container', 640, 360)
        }).catch(err => {
            console.log(err)
        })
    })

    let text = document.createTextNode(app)
    button.appendChild(text)

    buttonsContainer.appendChild(button)
})