/* Variables globales */
var $green = document.getElementById('green')
var $red = document.getElementById('red')
var $yellow = document.getElementById('yellow')
var $cyan = document.getElementById('cyan')
var $btnJuego = document.getElementById('button-juego')
var $level = document.getElementById('level')
const MAX_LEVEL = 10


class juego{

    constructor(){
        this.seleccionarColor = this.seleccionarColor.bind(this)
        this.nextLevel = this.nextLevel.bind(this)
        
        
        this.generarSecuencia()
        this.colors = [$green, $red, $yellow, $cyan]
               
        this.inicializar()
        
        setTimeout(() => this.nextLevel() ,500)
    }

    inicializar(){
        
        this.level = 1
        $level.innerText = this.level
        $btnJuego.classList.toggle('hide')

        
    }

    nextLevel(){
        this.apagarEventos()
        $level.innerText = this.level
        this.subLevel = 0
        this.encenderSecuencia(() => this.encenderEventos())
        
        
        
    }

       
    seleccionarColor(e){
        const colorClickado = e.target.dataset.color
        this.encenderColor(colorClickado,200)
        if(colorClickado == this.secuencia[this.subLevel]){
            
            this.subLevel++

            if(this.subLevel == this.level){
                this.apagarEventos()
                this.level++

                if(this.level == (MAX_LEVEL + 1)){
                    this.winGame()
                }
                else{
                    this.apagarEventos()
                    this.winLevel()
                }
            }

        }
        else{
             this.apagarEventos()
             this.gameLose()
        }
    }

    winGame(){
        setTimeout(() =>{
            Swal({
                title: 'HAS GANADO!!',
                text: 'Felicitaciones.',
                type: 'success',
                confirmButtonText: 'ok',
                onClose: () => {
                    setTimeout(this.inicializar,300)}
              })
        }, 500)
        
    }

    gameLose(){
        setTimeout(() => {
            Swal({
                title: 'Has perdido!',
                text: 'Intentalo nuevamente!',
                type: 'error',
                confirmButtonText: 'ok',
                onClose: () => {
                    setTimeout(this.inicializar,300)}
             })
        }, 500)
        
        
    }

    winLevel(){
        setTimeout(() => {
            Swal({
                title: 'Nivel superado!',
                text: 'Sigamos adelante.',
                type: 'success',
                confirmButtonText: 'ok',
                onClose: () => {
                    setTimeout(this.nextLevel,300)}
              })
        }, 500)

    }

    /**LOGICA DE SECUENCIAS */

    generarSecuencia(){
        this.secuencia = new Array(MAX_LEVEL).fill(0).map(() => Math.floor(Math.random() * 4))
            }
    
    encenderSecuencia(callback){
        
       for(let i=0; i < this.level; i++){
           var time = 1000 * i
            setTimeout( () => this.encenderColor(this.secuencia[i],),time)
        }
       setTimeout(() => callback(),time)

    }

    /**COLORES LOGICA DE ENCENDIDO Y APAGADO DE COLORES */
    
    encenderColor(color,time = 500){
        // console.log(this)
        this.colors[color].classList.add('light')

        setTimeout( () => this.apagarColor(color),time)
    
    }
       
    apagarColor(color){
        this.colors[color].classList.remove('light')
    }


    /**EVENTOS */

    encenderEventos(){
        // this.colors.forEach(item => item.addEventListener('click',this.seleccionarColor))
        // $green.addEventListener('click',this.encenderColor($green)))
        $green.addEventListener('click',this.seleccionarColor)
        $green.classList.add('pointer')
        // $cyan.addEventListener('click',this.encenderColor)
        $cyan.addEventListener('click',this.seleccionarColor)
        $cyan.classList.add('pointer')
        // $yellow.addEventListener('click',this.encenderColor)
        $yellow.addEventListener('click',this.seleccionarColor)
        $yellow.classList.add('pointer')
        // $red.addEventListener('click',this.encenderColor)
        $red.addEventListener('click',this.seleccionarColor)
        $red.classList.add('pointer')
    }

    apagarEventos(){
        // this.colors.forEach(item => item.removeEventListener('click',() => this.seleccionarColor()))
        $green.removeEventListener('click',this.seleccionarColor)
        $green.classList.remove('pointer')
        $cyan.removeEventListener('click',this.seleccionarColor)
        $cyan.classList.remove('pointer')
        $yellow.removeEventListener('click',this.seleccionarColor)
        $yellow.classList.remove('pointer')
        $red.removeEventListener('click',this.seleccionarColor)
        $red.classList.remove('pointer')
    }

}/**FIN DEL OBJETO JUEGO */

    function startGame(){
        window.game = new juego()
    }

    