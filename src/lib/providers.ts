import * as React from 'react'
import { configContextFactory } from './contextFactory'
import { Omit, TStage, TTld } from './interfaces'

const contextStg = configContextFactory<TStage>('stage', 'test')

export const StageProvider = contextStg.ValueProvider
export const StageConsumer = contextStg.ValueConsumer

export const withStageConsumer = <Props extends { stage: TStage }>(
  component: React.ComponentType<Props>
) => {
  return contextStg.valueConsumerFactory<Props, Omit<Props, 'stage'>>(component)
}

const contextTld = configContextFactory<TTld>('tld', 'DE')

export const TLDProvider = contextTld.ValueProvider
export const TLDConsumer = contextTld.ValueConsumer

export const withTLDConsumer = <Props extends { tld: TTld }>(
  component: React.ComponentType<Props>
) => {
  return contextTld.valueConsumerFactory<Props, Omit<Props, 'tld'>>(component)
}
