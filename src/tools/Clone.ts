import { RepoParams } from '../middleware/interfaces'
export const Clone = async (params: RepoParams, exec: any) => {
  await exec(`cd ./repos && git clone ${params.cloneUrl}`, (err: any) => {
    if (err) return
  })
}
