export interface ReceitaDTO {

    id: String;
    nome: String;
    descricao: String;
    preco: String;
    imagem: String;
    dataCadastro: String;
    ativo: String;
    ingredienteReceitas: any[];
    usuarioId: number;
    classificacao: any[];
}
