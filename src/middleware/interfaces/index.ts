export interface Prompt {
  type?: string
  name: string
  message: string
  choices?: string[]
}

export interface RepoParams {
  name?: string
  cloneUrl: string
}
