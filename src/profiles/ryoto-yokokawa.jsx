import ProfileLayout from './ProfileLayout'

// このファイル = 鈴木花子さん1人分のプロフィールページ
export const profile = {
  id: 'ryoto-yokokawa',
  name: '横川 凌大',
  role: 'UI / UX デザイナー',
  emoji: '⚽',
  location: '東京',
  tagline: 'デザインで課題を解決する',
  bio: [
    'プロダクトの体験設計からビジュアルデザインまで幅広く担当しています。',
    'ユーザーインタビューを大切にし、根拠のあるデザインを心がけています。',
  ],
  skills: ['Figma', 'デザインシステム', 'プロトタイピング', 'ユーザビリティ'],
  links: [
    { label: 'Portfolio', href: 'https://example.com/' },
    { label: 'Dribbble', href: 'https://dribbble.com/' },
  ],
}

export default function HanakoSuzuki() {
  return <ProfileLayout profile={profile} />
}
