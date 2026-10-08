const p = document.getElementById("p-skills");
const icone = document.getElementById("skill-icone");
const nome = document.getElementById("skill-nome");

const textos = {
    inp1: "Domínio de sistemas de layout modernos e posicionamento de elementos (CSS Grid, Flexbox, propriedades display como block, inline-block e elementos fixed). <br><br> Utilização estruturada de tags semânticas (header, main, footer, entre outras) para melhorar a acessibilidade, a legibilidade do código e o SEO da página. <br><br> Aplicação de pseudo-classes e pseudo-elementos para estilizar componentes de acordo com a interação do usuário e estados específicos dos elementos. <br><br> Criação de transições fluidas e aplicação de técnicas de estilização para enriquecer a experiência visual da interface. <br><br> Capacidade de escrever códigos limpos, modulares e focados na manutenibilidade e adaptação de layouts.",
    inp2: "Lógica e Fundamentos de Programação: Domínio de variáveis, tipos de dados e operadores lógicos para a construção de uma base sólida em desenvolvimento de software. <br><br> Controle de Fluxo e Iteração: Utilização eficiente de estruturas condicionais e de repetição para o gerenciamento do fluxo de execução e automação de tarefas.<br><br> Manipulação do DOM (Document Object Model): Capacidade de interagir dinamicamente com a página web, alterando estruturas, conteúdos e estilos via código.<br><br> Gestão de Eventos e Dinamismo: Implementação de interações baseadas em ações do usuário (como cliques e entradas de dados) para enriquecer a experiência na interface.<br><br> Resolução de Algoritmos e Problemas Básicos: Aplicação prática dos conceitos fundamentais para criar scripts funcionais e resolver desafios lógicos essenciais.",
    inp3: "Fundamentos e Sintaxe de C#: Domínio da lógica essencial, tipagem e sintaxe da linguagem para a construção de códigos estruturados.<br><br> Controle de Fluxo e Iteração: Utilização eficiente de estruturas condicionais e de repetição para gerenciar a lógica de execução dos programas. <br><br> Desenvolvimento de Aplicações Desktop: Criação de interfaces gráficas funcionais para o sistema Windows utilizando Windows Forms. <br><br> Resolução de Algoritmos Básicos: Capacidade de traduzir problemas em soluções lógicas utilizando os conceitos fundamentais do C#. <br><br> Estruturação e Automação de Tarefas: Aplicação de conceitos fundamentais para escrever códigos orientados à resolução de problemas práticos.",
    inp4: "Consultas e Recuperação de Dados: Domínio da construção de comandos de extração de informações utilizando a clásula SELECT e filtragem com WHERE.<br><br> Relacionamentos e Junções: Capacidade de associar dados de múltiplas tabelas utilizando diferentes tipos de JOIN.<br><br> Agrupamento e Ordenação: Utilização eficiente de GROUP BY, HAVING e ORDER BY para organizar e refinar o conjunto de resultados.<br><br> Funções de Agregação: Aplicação de funções estatísticas e matemáticas como AVG, MAX, MIN e SUM para análise de dados.<br><br> Manipulação e Consulta de Bancos Relacionais: Compreensão sólida da lógica de banco de dados para estruturar consultas precisas e eficientes."
};

const imagens = {
    inp1: { icone: "img/html-5-logo-svgrepo-com 1.png", nome: "img/HTML.png",       alt: "HTML" },
    inp2: { icone: "img/javascript-icon~alt 1.png",     alt: "JavaScript" },
    inp3: { icone: "img/icons8-c-sharp-logo 1.png",     alt: "C#" },
    inp4: { icone: "img/svgviewer-output 1.png",        nome: "img/SQL.png",        alt: "SQL" }
};

document.querySelectorAll('input[name="inp"]').forEach(function (radio) {
    radio.addEventListener("change", function () {
        p.innerHTML = textos[radio.id];

        const img = imagens[radio.id];
        icone.src = img.icone;
        icone.alt = "ícone " + img.alt;

        if (img.nome) {
            nome.src = img.nome;
            nome.alt = "texto escrito '" + img.alt + "'";
            nome.hidden = false;
        } else {
            nome.hidden = true;
        }
    });
});