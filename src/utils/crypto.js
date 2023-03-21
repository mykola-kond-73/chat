const crypt=(payload)=>{
    return window.btoa(payload)
}

const decrypt=(payload)=>{
    return window.atob(payload)
}

export{
    crypt,
    decrypt
}