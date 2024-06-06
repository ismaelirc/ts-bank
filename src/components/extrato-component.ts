import Conta from "../types/Conta.js";
import { FormatoData } from "../types/FormatoData.js";
import { GrupoTransacao } from "../types/GrupoTransacao.js";
import { formatarData, formatarMoeda } from "../utils/formaters.js";

const elementoRegistroTransacoesExtrado: HTMLElement = document.querySelector(".extrato .registro-transacoes");

renderizarExtrato();

function renderizarExtrato(): void{
    const gruposTransacoes: GrupoTransacao[] = Conta.getGruposTransacoes();

    elementoRegistroTransacoesExtrado.innerHTML = '';
    let htmlRegistroTransacoes: string = "";

    for (let grupoTransacoes of gruposTransacoes){
            let htmlTransacaoItem: string = "";
            for (let transacao of grupoTransacoes.transacoes)
            {
                htmlTransacaoItem += `
                    <div class="transacao-item">
                        <div class="transacao-info">
                            <span class="tipo">${transacao.tipoTransacao}</span>
                            <strong class="valor">${formatarMoeda(transacao.valor)}</strong>
                    </div>
                    <time class="data">${formatarData(transacao.data, FormatoData.DIA_MES)}</time>
                </div>
                `;
            }

            htmlRegistroTransacoes += `
                <div class="transacoes-group">
                    <strong class="mes-group">${grupoTransacoes.label}</strong>
                    ${htmlTransacaoItem}
                </div>
            `;

    }
    if(htmlRegistroTransacoes == ''){
        htmlRegistroTransacoes = '<div>Não existem transações registradas</div>';
    }

    elementoRegistroTransacoesExtrado.innerHTML = htmlRegistroTransacoes;
}

const ExtratoComponent = {
    atualizar(): void{
        renderizarExtrato();
    }
}

export default ExtratoComponent;