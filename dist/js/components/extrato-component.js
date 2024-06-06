import Conta from "../types/Conta.js";
import { FormatoData } from "../types/FormatoData.js";
import { formatarData, formatarMoeda } from "../utils/formaters.js";
const elementoRegistroTransacoesExtrado = document.querySelector(".extrato .registro-transacoes");
renderizarExtrato();
function renderizarExtrato() {
    const gruposTransacoes = Conta.getGruposTransacoes();
    elementoRegistroTransacoesExtrado.innerHTML = '';
    let htmlRegistroTransacoes = "";
    for (let grupoTransacoes of gruposTransacoes) {
        let htmlTransacaoItem = "";
        for (let transacao of grupoTransacoes.transacoes) {
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
    if (htmlRegistroTransacoes == '') {
        htmlRegistroTransacoes = '<div>Não existem transações registradas</div>';
    }
    elementoRegistroTransacoesExtrado.innerHTML = htmlRegistroTransacoes;
}
const ExtratoComponent = {
    atualizar() {
        renderizarExtrato();
    }
};
export default ExtratoComponent;
