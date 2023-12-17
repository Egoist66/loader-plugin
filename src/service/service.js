import DOM from  "./DOM";
import byteSize from "byte-size";



class AppService {

    static files = [];



    static init(storage = "", ref, uploadBytes, getDownloadURL, listAll){
        
        function TriggerInput(selector, event){

            DOM.hookRefState(selector, event, (e) => {
                DOM.ref("#file").click();
            })

        }

        TriggerInput(".open-btn", "click");


        function changeTrigger(selector, event){

            DOM.hookRefState(selector, event, (e) => {
                console.log(e)

                DOM.ref(".preview-img").innerHTML = '';
                
                DOM.ref(".load-btn").style.display = "inline";

                AppService.files = Array.from(e.target.files);

                if(!AppService.files.length){
                    return;
                }

                AppService.files.forEach(file => {
                    if(!file.type.match('image')){
                        throw new Error("Forbidden file type");
                    }

                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const {result} = e.target;

                        

                        DOM.renderElement(`

                            <div class="preview-img-block">
                                <button data-name=${file.name} class="preview-remove">&times;</button>
                                <img class="preview" src="${result}" alt="${file.name}">
                                <div class="preview-info">
                                    <span>${file.name}</span>
                                    <span>${byteSize(file.size)}</span>
                                
                                </div>  

                            </div>
                        
                        `, ".preview-img", "afterbegin")

                        
                        
                        
                    }

                    reader.readAsDataURL(file)

                    

                })
                
                
            })
        }

        changeTrigger("#file", "change");


        function removeTrigger(selector, event){

            DOM.hookRefState(selector, event, (e) => {
                if(!e.target.dataset.name){
                    return;
                }

                const {name} = e.target.dataset;

                AppService.files = AppService.files.filter(file => {
                    return file.name !== name;
                });

                if(!AppService.files.length){
                    DOM.ref(".load-btn").style.display = "none";
                }

                const block = DOM.ref(`[data-name="${name}"`).closest(".preview-img-block");
                block.className += "removing";

                setTimeout(() => {
                    block.remove();
                    console.log(AppService.files)
                }, 300);


                

                
            })
        }
        removeTrigger(".preview-img", "click");


        function DeployConfig(){

            
            DOM.hookRefState(".load-btn", "click", (e) => {

                if(DOM.ref('.preview-remove')){

                    if(DOM.ref('.preview-remove').length > 1){
                        DOM.ref('.preview-remove').forEach(item => {
                            item.remove();
                        })
                    }
                    else {
                        DOM.ref('.preview-remove').remove();
                        
                    }
                }
               
                if(DOM.ref(".preview-info")){
                    
                    if(DOM.ref('.preview-info').length > 1){
                        DOM.ref(".preview-info").forEach(item => {
                            item.style.bottom = "0px";
                            item.innerHTML = `<div class="preview-info-progress"></div>`
                        })
                    }
                    else {
                        DOM.ref(".preview-info").style.bottom = "0px";
                        DOM.ref(".preview-info").innerHTML = `<div class="preview-info-progress"></div>`;
                    }
                }

                console.log(AppService.files)

                AppService.files.forEach((file, i) => {
                    const imgRef = ref(storage, `images/${file.name}`);
                    
                    // uploadBytes(imgRef, file).then((data) => {
                    //     console.log(`File ${file.name} is uploaded!`);
                    // });

                    const task = uploadBytes(imgRef, file);
                    task.on('state_changed', (data) => {

                        const percentage = Math.round((data.bytesTransferred / data.totalBytes) * 100);
                       
                        try {

                            document.querySelectorAll('.preview-info-progress')[i].style.cssText = `width: ${percentage}%`;
                            document.querySelectorAll('.preview-info-progress')[i].textContent = `${percentage}%`;
                        }
                        catch(e){
                            console.log(e);
                        }

                    }, error => {
                        console.log(error)
                    }, () => {
                        
                        console.log(file.name, "Loading is completed");
                            
                        getDownloadURL(ref(storage, `images/${file.name}`))
                        .then((url) => {
                            
                            DOM.renderElement(`

                                <div class="download-img">
                                
                                    <span>Download:</span>
                                    <a href="${url}" download >${file.name}</a>
                                
                                </div>
                            
                            `, ".download-block", "beforeend");
                            
                        })
                        .catch((error) => {
                            console.log(error)
                        });
                    })

                    
                })
                
            })
        }

        DeployConfig()

       


    
    }

  
    
}




export default AppService