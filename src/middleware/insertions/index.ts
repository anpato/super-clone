import { exec } from 'child_process'

export const InsertOAuthToken = (token: string): void => {
  exec(`touch .env && echo "GITHUB_TOKEN=${token}" >> .env`, err => {
    if (err) throw err
  })
}
