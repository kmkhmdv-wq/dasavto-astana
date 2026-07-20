-- Update trigger function to send Telegram notifications with a WhatsApp link button
CREATE OR REPLACE FUNCTION public.notify_telegram_on_application()
RETURNS TRIGGER AS $$
DECLARE
  telegram_bot_token TEXT := '8620454059:AAFIy9KqgGc2VVPtH2TEsZTFgiAaxaU4CbM';
  chat_id TEXT := '5508363788';
  message_text TEXT;
  clean_phone TEXT;
  url TEXT := 'https://api.telegram.org/bot' || telegram_bot_token || '/sendMessage';
BEGIN
  message_text := '🔔 Новая заявка на сайте!' || E'\n\n' ||
                  '👤 Имя: ' || COALESCE(NEW.name, 'Не указано') || E'\n' ||
                  '📞 Телефон: ' || COALESCE(NEW.phone, 'Не указано') || E'\n' ||
                  '🚗 Дополнительно: ' || COALESCE(NEW.extra, 'Нет') || E'\n' ||
                  '📋 Тип: ' || COALESCE(NEW.type, 'Не указан');

  -- Clean phone number for WhatsApp url (e.g. remove "+", spaces, parens, translate leading 8 to 7)
  clean_phone := regexp_replace(NEW.phone, '\D', '', 'g');
  IF length(clean_phone) = 11 AND left(clean_phone, 1) = '8' THEN
    clean_phone := '7' || substring(clean_phone from 2);
  ELSIF length(clean_phone) = 10 THEN
    clean_phone := '7' || clean_phone;
  END IF;

  -- Send message with inline keyboard containing the WhatsApp link
  PERFORM net.http_post(
    url := url,
    headers := jsonb_build_object('Content-Type', 'application/json'),
    body := jsonb_build_object(
      'chat_id', chat_id,
      'text', message_text,
      'reply_markup', jsonb_build_object(
        'inline_keyboard', jsonb_build_array(
          jsonb_build_array(
            jsonb_build_object(
              'text', '💬 Связаться через WhatsApp',
              'url', 'https://wa.me/' || clean_phone
            )
          )
        )
      )
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
