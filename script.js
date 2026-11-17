let turmas = [];
let professores = [];

function salvar() {
  const nome = document.getElementById('nome').value.trim();

  const matricula = document.getElementById('matricula').value.trim();

  const turmaSelecionada = document.getElementById('turmaAluno').value;

  const n1 = document.getElementById('n1').value;
  const n2 = document.getElementById('n2').value;
  const n3 = document.getElementById('n3').value;

  // Verifica se existem turmas
  if (turmas.length === 0) {
    alert("Cadastre uma turma antes de cadastrar alunos.");
    return;
  }

  if (turmaSelecionada === "") {
    alert("Selecione uma turma.");
    return;
  }

  if (!nome || !matricula || !n1 || !n2 || !n3) {
    alert("Preencha todos os campos.");
    return;
  }

  const nota1 = Number(n1);
  const nota2 = Number(n2);
  const nota3 = Number(n3);

  const notas = [nota1, nota2, nota3];

  if (notas.some(nota =>
    !Number.isFinite(nota) || nota < 0 || nota > 10
  )) {
    alert("As notas devem estar entre 0 e 10.");
    return;
  }

  // Verifica matrícula em todas as turmas
  const matriculaExiste = turmas.some(turma =>
    turma.alunos.some(aluno =>
      aluno.getMatricula === matricula
    )
  );

  if (matriculaExiste) {
    alert("Já existe um aluno com essa matrícula.");
    return;
  }

  try {
    const aluno = new Aluno(
      nome,
      matricula,
      nota1,
      nota2,
      nota3
    );

    const media = aluno.gerarMedia();

    aluno.gerarEstado(media);

    // Recupera a turma selecionada
    const turma = turmas[Number(turmaSelecionada)];

    turma.adicionarAluno(aluno);

    alert("Aluno cadastrado com sucesso!");

    document.getElementById('nome').value = "";
    document.getElementById('matricula').value = "";
    document.getElementById('n1').value = "";
    document.getElementById('n2').value = "";
    document.getElementById('n3').value = "";

  } catch (erro) {
    alert(erro.message);
  }
}

function salvarTurma() {
  const nomeCurso = document.getElementById('nomeCurso').value.trim();

  const nomeProfessor = document.getElementById('nomeProfessor').value.trim();

  const matriculaProfessor = document.getElementById('matriculaProfessor').value.trim();

  if (!nomeCurso || !nomeProfessor || !matriculaProfessor) {
    alert("Preencha todos os campos da turma.");
    return;
  }

  try {
    // Procura um professor já cadastrado
    let professor = professores.find(
      p => p.getMatricula === matriculaProfessor
    );

    if (!professor) {
      professor = new Professor(
        nomeProfessor,
        matriculaProfessor
      );

      professores.push(professor);
    }

    const novaTurma = new Turma(
      nomeCurso,
      professor
    );

    turmas.push(novaTurma);

    atualizarSelectTurmas();

    alert("Turma cadastrada com sucesso!");

    document.getElementById('nomeCurso').value = "";
    document.getElementById('nomeProfessor').value = "";
    document.getElementById('matriculaProfessor').value = "";

  } catch (erro) {
    alert(erro.message);
  }
}
function cadastrarTurma() {
  const btnCadastrarTurma = document.getElementById('btn-cadastrarTurma');
  const btnCadastrarAluno = document.getElementById('btn-cadastrarAluno');

  const tabCadastrarTurma = document.getElementById('tab-cadastrarTurma');
  const tabCadastrarAluno = document.getElementById('tab-cadastrarAluno');
  

  const btnListar = document.getElementById('btn-listar');
  const tabListar = document.getElementById('tab-listar');

  // Ativa o botão de cadastro
  btnCadastrarTurma.classList.add('active');
  btnListar.classList.remove('active');
  btnCadastrarAluno.classList.remove('active');

  // Exibe o conteúdo de cadastro
  tabCadastrarTurma.classList.add('active');
  tabCadastrarAluno.classList.remove('active');
  tabListar.classList.remove('active');
}
function cadastrarAluno() {
  const btnCadastrarTurma = document.getElementById('btn-cadastrarTurma');
  const btnCadastrarAluno = document.getElementById('btn-cadastrarAluno');

  const tabCadastrarTurma = document.getElementById('tab-cadastrarTurma');
  const tabCadastrarAluno = document.getElementById('tab-cadastrarAluno');


  const btnListar = document.getElementById('btn-listar');
  const tabListar = document.getElementById('tab-listar');

  // Ativa o botão de cadastro
  btnCadastrarAluno.classList.add('active');
  btnListar.classList.remove('active');
  btnCadastrarTurma.classList.remove('active');

  // Exibe o conteúdo de cadastro
  tabCadastrarAluno.classList.add('active');
  tabCadastrarTurma.classList.remove('active');
  tabListar.classList.remove('active');
}
function listar() {
  const btnCadastrarTurma = document.getElementById('btn-cadastrarTurma');
  const btnCadastrarAluno = document.getElementById('btn-cadastrarAluno');
  
  const tabCadastrarTurma = document.getElementById('tab-cadastrarTurma');
  const tabCadastrarAluno = document.getElementById('tab-cadastrarAluno');
  const btnListar = document.getElementById('btn-listar');
  const tabListar = document.getElementById('tab-listar');

  btnListar.classList.add('active');
  btnCadastrarTurma.classList.remove('active');
  btnCadastrarAluno.classList.remove('active');

  tabListar.classList.add('active');
  tabCadastrarTurma.classList.remove('active');
  tabCadastrarAluno.classList.remove('active');

  atualizarLista();
}


