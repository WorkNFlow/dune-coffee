import { WordmarkFooter } from '@/src/components/ui/wordmark-footer';

export function Footer() {
  return (
    <WordmarkFooter
      id="privacy"
      name="DUNE"
      legalName="Дюна. Все права защищены."
      year={2026}
      description="Тихо работает. ООО «Дюна Кофе Лаб», ИНН 3906384912 · ОГРН 1213900008451. 236022, Калининград, пр-т Мира, д. 41, помещ. 1"
      status="Калининград — Зеленоградск"
      navLabel="Навигация в подвале"
      className="border-t border-border bg-[#0C0C0E]"
      columns={[
        {
          title: 'Разделы',
          links: [
            { label: 'Концепция', href: '#concept' },
            { label: 'Меню', href: '#menu' },
            { label: 'Кофейни', href: '#locations' },
            { label: 'Зеленоградск 2027', href: '#zelenogradsk' },
          ],
        },
        {
          title: 'Ссылки',
          links: [
            { label: 'Telegram', href: 'https://t.me/' },
            { label: 'Политика конфиденциальности', href: '#privacy' },
          ],
        },
      ]}
    />
  );
}
