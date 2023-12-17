function Button(classNames, name, hide){

    return (

        `
            <button style="display: ${hide ? "none" : "inline"}" class="${classNames.join(" ")}">${name}</button>
        `
    )
}

export default Button