import { makeAutoObservable } from 'mobx'
import { v4 as uuidv4 } from 'uuid'

class Object {
  id: string
  name: string
  address?: string
  description?: string
  dateCommissioning?: string
  image?: string

  constructor(name: string, address?: string, description?: string, dateCommissioning?: string, image?: string) {
    this.id = uuidv4()
    this.name = name
    this.address = address
    this.description = description
    this.dateCommissioning = dateCommissioning
    this.image = image
    makeAutoObservable(this)
  }

  edit (name?: string, address?: string, description?: string, dateCommissioning?: string, image?: string) {
    this.name = name!
    this.address = address!
    this.description = description!
    this.dateCommissioning = dateCommissioning!
    this.image = image!
  }
}

class ObjectStore {
  objects: Object[]

  constructor() {
    this.objects = [
      new Object('test1', 'test1'),
      new Object('test2', 'test2'),
    ]
    makeAutoObservable(this)
  }

  delete (id: string) {
    const newObjects = this.objects.filter(el => {
      return el.id !== id
    })
    this.objects = newObjects
  }

  add (name: string) {
    const newObjects = this.objects
    newObjects.push(new Object(name))
    this.objects = newObjects
  }

  getObjectById(id: string) {
    return this.objects.find(item => item.id === id)
  }
}

export { Object, ObjectStore }
