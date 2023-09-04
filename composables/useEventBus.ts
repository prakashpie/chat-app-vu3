import mitt from 'mitt'

interface Status {
  status: boolean
}

type AppDownloadEvents = {
  'app:download': Status
}

const emitter = mitt<AppDownloadEvents>()

export const useEmitEvent = emitter.emit
export const useListenEvent = emitter.on

type GenericEvents = {
  'generic:event': any
}

const emitterGeneric = mitt<GenericEvents>()

export const useGenericEmitEvent = emitterGeneric.emit
export const useGenericListenEvent = emitterGeneric.on
