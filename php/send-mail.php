<?php
/**
 * Endpoint do formulário de contato ("Agendar demonstração").
 * Recebe JSON via fetch() e envia por e-mail usando mail() nativo do PHP.
 *
 * Se o servidor de hospedagem não tiver mail() configurado corretamente,
 * troque este arquivo por uma implementação com PHPMailer + SMTP — o ponto
 * de troca está isolado na função send_notification_email() abaixo.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/config.php';

function respond(bool $success, string $message, int $statusCode = 200): void
{
    http_response_code($statusCode);
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

// Apenas POST é aceito.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Método não permitido.', 405);
}

$rawBody = file_get_contents('php://input');
$payload = json_decode($rawBody, true);

if (!is_array($payload)) {
    respond(false, 'Dados inválidos.', 400);
}

// Honeypot: se preenchido, é bot — responde sucesso "falso" sem enviar e-mail.
if (!empty($payload['website'])) {
    respond(true, 'Recebido.');
}

/**
 * Remove quebras de linha para impedir header injection e normaliza espaços.
 */
function sanitize_line(string $value): string
{
    $value = str_replace(["\r", "\n"], ' ', $value);
    return trim($value);
}

function sanitize_multiline(string $value): string
{
    $value = str_replace("\r\n", "\n", $value);
    $value = preg_replace('/\n{3,}/', "\n\n", $value) ?? $value;
    return trim($value);
}

$nome        = sanitize_line((string) ($payload['nome'] ?? ''));
$instituicao = sanitize_line((string) ($payload['instituicao'] ?? ''));
$cargo       = sanitize_line((string) ($payload['cargo'] ?? ''));
$contato     = sanitize_line((string) ($payload['contato'] ?? ''));
$mensagem    = sanitize_multiline((string) ($payload['mensagem'] ?? ''));

// Validação server-side (nunca confiar apenas na validação do JS).
$errors = [];

if ($nome === '' || mb_strlen($nome) > 150) {
    $errors[] = 'nome';
}
if ($instituicao === '' || mb_strlen($instituicao) > 150) {
    $errors[] = 'instituicao';
}
if ($cargo !== '' && mb_strlen($cargo) > 150) {
    $errors[] = 'cargo';
}

$isEmail = filter_var($contato, FILTER_VALIDATE_EMAIL) !== false;
$isPhone = (bool) preg_match('/^[\d\s()+-]{8,20}$/', $contato);
if ($contato === '' || (!$isEmail && !$isPhone)) {
    $errors[] = 'contato';
}

if (mb_strlen($mensagem) > 4000) {
    $errors[] = 'mensagem';
}

if (!empty($errors)) {
    respond(false, 'Alguns campos precisam ser corrigidos.', 422);
}

/**
 * Envia a notificação por e-mail. Isolado em função própria para facilitar
 * a troca por PHPMailer/SMTP caso o mail() nativo não funcione no servidor
 * de produção do cliente.
 */
function send_notification_email(
    string $nome,
    string $instituicao,
    string $cargo,
    string $contato,
    string $mensagem
): bool {
    // AURIS_MAIL_TO é uma lista de endereços; mail() aceita múltiplos
    // destinatários separados por vírgula num único parâmetro $to.
    $to      = implode(',', AURIS_MAIL_TO);
    $subject = '=?UTF-8?B?' . base64_encode(AURIS_MAIL_SUBJECT) . '?=';

    $bodyLines = [
        'Nova solicitação recebida pelo site da Auris:',
        '',
        'Nome: ' . $nome,
        'Instituição: ' . $instituicao,
        'Cargo: ' . ($cargo !== '' ? $cargo : '—'),
        'E-mail/WhatsApp: ' . $contato,
        '',
        'Mensagem:',
        ($mensagem !== '' ? $mensagem : '—'),
    ];
    $body = implode("\n", $bodyLines);

    // Domínio do servidor, usado apenas para montar um remetente técnico
    // válido (evita rejeição por SPF/DMARC quando o "De:" não bate com o
    // domínio que efetivamente envia o e-mail).
    $host        = $_SERVER['SERVER_NAME'] ?? 'localhost';
    $fromAddress = 'nao-responder@' . preg_replace('/[^a-zA-Z0-9.\-]/', '', $host);
    $fromName    = '=?UTF-8?B?' . base64_encode(AURIS_MAIL_FROM_NAME) . '?=';

    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'From: ' . $fromName . ' <' . $fromAddress . '>',
        'X-Mailer: PHP/' . phpversion(),
    ];

    // Só define Reply-To quando o contato informado é um e-mail válido.
    if (filter_var($contato, FILTER_VALIDATE_EMAIL) !== false) {
        $headers[] = 'Reply-To: ' . $contato;
    }

    return mail($to, $subject, $body, implode("\r\n", $headers));
}

$sent = send_notification_email($nome, $instituicao, $cargo, $contato, $mensagem);

if ($sent) {
    respond(true, 'Mensagem enviada com sucesso.');
}

respond(false, 'Não foi possível enviar sua mensagem agora. Tente novamente em instantes.', 500);
