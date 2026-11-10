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

    // Adiciona o aluno à turma
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

    // Cria a turma
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
function cadastrar() {
  const btnCadastrar = document.getElementById('btn-cadastrar');
  const tabCadastrar = document.getElementById('tab-cadastrar');

  const btnListar = document.getElementById('btn-listar');
  const tabListar = document.getElementById('tab-listar');

  // Ativa o botão de cadastro
  btnCadastrar.classList.add('active');
  btnListar.classList.remove('active');

  // Exibe o conteúdo de cadastro
  tabCadastrar.classList.add('active');
  tabListar.classList.remove('active');
}
function listar() {
  const btnCadastrar = document.getElementById('btn-cadastrar');
  const tabCadastrar = document.getElementById('tab-cadastrar');
  const btnListar = document.getElementById('btn-listar');
  const tabListar = document.getElementById('tab-listar');

  btnListar.classList.add('active');
  btnCadastrar.classList.remove('active');

  tabListar.classList.add('active');
  tabCadastrar.classList.remove('active');

  atualizarLista();
}

function atualizarLista() {
  const lista = document.getElementById('alunos');

  const filtroTurma = document.getElementById('filtroTurma').value;
  const filtro = document.getElementById('filtroAlunos').value;

  // Limpa a listagem anterior
  lista.replaceChildren();

  // Verifica se existem turmas
  if (turmas.length === 0) {
    const item = document.createElement('li');
    item.textContent = "Nenhuma turma cadastrada.";
    lista.appendChild(item);
    return;
  }

  // Percorre as turmas
  turmas.forEach((turma, index) => {

    // Verifica se a turma deve ser exibida
    if (filtroTurma !== "todas" &&
        Number(filtroTurma) !== index) {
      return;
    }

    // Recupera os alunos da turma
    let alunos = [...turma.listarAlunos()];

    // Aplica o filtro selecionado
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

    // Cria o título da turma
    const itemTurma = document.createElement('li');

    const titulo = document.createElement('strong');
    titulo.textContent = "Curso: " + turma.nomeCurso;

    itemTurma.appendChild(titulo);
    itemTurma.appendChild(document.createElement('br'));

    const professor = document.createElement('span');
    professor.textContent =
      "Professor: " + turma.professor.nome;

    itemTurma.appendChild(professor);

    // Cria uma lista interna de alunos
    const listaInterna = document.createElement('ul');

    if (alunos.length === 0) {
      const vazio = document.createElement('li');
      vazio.textContent = "Nenhum aluno encontrado.";
      listaInterna.appendChild(vazio);
    }

    alunos.forEach(aluno => {
      const itemAluno = document.createElement('li');

      itemAluno.textContent =
        "Nome: " + aluno.nome +
        " - Matrícula: " + aluno.getMatricula +
        " - Média: " + aluno.getMedia.toFixed(2) +
        " - Nota 1: " + aluno.getNota1 +
        " - Nota 2: " + aluno.getNota2 +
        " - Nota 3: " + aluno.getNota3 +
        " - Situação: " + aluno.estado;

      listaInterna.appendChild(itemAluno);
    });

    itemTurma.appendChild(listaInterna);
    lista.appendChild(itemTurma);
  });
}

function atualizarSelectTurmas() {
  // Seletor utilizado no cadastro de alunos
  const selectCadastro = document.getElementById('turmaAluno');

  // Seletor utilizado na listagem
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
    // Opção para o cadastro
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

