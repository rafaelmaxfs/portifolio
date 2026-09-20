function altCores(){
    var inp = document.getElementById("inp-cor")
    var root = document.documentElement
    var logo = document.getElementById("logo")
    root.classList.add("modo-claro")
    root.classList.toggle("modo-escuro", inp.checked)
    if(inp.checked){
        root.style.setProperty("--cor-fundo", "#151919")
        root.style.setProperty("--verde-claro", "#2B4242")
        logo.src = "img/logo escura.png"
    }
    else{
        root.style.setProperty("--cor-fundo", "#2B4242")
        root.style.setProperty("--verde-claro", "#3f8585")
        logo.src = "img/logo clara.png"
    }
}