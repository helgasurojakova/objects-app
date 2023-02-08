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
      new Object(
        'ЖК «Кранц - Престиж»', 
        'Калининградская область, Зеленоградск, ул. Тургенева',
        'Многоквартирные жилые дома по улице Тургенева',
        '2023-08-12',
        'https://cdn-p.cian.site/images/61/000/631/krancprestizh-zelenogradsk-jk-1360001608-10.jpg'
      ),
      new Object(
        'Особняк в Светлогорске', 
        'Калининградская область, Светлогорск, ул. Курортная',
        'Коттедж рядом с историческим центром Светлогорска',
        '2023-04-07',
        'https://kgd.ru/media/k2/items/cache/9a96615feeec1bd8b0065dd4cd9cefa1_XL.jpg',
      ),
    ]
    makeAutoObservable(this)
  }

  sortObjectsByName() {
    const sortedObjects = this.objects.slice().sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })
    return sortedObjects
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
