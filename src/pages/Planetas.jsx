import axios from "axios";
import { useEffect, useState } from "react";
import FormPlaneta from "../components/FormPlaneta";

const url = "https://api.serratec.mwmsoftware.com/planetas";

function Planetas() {
    
    const [planeta, setPlanetas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [formPlaneta, setFormPlaneta] = useState({
        nome: "",
        galaxia: "",
        clima: "",
        habitavel: true,
        descricao: ""
    });


    async function buscarPlanetasComAxios() {
        try {
            setLoading(true);
            const resposta = await axios.get(url);
            setPlanetas(resposta.data);
        } catch (error) {
            console.error("Erro ao buscar aliens com axios:", error);
        } finally {
            setLoading(false);
        }
    }

    async function cadastrarPlanetas(event) {
    event.preventDefault();
    setMensagem("");

    try {
        const resposta = await axios.post(url, formPlaneta);
        setPlanetas((listaAtual) => [...listaAtual, resposta.data]);
        setFormPlaneta({
            nome: "",
            galaxia: "",
            clima: "",
            habitavel: false,
            descricao:""
        });
        setMensagem("Planeta cadastrado com sucesso!");
    } catch (error) {
        console.error("Erro ao cadastrar planeta:", error);
        setMensagem("Erro ao cadastrar planeta.");
    }
    }

    async function deletarPlaneta(id) {
        const confirmar = window.confirm("ATENÇÃO: Deseja realmente expurgar este registro do banco de dados?");
        if(!confirmar) return;
        
        try {
        setMensagem("");
        await api.delete(`${url}/${id}`);
        setPlanetas((listaAtual) => listaAtual.filter((planeta) => planeta.id !== id));
        setMensagem(">>> REGISTRO EXPURGADO COM SUCESSO.");
        } catch (error) {
        console.error("Erro ao excluir planeta:", error);
        setMensagem(">>> ERRO: FALHA AO TENTAR EXPURGAR O REGISTRO.");
        }
  }

    function abrirModalCadastro() {
        setModeEdit(false);
        limparFormulario();
        setModalAberto(true);
    }

    function abrirModalEdicao(planeta) {
        setModeEdit(true);
        setFormAvistamento(planeta);
        setModalAberto(true);
    }

    function limparFormulario() {
        setFormPlaneta({
        titulo: "",
        local: "",
        descricao: "",
        data: "",
        nivelMedo: 1,
        });
    }

    function fecharModal() {
        setModalAberto(false);
        limparFormulario();
        setModeEdit(false);
    }

    const formatarDado = (dado, fallback) => {
        return dado === "string" || !dado ? fallback : dado;
    };

    useEffect(() => {
        buscarPlanetasComAxios();
    }, []);

    useEffect(() => {
        console.log("Estado Planetas atualizado:", planeta);
    }, [planeta]);


    return (
        <section>
            <h1>Planetas</h1>

            <FormPlaneta
                cadastrarPlanetas={cadastrarPlanetas}
                formPlaneta={formPlaneta}
                setFormPlaneta={setFormPlaneta}
            />


            {mensagem && <p className="mensagem">{mensagem}</p>}
            {loading ? (
                <p>Carregando planetas...</p>
            ) : (
                <div className="planetas-list">
                    {planeta.map((planeta) => (
                        <article className="planetas-card" key={planeta.id}>
                            <h3>
                                {planeta?.nome === "string" ? "Planeta não disponível" : planeta?.nome}
                            </h3>
                            <p>
                                <strong>Nome:</strong> {planeta?.nome}
                            </p>
                            <p>
                                <strong>Galaxia:</strong> {planeta?.galaxia}
                            </p>
                            <p>
                                <strong>Clima:</strong> {planeta?.clima}
                            </p>
                            <p>
                                <strong>Habitavel:</strong> {planeta?.habitavel}
                            </p>
                            <p>
                                <strong>Descrição:</strong> {planeta?.descricao}
                            </p>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}
export default Planetas;