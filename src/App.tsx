import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { CreateObject } from './CreateObject'
import { EditWindow } from './EditObject'
import { ObjectState } from './types'
import { observer } from 'mobx-react-lite'
import { ObjectStore } from './store'

const objectsStore = new ObjectStore()

function App() {
  const [object, setObject] = useState<ObjectState>({
    id: "",
    name: "",
    address: "",
    description: "",
    dateCommissioning: "",
    image: "",
  })

  const handleClick = (item: ObjectState) => {
    setObject(item)
  }

  const deleteHandler = (id: string) => {
    objectsStore.delete(id)
  }

  return (
    <div style={{display: 'flex', justifyContent: 'space-between', margin: '0px'}}>
        <TableContainer w='50%'>
          <CreateObject objectsStore={objectsStore}/>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Наименование</Th>
              </Tr>
            </Thead>
            <Tbody>
            {objectsStore.objects.map((item: ObjectState) => { 
                return (
                  <Tr key={item.id}>
                    <Td onClick={() => handleClick(item)}>{item.name}</Td>
                    <Td w={0}>
                      <Button 
                        onClick={()=> deleteHandler(item.id)}>
                        Удалить
                      </Button>
                    </Td>
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

export default observer(App)
