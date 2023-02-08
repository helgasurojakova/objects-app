import { 
  Button, 
  Table, 
  TableContainer, 
  Tbody, 
  Td, 
  Th, 
  Thead, 
  Tr, 
  Heading, 
  Center 
} from '@chakra-ui/react'

import React, { useEffect, useState } from 'react'
import { CreateObject } from './CreateObject'
import { EditObject } from './EditObject'
import { ObjectType } from './types'
import { observer } from 'mobx-react-lite'
import { ObjectStore } from './store'

export const objectsStore = new ObjectStore()

function App() {
  const [objectId, setObjectId] = useState('')

  const handleClick = (id: string) => {
    setObjectId(id)
  }

  const deleteHandler = (id: string) => {
    objectsStore.delete(id)
    setObjectId('')
  }

  return (
    <div style={{display: 'flex', justifyContent: 'space-between', margin: '0px'}}>
        <TableContainer w='50%' h='100vh' style={{overflowY: 'auto'}}>
          <CreateObject objectsStore={objectsStore}/>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Наименование</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
            {objectsStore.objects.map((item: ObjectType) => { 
                return (
                  <Tr key={item.id} className={`object-row${objectId === item.id ? '_active' : ''}`}>
                    <Td onClick={() => handleClick(item.id)}>{item.name}</Td>
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
        {objectId ?
          <EditObject id={objectId}/>
          :
          <Center w='50%' borderWidth='1px' height='100vh'>
            <Heading size='md'>Выберите объект для редактирования.</Heading>
          </Center>
        }
    </div>
  )
}

export default observer(App)
