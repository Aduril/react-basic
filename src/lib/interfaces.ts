import { RouteConfig } from 'react-router-config'

export type TStage = 'test' | 'prod'
export type TTld = 'DE' | 'CH' | 'AT'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export interface DataLoaderRouterConfig extends RouteConfig {
    loadData?: any
}
