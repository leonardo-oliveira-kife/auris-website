<?php
/**
 * Configuração do formulário de contato.
 * Altere apenas o e-mail de destino abaixo conforme necessário.
 */

// E-mail(s) que receberão as solicitações do formulário "Agendar demonstração".
// Aceita um ou mais endereços — para adicionar/remover destinatários, edite a lista abaixo.
define('AURIS_MAIL_TO', [
    'contato@aurishealth.com.br',
    'joao.ripardo@aurishealth.com.br',
]);

// Nome exibido como remetente no corpo do e-mail (o campo "De:" técnico do
// envio usa um endereço do próprio domínio, para não ser marcado como spam).
define('AURIS_MAIL_FROM_NAME', 'Site Auris');

// Assunto do e-mail recebido.
define('AURIS_MAIL_SUBJECT', 'Nova solicitação de demonstração — Site Auris');
