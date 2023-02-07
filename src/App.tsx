import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { connect , useDispatch } from 'react-redux'
import { CreateObject } from './CreateObject'
import { EditWindow } from './EditObject'
import { GET_DATA } from './reducer'
import { ObjectState, State, Store } from './types'

const objectsState = (state: Store) => {
  return {
    data: state.objects.data,
  }
}

function App(state: State) {
  const dispatch = useDispatch()
  const { data } = state
  const [object, setObject] = useState<ObjectState>({
    id: "",
    name: "",
    address: "",
    description: "",
    dateCommissioning: "",
    image: "",
  })

  useEffect(() => {
    dispatch({ type: GET_DATA })
  }, [])

  const handleClick = (item: ObjectState) => {
    setObject(item)
  }

  return (
    <div style={{display: 'flex', justifyContent: 'space-between', margin: '0px'}}>
        <TableContainer w='50%'>
          <CreateObject/>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Наименование</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item: ObjectState) => { 
                return (
                  <Tr key={item.id} onClick={() => handleClick(item)}>
                    <Td>{item.name}</Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
        <EditWindow 
            id={object.id}
            name={object.name}
            address={object.address}
            description={object.description}
            dateCommissioning={object.dateCommissioning}
            image={object.image}
          />
    </div>
  )
}

export default connect(objectsState)(App)
