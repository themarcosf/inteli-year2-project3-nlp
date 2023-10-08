import { BrowserRouter as Router } from "react-router-dom";

// Configurar o React Router para o ambiente de teste
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({}), // Suponha que você não precisa de useParams neste teste
}));

// Opcionalmente, você pode inicializar o history com uma rota inicial, se necessário
// Isso não é mais necessário, pois não estamos usando history diretamente
// history.push('/');