function atualizarLista() {
  const listaTurmas = document.getElementById('listaTurmas');

  const filtroTurma = document.getElementById('filtroTurma').value;
  const filtro = document.getElementById('filtroAlunos').value;

  // Limpa as tabelas anteriores
  listaTurmas.replaceChildren();

  // Verifica se existem turmas cadastradas
  if (turmas.length === 0) {
    listaTurmas.textContent = "Nenhuma turma cadastrada.";
    return;
  }

  let encontrouTurma = false;

  // Percorre todas as turmas
  turmas.forEach((turma, index) => {

    // Aplica o filtro de turma
    if (
      filtroTurma !== "todas" &&
      Number(filtroTurma) !== index
    ) {
      return;
    }

    // Recupera os alunos da turma
    let alunos = [...turma.listarAlunos()];

    // Aplica os filtros dos alunos
    switch (filtro) {

      case "aprovados":
        alunos = alunos.filter(aluno =>
          aluno.estado === "Aprovado"
        );
        break;

      case "reprovados":
        alunos = alunos.filter(aluno =>
          aluno.estado === "Reprovado"
        );
        break;

      case "recuperacao":
        alunos = alunos.filter(aluno =>
          aluno.estado === "Recuperação"
        );
        break;

      case "alfabetica":
        alunos.sort((a, b) =>
          a.nome.localeCompare(b.nome, 'pt-BR')
        );
        break;

      case "maiorMedia":
        alunos.sort((a, b) =>
          b.getMedia - a.getMedia
        );
        break;

      case "menorMedia":
        alunos.sort((a, b) =>
          a.getMedia - b.getMedia
        );
        break;
    }

    encontrouTurma = true;

    // =====================================
    // CRIA O CONTAINER DE CADA TURMA
    // =====================================

    const container = document.createElement('div');
    container.classList.add('turma-card');

    // Título da turma
    const titulo = document.createElement('h3');
    titulo.textContent = turma.nomeCurso;

    // Nome do professor
    const professor = document.createElement('p');
    professor.classList.add('professor-turma');
    professor.textContent =
      "Professor: " + turma.professor.nome;

    container.appendChild(titulo);
    container.appendChild(professor);

    // =====================================
    // CRIA UMA TABELA PARA CADA TURMA
    // =====================================

    const tabelaContainer = document.createElement('div');
    tabelaContainer.classList.add('tabela-container');

    const tabela = document.createElement('table');
    tabela.classList.add('tabela-alunos');

    // Cabeçalho
    const cabecalho = document.createElement('thead');
    const linhaCabecalho = document.createElement('tr');

    const colunas = [
      "Nome",
      "Matrícula",
      "Nota 1",
      "Nota 2",
      "Nota 3",
      "Média",
      "Situação"
    ];

    colunas.forEach(coluna => {
      const th = document.createElement('th');
      th.textContent = coluna;
      linhaCabecalho.appendChild(th);
    });

    cabecalho.appendChild(linhaCabecalho);
    tabela.appendChild(cabecalho);

    // Corpo da tabela
    const corpo = document.createElement('tbody');

    if (alunos.length === 0) {
      const linha = document.createElement('tr');
      const celula = document.createElement('td');

      celula.colSpan = 7;
      celula.textContent = "Nenhum aluno encontrado.";
      celula.style.textAlign = "center";

      linha.appendChild(celula);
      corpo.appendChild(linha);

    } else {

      alunos.forEach(aluno => {

        const linha = document.createElement('tr');

        const dados = [
          aluno.nome,
          aluno.getMatricula,
          aluno.getNota1,
          aluno.getNota2,
          aluno.getNota3,
          Number(aluno.getMedia).toFixed(2),
          aluno.estado
        ];

        dados.forEach((dado, indice) => {

          const td = document.createElement('td');
          td.textContent = dado;

          // Colore a situação do aluno
          if (indice === 6) {
            if (aluno.estado === "Aprovado") {
              td.classList.add('aprovado');

            } else if (aluno.estado === "Reprovado") {
              td.classList.add('reprovado');

            } else if (aluno.estado === "Recuperação") {
              td.classList.add('recuperacao');
            }
          }

          linha.appendChild(td);
        });

        corpo.appendChild(linha);
      });
    }

    tabela.appendChild(corpo);

    tabelaContainer.appendChild(tabela);
    container.appendChild(tabelaContainer);

    // Adiciona a tabela da turma à página
    listaTurmas.appendChild(container);
  });

  // Caso nenhuma turma corresponda ao filtro
  if (!encontrouTurma) {
    listaTurmas.textContent = "Nenhuma turma encontrada.";
  }
}


