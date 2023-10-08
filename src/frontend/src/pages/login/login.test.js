import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login'; // Certifique-se de ajustar o caminho conforme necessário
import { BrowserRouter } from 'react-router-dom'; // Importe BrowserRouter

test('o botão de login fica habilitado quando o email e a senha são preenchidos', async () => {
    // Renderize o componente Login dentro do BrowserRouter
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    // Encontre os campos de email e senha e digite valores neles
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'seuemail@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'suasenha123' } });

    // Encontre o botão de login
    const loginButton = screen.getByRole('button', { name: /login/i });

    // Verifique se o botão de login está habilitado
    if (loginButton.tagName === 'BUTTON') {
        // Verifique se o botão está habilitado
        expect(loginButton.disabled).toBe(false);
    } else {
        // Se não for um botão, lance um erro
        throw new Error('O elemento não é um botão');
    }
});
