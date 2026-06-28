import ProfileLayout from './ProfileLayout'

// このファイル = 山田太郎さん1人分のプロフィールページ
export const profile = {
  id: 'taro-yamada',
  name: '山田 太郎',
  role: 'フロントエンドエンジニア',
  emoji: '🦊',
  location: '東京',
  tagline: 'UIとアニメーションが好きです',
  bio: [
    'Web フロントエンドを中心に開発しています。React と TypeScript が得意分野です。',
    '使いやすく心地よい UI を作ることにこだわっています。',
  ],
  skills: ['React', 'TypeScript', 'Vite', 'CSS'],
  links: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'X (Twitter)', href: 'https://x.com/' },
  ],
}

export default function TaroYamada() {
  return <ProfileLayout profile={profile} />
}