function atualizarSelectTurmas() {
  const selectCadastro = document.getElementById('turmaAluno');

  const selectLista = document.getElementById('filtroTurma');

  // Atualiza o seletor de cadastro
  selectCadastro.replaceChildren();

  const opcaoCadastro = document.createElement('option');
  opcaoCadastro.value = "";
  opcaoCadastro.textContent = turmas.length === 0
    ? "Nenhuma turma cadastrada"
    : "Selecione uma turma";

  selectCadastro.appendChild(opcaoCadastro);

  // Atualiza o seletor de listagem
  const valorAnterior = selectLista.value;

  selectLista.replaceChildren();

  const opcaoTodas = document.createElement('option');
  opcaoTodas.value = "todas";
  opcaoTodas.textContent = "Todas as turmas";

  selectLista.appendChild(opcaoTodas);

  turmas.forEach((turma, index) => {
    const opcaoCadastro = document.createElement('option');

    opcaoCadastro.value = index;
    opcaoCadastro.textContent =
      turma.nomeCurso + " - " + turma.professor.nome;

    selectCadastro.appendChild(opcaoCadastro);

    // Opção para a listagem
    const opcaoLista = document.createElement('option');

    opcaoLista.value = index;
    opcaoLista.textContent =
      turma.nomeCurso + " - " + turma.professor.nome;

    selectLista.appendChild(opcaoLista);
  });

  // Mantém a seleção anterior, se ela ainda existir
  if ([...selectLista.options].some(
    option => option.value === valorAnterior
  )) {
    selectLista.value = valorAnterior;
  }
}

