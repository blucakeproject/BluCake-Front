import { IngredienteDTO } from './ingredienteDTO';

export interface ReceitaDTO {

    id: String;
    nome: String;
    descricao: String;
    preco: String;
    imagem: String;
    dataCadastro: String;
    ativo: String;
    ingredienteReceitas: IngredienteDTO[];
    usuarioId: number;
    classificacao: any[];
}
