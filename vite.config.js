import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages では https://<ユーザー名>.github.io/first-react-vite-sample/
  // というサブパスで公開されるため、リンクの基準パスを合わせる
  base: '/first-react-vite-sample/',
  plugins: [react()],
  test: {
    // コンポーネントの描画テストのため、ブラウザ相当の環境(jsdom)で実行する
    environment: 'jsdom',
    // afterEach などをグローバルに提供する。これにより Testing Library が
    // 各テスト後の画面リセット(cleanup)を自動で登録してくれる
    globals: true,
  },
})
