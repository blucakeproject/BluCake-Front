export interface ReceitaDTO {
   
    receita_id: String;
    nome: String;
    descricao: String;
    preco: String;
    imagem: String;
    dataCadastro: String;
    ativo: String;
    ingredientes: [];
    usuarioId: String
}