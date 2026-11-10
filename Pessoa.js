class Pessoa {
    nome;
    #matricula;
  
    constructor(nome, matricula) {
      if (!nome) {
        throw new Error("O nome é obrigatório.");
      }
  
      if (!matricula) {
        throw new Error("A matrícula é obrigatória.");
      }
  
      this.nome = nome;
      this.#matricula = matricula;
    }
  
    get getMatricula() {
      return this.#matricula;
    }
  }
  