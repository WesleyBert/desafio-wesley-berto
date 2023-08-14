class CaixaDaLanchonete {
    constructor() {
        this.descontoDinheiro = 0.05;
        this.acrescimoCredito = 0.03;
        this.formasPagamento = ['credito', 'debito', 'dinheiro'];

        this.cardapio = [
            { id: 'cafe', descricao: 'Café', valor: 3.00 },
            { id: 'chantily', descricao: 'Chantily (extra do Café)', valor: 1.50 },
            { id: 'suco', descricao: 'Suco natural', valor: 6.20 },
            { id: 'sanduiche', descricao: 'Sanduíche', valor: 6.50 },
            { id: 'queijo', descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
            { id: 'salgado', descricao: 'Salgado', valor: 7.25 },
            { id: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            { id: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
        ];

        this.codigosValidos = this.cardapio.map(item => item.id);
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        const filterItens = itens.map(item => {
            const pedido = item.split(',');
            return { id: pedido[0], quantidade: pedido[1] };
        });

        if (filterItens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        if (!this.formasPagamento.includes(metodoDePagamento)) {
            return 'Forma de pagamento inválida!';
        }

        if (filterItens.some(item => !this.codigosValidos.includes(item.id))) {
            return 'Item inválido!';
        }

        if (filterItens.some(item => item.quantidade === '0')) {
            return 'Quantidade inválida!';
        }

        const extrasPrincipais = [
            { extra: 'chantily', principal: 'cafe' },
            { extra: 'queijo', principal: 'sanduiche' }
        ];

        if (extrasPrincipais.some(par => filterItens.some(item => item.id === par.extra) && !filterItens.some(item => item.id === par.principal))) {
            return 'Item extra não pode ser pedido sem o principal';
        }

        const resultado = filterItens.reduce((acumulador, itemAtual) => {
            const valorItem = this.cardapio.find(item => item.id === itemAtual.id).valor;
            
            if (metodoDePagamento === 'credito') {
                acumulador += parseInt(itemAtual.quantidade) * (valorItem + valorItem * this.acrescimoCredito);
            } else if (metodoDePagamento === 'dinheiro') {
                acumulador += parseInt(itemAtual.quantidade) * (valorItem - valorItem * this.descontoDinheiro);
            } else {
                acumulador += parseInt(itemAtual.quantidade) * valorItem;
            }

            return acumulador;
        }, 0);

        return `R$ ${resultado.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };
