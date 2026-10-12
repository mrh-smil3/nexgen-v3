const API_BASE = "https://api.telegram.org";

// Telegram rejects messages over 4096 characters.
const MAX_MESSAGE_LENGTH = 4096;

/** Escapes text for Telegram's HTML parse mode. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Sends an HTML-formatted message to the configured chat. Returns false —
 * never throws — so the caller decides how to surface a failed delivery.
 */
export async function sendTelegramMessage(html: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error(
      "[telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set",
    );
    return false;
  }

  try {
    const res = await fetch(`${API_BASE}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: html.slice(0, MAX_MESSAGE_LENGTH),
        parse_mode: "HTML",
        link_preview_options: { is_disabled: true },
      }),
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });

    if (!res.ok) {
      // Log Telegram's description only — the URL carries the bot token.
      const data = (await res.json().catch(() => null)) as {
        description?: string;
      } | null;
      console.error(
        "[telegram] sendMessage failed",
        res.status,
        data?.description,
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error(
      "[telegram] sendMessage unreachable",
      error instanceof Error ? error.name : "unknown",
    );
    return false;
  }
}
