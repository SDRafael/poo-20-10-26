class Turma {
    nomeCurso;
    professor;
    alunos;
  
    constructor(nomeCurso, professor) {
      if (!nomeCurso || !nomeCurso.trim()) {
        throw new Error("O nome do curso é obrigatório.");
      }
  
      if (!(professor instanceof Professor)) {
        throw new Error("Professor inválido.");
      }
  
      this.nomeCurso = nomeCurso.trim();
      this.professor = professor;
      this.alunos = [];
    }
  
    adicionarAluno(aluno) {
      if (!(aluno instanceof Aluno)) {
        throw new Error("Aluno inválido.");
      }
  
      // Verifica matrícula duplicada na turma
      const existe = this.alunos.some(
        item => item.getMatricula === aluno.getMatricula
      );
  
      if (existe) {
        throw new Error("Aluno já cadastrado nesta turma.");
      }
  
      this.alunos.push(aluno);
    }
  
    listarAlunos() {
      return this.alunos;
    }
  }
  