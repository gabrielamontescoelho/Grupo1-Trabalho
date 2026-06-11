import React from 'react';

function FormPlaneta({ cadastrarPlaneta, formPlaneta, setFormPlaneta }) {
  // Uma única função que gerencia as alterações de QUALQUER input do formulário
    const handleChange = (event) => {
    const { name, value, type } = event.target;

    setFormPlaneta({
        ...formPlaneta,
      // Se o input for do tipo número, fazemos uma tratativa amigável:
      // Se estiver vazio, mantém vazio para o usuário conseguir apagar. Se não, converte.
        [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value
    });
    };

    return (
        <form className="planeta-form" onSubmit={cadastrarPlaneta}>
            <h2>Cadastrar planeta</h2>

        <label>
            Nome
            <input
            name="nome"
            type="text"
            minLength="2"
            required
            value={formPlaneta.nome || ''} // Proteção contra o erro de controlled/uncontrolled
            onChange={handleChange}
            />
        </label>

        <label>
            Galáxia
            <input
            name="galaxia"
            type="text"
            minLength="2"
            required
            value={formPlaneta.galaxia || ''}
            onChange={handleChange}
            />
        </label>

        <label>
            Clima
            <input
            name="clima"
            type="text"
            minLength="2"
            required
            value={formPlaneta.clima || ''}
            onChange={handleChange}
            />
        </label>

        <label>
            Habitável (Nível)
            <input
            name="habitavel"
            type="number"
            min="1"
            max="10"
            required
            value={formPlaneta.habitavel ?? ''} // Uso do nullish para aceitar o número 0 se necessário
            onChange={handleChange}
            />
        </label>

        <label>
            Descrição
            <input
            name="descricao"
            type="text"
            minLength="3"
            required
            value={formPlaneta.descricao || ''}
            onChange={handleChange}
            />
        </label>

        <button type="submit">Cadastrar</button>
        </form>
    );
}
