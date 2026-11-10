class Aluno extends Pessoa{

  #nota1;
  #nota2;
  #nota3;
  estado;
  #media;
  constructor(nome, primeiraNota, segundaNota, terceiraNota) {
    super(nome, matricula);
    
    this.setNota1 = primeiraNota;
    this.setNota2 = segundaNota
    this.setNota3 = terceiraNota;
  }
  get getNota1(){
    return this.#nota1;
  }
  get getNota2(){
    return this.#nota2;
  }
  get getNota3(){
    return this.#nota3;
  }
  get getMedia(){
    return this.#media;
  }
  
  set setNota1(nota){
    this.#nota1 = nota;
  }
  set setNota2(nota){
    this.#nota2 = nota;
  }
  set setNota3(nota){
    this.#nota3 = nota;
  }
  gerarMedia() {
    let m = (this.getNota1 + this.getNota2 + this.getNota3) / 3;
    this.#media = m;
    return m;
  }
  gerarEstado(media) {
    let est;
    if (media >= 6) {
      est = 'Aprovado';
    } else if (media >= 3) {
      est = 'Recuperação';
    } else {
      est = 'Reprovado';
    }
    this.estado = est;
    return est;
  }
}
