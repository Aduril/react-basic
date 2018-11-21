import { parse } from 'query-string'
import { matchRoutes } from 'react-router-config'
import { TStage } from './interfaces'

interface IInitialDataParams {
  stage: TStage
  appRoutes: any
  path: string
  query: string
}
export const initialData = async ({
  appRoutes,
  path,
  query,
  stage,
}: IInitialDataParams) => {
  const matchedRoutes = matchRoutes(appRoutes as any, path)
  // there should be exactly one route because app is using a switch
  const route = matchedRoutes.length ? matchedRoutes[0] : undefined
  const load = async (r: any) => {
    const pathParams = r.match.params
    const queryParams = parse(query)
    const params = {
      pathParams,
      queryParams,
      stage,
    }
    const data = r.route && r.route.loadData && (await r.route.loadData(params))
    return data
  }
  return route ? await load(route) : undefined
}
