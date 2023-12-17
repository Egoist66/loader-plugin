
class DOM {

    static objectTree = []

    static createElement({element, alt = '', href = '', src = '',  className = '', html = '', parent, action = "append", id = '', textContent = ''}, position){
        const domObject =  {
            element,
            className,
            html,
            parent,
            id,
            src,
            href,
            alt,
            textContent
        }

        const domNode = document.createElement(domObject.element);
              domNode.className = domObject.className;
              domNode.id = domObject.id;
              domNode.src = domObject.src;
              domNode.href = domObject.href;
              domNode.alt = domObject.alt;
              domNode.textContent = domObject.textContent;
              domNode.insertAdjacentHTML("beforeend", domObject.html);

        DOM.objectTree.push(domObject);

    

        if(action === "append"){
            return document.querySelector(parent).append(domNode);
        }
        else {
            return document.querySelector(parent).insertAdjacentElement(position, domNode);
        }
    }

    static ref(node = DOM.objectTree?.element){

        let element = [] || "";
      
        if(node === document){
            element = node;
        }
        else if(node === window){
            element = node;
        }


        if(document.querySelectorAll(node).length > 1){
            
            element = document.querySelectorAll(node);
        }
        else {
            element = document.querySelector(node);
        }

        return element;
    }

    static remove(node = DOM.objectTree?.element){

        if(document.querySelector(node)){
            document.querySelector(node).remove();
            delete DOM.objectTree[0];
        }
        else {
            
            throw new Error("Impossible to remove dom node which does not exist");
            
        }
       
        if(document.querySelectorAll(node)){
            [...document.querySelectorAll(node)].forEach(item => {
                item.remove();
                DOM.objectTree = "";
            })

            
        }

      
    }

    static hookRefState(node = DOM.objectTree?.element, _event, handler = function(){}){
        if(DOM.ref(node).length > 1){
            DOM.ref(node).forEach(item => {
                item.addEventListener(_event, (e) => {
                    handler(e)
                })
            })
        }
        else {
            DOM.ref(node).addEventListener(_event, (e) => {
                handler(e)
            })
        }
    }

    static renderElement(element, parent, position){

        return DOM.ref(parent).insertAdjacentHTML(position, element)
    }
}

export default DOM


