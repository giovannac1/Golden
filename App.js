// App.js - Componente principal que gerencia o estado do perfil e login
const App = () => {
    // 'cliente', 'login_dono', ou 'dono_logado'
    const [perfil, setPerfil] = React.useState('cliente'); 

    // Handler para alternar o perfil
    const handleSetPerfil = (novoPerfil) => {
        if (novoPerfil === 'dono') {
            // Se tentar ir para Dono, primeiro vai para a tela de login
            setPerfil('login_dono');
        } else if (novoPerfil === 'cliente') {
            // Se for para Cliente, volta a ser apenas cliente
            setPerfil('cliente');
        } else if (novoPerfil === 'dono_logado') {
            // Sucesso no login
            setPerfil('dono_logado');
        }
    };

    // O perfil passado para o Agenda é 'cliente' ou 'dono'
    const perfilAgenda = perfil === 'dono_logado' ? 'dono' : 'cliente';

    let content;
    if (perfil === 'login_dono') {
        // Mostra o formulário de Login
        content = (
            <LoginDono 
                onLoginSuccess={() => handleSetPerfil('dono_logado')} 
                onCancel={() => handleSetPerfil('cliente')} 
            />
        );
    } else {
        // Mostra a Agenda
        content = <Agenda perfil={perfilAgenda} />;
    }

    // Estado do botão "Dono"
    const isDonoButtonActive = perfil === 'dono_logado' || perfil === 'login_dono';

    return (
        <div className="App">
            <header>
                <h1>Sistema de Agendamento de Beleza</h1>
            </header>
            
            <div className="perfil-botoes">
                <button 
                    className={`cliente ${perfil === 'cliente' ? 'ativo' : ''}`}
                    onClick={() => handleSetPerfil('cliente')}
                >
                    Visualização Cliente
                </button>
                <button 
                    className={`dono ${perfil === 'dono_logado' ? 'ativo' : ''}`}
                    onClick={() => handleSetPerfil('dono')}
                    disabled={perfil === 'dono_logado'} // Desabilita se já estiver logado
                >
                    Acesso Dono
                </button>
                
                {/* Botão de Sair só aparece quando o Dono está logado */}
                {perfil === 'dono_logado' && (
                    <button 
                        className="dono"
                        onClick={() => handleSetPerfil('cliente')}
                        style={{marginLeft: '10px', backgroundColor: '#dc3545'}}
                    >
                        Sair (Dono Logado)
                    </button>
                )}
            </div>
            
            {content}
        </div>
    );
};

// Renderização final
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);