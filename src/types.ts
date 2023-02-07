export type Store = {
  objects: State
}

export type State = {
  data: ObjectState[]
}

export type ObjectState = {
  id: string
  name: string
  address?: string
  description?: string
  dateCommissioning?: string
  image?: string
}

