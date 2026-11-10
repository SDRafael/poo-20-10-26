class Pessoa {
    nome;
    #matricula;
  
    constructor(nome, matricula) {
      if (!nome || !nome.trim()) {
        throw new Error("O nome é obrigatório.");
      }
  
      if (!matricula || !matricula.trim()) {
        throw new Error("A matrícula é obrigatória.");
      }
  
      this.nome = nome.trim();
      this.#matricula = matricula.trim();
    }
  
    get getMatricula() {
      return this.#matricula;
    }
  }
  