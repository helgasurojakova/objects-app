export const GET_DATA = 'GET_DATA'
export const CREATE_OBJECT = 'CREATE_OBJECT'

export const initialState = {
  data: [{
    "id": "d27ccf63-a182-4b15-bf3b-1e784e65d9cf",
    "name": "test1",
    "address": "test1",
    "description": "test1",
    "dateCommissioning": "2023-02-07",
    "image": "https://orientir39.ru/images/karkasnik-fon.jpg"
   },
   {
     "id": "5a7d4b14-5ad2-42be-997a-18f2c1fff65b",
     "name": "test2",
     "address": "test2",
     "description": "test2",
     "dateCommissioning": "2023-02-08",
     "image": "https://must-see.top/wp-content/uploads/2021/05/Nemetskie-villy-xix-xx-vekov-700x466.jpg"
   }],
}

export const objectsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_DATA:
      return state
    case CREATE_OBJECT: 
      return {...state, data: [...state.data, action.payload]}
    default:
      return state
  }
}
