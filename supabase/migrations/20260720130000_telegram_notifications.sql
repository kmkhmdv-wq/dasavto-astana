-- Enable pg_net extension for asynchronous HTTP requests
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create trigger function to send Telegram notifications
CREATE OR REPLACE FUNCTION public.notify_telegram_on_application()
RETURNS TRIGGER AS $$
DECLARE
  telegram_bot_token TEXT := '8620454059:AAFIy9KqgGc2VVPtH2TEsZTFgiAaxaU4CbM';
  chat_id TEXT := '5508363788';
  message_text TEXT;
  url TEXT := 'https://api.telegram.org/bot' || telegram_bot_token || '/sendMessage';
BEGIN
  message_text := '🔔 Новая заявка на сайте!' || E'\n\n' ||
                  '👤 Имя: ' || COALESCE(NEW.name, 'Не указано') || E'\n' ||
                  '📞 Телефон: ' || COALESCE(NEW.phone, 'Не указано') || E'\n' ||
                  '🚗 Дополнительно: ' || COALESCE(NEW.extra, 'Нет') || E'\n' ||
                  '📋 Тип: ' || COALESCE(NEW.type, 'Не указан');

  PERFORM net.http_post(
    url := url,
    headers := jsonb_build_object('Content-Type', 'application/json'),
    body := jsonb_build_object(
      'chat_id', chat_id,
      'text', message_text
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach trigger to applications table
CREATE OR REPLACE TRIGGER on_application_inserted
AFTER INSERT ON public.applications
FOR EACH ROW
EXECUTE FUNCTION public.notify_telegram_on_application();
