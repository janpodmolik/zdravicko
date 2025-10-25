export interface AktualitaItem {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD format
  category: 'info' | 'health' | 'announcement' | 'event';
  excerpt: string;
  content?: string;
  important: boolean;
}

// This will be managed via GitHub/Netlify CMS in the future
export const aktuality: AktualitaItem[] = [
  {
    id: '1',
    title: 'Nové ordinační hodiny během vánočních svátků',
    date: '2025-10-20',
    category: 'announcement',
    excerpt: 'Informujeme vás o změnách v ordinačních hodinách během vánočních svátků. Ordinace bude otevřena v upravených časech.',
    important: true
  },
  {
    id: '2',
    title: 'Očkování proti chřipce 2025/2026',
    date: '2025-10-15',
    category: 'health',
    excerpt: 'Začínáme s očkováním proti sezónní chřipce. Vakcíny jsou k dispozici pro všechny věkové kategorie.',
    important: false
  },
  {
    id: '3',
    title: 'Den otevřených dveří',
    date: '2025-10-10',
    category: 'event',
    excerpt: 'Zveme vás na Den otevřených dveří. Přijďte se podívat na naši ordinaci a seznámit se s celým týmem.',
    important: false
  },
  {
    id: '4',
    title: 'Nový člen našeho týmu',
    date: '2025-10-05',
    category: 'info',
    excerpt: 'S radostí vám představujeme MUDr. Annu Novákovou, která rozšířila náš tým pediatrů.',
    important: false
  }
];

// Helper to get latest aktuality
export function getLatestAktuality(limit?: number): AktualitaItem[] {
  const sorted = [...aktuality].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return limit ? sorted.slice(0, limit) : sorted;
}

// Helper to get important aktuality
export function getImportantAktuality(): AktualitaItem[] {
  return aktuality.filter(item => item.important);
}

// Helper to get aktuality by category
export function getAktualityByCategory(category: AktualitaItem['category']): AktualitaItem[] {
  return aktuality.filter(item => item.category === category);
}
