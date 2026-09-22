function altCores(){
    var inp = document.getElementById("inp-cor")
    var root = document.documentElement
    var logo = document.getElementById("logo")

    root.classList.add("modo-claro")
    root.classList.toggle("modo-escuro", inp.checked)
    logo.style.opacity = 0

    setTimeout(() => {
        if(inp.checked){
            root.style.setProperty("--cor-fundo", "#151919")
            root.style.setProperty("--verde-claro", "#2B4242")
            logo.src = "img/logo escura.svg"
        }
        else{
            root.style.setProperty("--cor-fundo", "#2B4242")
            root.style.setProperty("--verde-claro", "#3f8585")
            logo.src = "img/logo clara.svg"
        }
        logo.style.opacity = 1
    }, 200)
}