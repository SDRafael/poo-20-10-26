let turma = [];

function salvar() {
    const nome = document.getElementById('nome').value.trim();

  const matricula = document.getElementById('matricula').value.trim();

  const n1 = document.getElementById('n1').value;
  const n2 = document.getElementById('n2').value;
  const n3 = document.getElementById('n3').value;

  // Verifica campos obrigatórios
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
    alert("As notas devem ser números entre 0 e 10.");
    return;
  }

  // Verifica se a matrícula já existe
  const matriculaExiste = turma.some(aluno =>
    aluno.getMatricula === matricula
  );

  if (matriculaExiste) {
    alert("Já existe um aluno com essa matrícula.");
    return;
  }

  try {
    // Instancia o objeto Aluno
    const a1 = new Aluno(
      nome,
      matricula,
      nota1,
      nota2,
      nota3
    );

    // Calcula média e situação
    const media = a1.gerarMedia();

    a1.gerarEstado(media);

    turma.push(a1);

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
  let lista = ' ';
  for (let i = 0; i < turma.length; i++) {
    lista =
      lista +
      'Nome: ' +
      turma[i].nome +
      ' - Matrícula: ' +
      turma[i].getMatricula +
      ' - Média: ' +
      turma[i].getMedia.toFixed(2) +
      ' - Nota 1: ' +
      turma[i].getNota1 +
      ' - Nota 2: ' +
      turma[i].getNota2 +
      ' - Nota 3: ' +
      turma[i].getNota3 +
      ' - Situação: ' +
      turma[i].estado +
      
      '<br>';
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
