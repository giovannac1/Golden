// Componente Principal da Agenda
const Agenda = ({ perfil }) => {
    // Estado para armazenar os agendamentos. 
    const [agendamentos, setAgendamentos] = React.useState([
        // Exemplo inicial de agendamento
        { horario: "10:00", nome: "Ana Silva", servico: "Corte de Cabelo", telefone: "9999-0000" },
        { horario: "15:00", nome: "Beto Souza", servico: "Manicure", telefone: "9888-0000" },
    ]);
    const [horarioSelecionado, setHorarioSelecionado] = React.useState(null);

    // Função para verificar se um horário está ocupado
    const isOcupado = (horario) => {
        return agendamentos.some(a => a.horario === horario);
    };

    // Função que lida com o clique em um horário
    const handleHorarioClick = (horario) => {
        const ocupado = isOcupado(horario);
        
        if (perfil === 'cliente') {
            if (!ocupado) {
                setHorarioSelecionado(horario);
            } else {
                setHorarioSelecionado(null);
                // NOTA: O cliente só vê a informação "Ocupado"
                alert('Este horário já está ocupado. Por favor, selecione outro.');
            }
        } else if (perfil === 'dono') {
            const agendamento = agendamentos.find(a => a.horario === horario);
            
            if (agendamento) {
                 // PERFIL DONO: Mostra os detalhes do cliente
                alert(`DETALHES DO AGENDAMENTO:\nHorário: ${agendamento.horario}\nCliente: ${agendamento.nome}\nServiço: ${agendamento.servico}\nTel: ${agendamento.telefone}`);
            } else {
                alert(`Horário ${horario} está livre. Pode ser agendado por você.`);
            }
            setHorarioSelecionado(null); // O Dono não usa o formulário de agendamento cliente
        }
    };

    // Função para adicionar um novo agendamento
    const handleAgendar = (novoAgendamento) => {
        if (!isOcupado(novoAgendamento.horario)) {
            setAgendamentos([...agendamentos, novoAgendamento]);
            setHorarioSelecionado(null); // Limpa a seleção
        } else {
            alert('Erro: Horário ocupado.');
        }
    };

    // Renderização dos horários
    return (
        <div className={perfil === 'dono' ? 'agenda-dono' : ''}>
            <h2>Agenda de Horários ({perfil === 'dono' ? 'Visualização DONO' : 'Visualização CLIENTE'})</h2>
            <div className="agenda-container">
                {HORARIOS.map((horario) => {
                    const ocupado = isOcupado(horario);
                    const classe = ocupado ? 'ocupado' : 'livre';

                    return (
                        <div
                            key={horario}
                            className={`horario ${classe}`}
                            onClick={() => handleHorarioClick(horario)}
                        >
                            {horario}
                            <br />
                            <span style={{ fontSize: '0.8em' }}>{ocupado ? 'Ocupado' : 'Livre'}</span>
                        </div>
                    );
                })}
            </div>

            {/* Formulário de Agendamento (visível apenas para o cliente e quando um horário livre é selecionado) */}
            {perfil === 'cliente' && horarioSelecionado && !isOcupado(horarioSelecionado) && (
                <AgendamentoCliente 
                    horarioSelecionado={horarioSelecionado} 
                    onAgendar={handleAgendar} 
                />
            )}
        </div>
    );
};