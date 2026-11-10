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

function listar() {
  const btnCadastrar = document.getElementById('btn-cadastrar');
  const tabCadastrar = document.getElementById('tab-cadastrar');
  const btnListar = document.getElementById('btn-listar');
  const tabListar = document.getElementById('tab-listar');

  btnListar.classList.add('active');
  btnCadastrar.classList.remove('active');

  // Ajusta o conteúdo visível
  tabListar.classList.add('active');
  tabCadastrar.classList.remove('active');
  let lista = "";

for (let i = 0; i < turmas.length; i++) {

  lista +=
    "<li><strong>Curso: " +
    turmas[i].nomeCurso +
    "</strong><br>";

  lista +=
    "Professor: " +
    turmas[i].professor.nome +
    "<br><br>";

  const alunos = turmas[i].listarAlunos();

  for (let j = 0; j < alunos.length; j++) {

    lista +=
      "Nome: " + alunos[j].nome +
      " - Matrícula: " + alunos[j].getMatricula +
      " - Média: " + alunos[j].getMedia.toFixed(2) +
      " - Nota 1: " + alunos[j].getNota1 +
      " - Nota 2: " + alunos[j].getNota2 +
      " - Nota 3: " + alunos[j].getNota3 +
      " - Situação: " + alunos[j].estado +
      "<br><br>";
  }

  lista += "</li>";
}

if (turmas.length === 0) {
  lista = "<li>Nenhuma turma cadastrada.</li>";
}

document.getElementById('alunos').innerHTML = lista;
}

function cadastrar() {
  const btnCadastrar = document.getElementById('btn-cadastrar');
  const tabCadastrar = document.getElementById('tab-cadastrar');
  const btnListar = document.getElementById('btn-listar');
  const tabListar = document.getElementById('tab-listar');

  btnListar.classList.remove('active');
  btnCadastrar.classList.add('active');

  // Ajusta o conteúdo visível
  tabListar.classList.remove('active');
  tabCadastrar.classList.add('active');
  //document.getElementById("media").innerHTML = m;
}


//função para atualizar o dropdown
function atualizarSelectTurmas() {
  const select = document.getElementById('turmaAluno');

  select.replaceChildren();

  if (turmas.length === 0) {
    const option = document.createElement('option');

    option.value = "";
    option.textContent = "Nenhuma turma cadastrada";

    select.appendChild(option);

    return;
  }

  const primeiraOpcao = document.createElement('option');

  primeiraOpcao.value = "";
  primeiraOpcao.textContent = "Selecione uma turma";

  select.appendChild(primeiraOpcao);

  turmas.forEach((turma, index) => {
    const option = document.createElement('option');

    option.value = index;

    option.textContent =
      turma.nomeCurso + " - " +
      turma.professor.nome;

    select.appendChild(option);
  });
}
