import Button from "./Button"
import FileLoader from "./FileLoader"
import Preview from "./Preview"

function Card(){

    return (
        `

            <div class="card">

                ${FileLoader("multiple", [".png", ".jpg", ".jpeg", ".gif"])}
            
                ${Button(["btn", "open-btn"], "Открыть")}
                ${Button(["btn", "primary", "load-btn"], "Загрузить", true)}

                ${Preview()}
            
            </div>
        
        
        `
    )
}

export default Card