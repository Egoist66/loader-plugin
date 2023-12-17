
function FileLoader(isMultiple = null, data){


    return (

        `
        
            <span class="file-loader">
            
                <input ${isMultiple} accept="${data.join(",")}" type="file" name="file" id="file" />

            </span>            
            
        `
    )
}





export default FileLoader