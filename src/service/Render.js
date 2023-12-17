function Render({root, app}){

    this.render = function(){
        return document.querySelector(root).insertAdjacentHTML("beforeend", app)
    }
}

export default Render

