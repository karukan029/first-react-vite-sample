import ProfileLayout from './ProfileLayout'

// このファイル = 田中健二さん1人分のプロフィールページ
export const profile = {
  id: 'kenji-tanaka',
  name: '田中 健二',
  role: 'バックエンドエンジニア',
  emoji: '🐢',
  location: '福岡',
  tagline: '堅牢なシステムを支える',
  bio: [
    'API 設計やインフラ構築を担当しています。Go と PostgreSQL をよく使います。',
    'パフォーマンスと信頼性のバランスを考えるのが好きです。',
  ],
  skills: ['Go', 'PostgreSQL', 'Docker', 'AWS'],
  links: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'Blog', href: 'https://example.com/' },
  ],
}

export default function KenjiTanaka() {
  return <ProfileLayout profile={profile} />
}
