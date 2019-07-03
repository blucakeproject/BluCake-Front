import { IngredienteDTO } from './ingredienteDTO';
import { UsuarioDTO } from './usuarioDTO';

export interface ReceitaDTO {

    id: String;
    nome: String;
    descricao: String;
    preco: String;
    imagem: String;
    dataCadastro: String;
    ativo: String;
    ingredienteReceitas: IngredienteDTO[];
    usuario: UsuarioDTO;
    classificacao: any[];
}
