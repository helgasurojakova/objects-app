import { 
  Input, 
  Textarea, 
  Image, 
  Stack, 
  FormControl, 
  FormLabel, 
  Heading, 
  Button, 
  Tooltip
} from '@chakra-ui/react'

import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { objectsStore } from './App'
import { ObjectType } from './types'

export const EditObject = observer(({ id }: { id: string }) => {
  const object = objectsStore.getObjectById(id)

  const [state, setState] = useState<ObjectType>({
    id: id,
    name: object?.name,
    address: object?.address, 
    description: object?.description,
    dateCommissioning: object?.dateCommissioning,
    image: object?.image,
  })

  useEffect(() => {
    if (object) {
      setState(object)
    }
  }, [object])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, key: string) => {
    setState((v) => ({...v, [key]: event.target.value}))
  }

  const saveHandler = () => {
    if (object) {
      object.edit(
        state.name, 
        state.address, 
        state.description, 
        state.dateCommissioning, 
        state.image
      )
    }
  }

  return (
    <FormControl w='50%' borderWidth='1px' p='6' h='100vh' style={{overflowY: 'auto'}}>
      <Heading mb={5} size='md'>Свойства объекта {state.name}</Heading>
      <Stack spacing={3}>
        <FormLabel>Наименование</FormLabel>
        <Input type="text" value={state.name || ''} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, 'name')}/>
        <FormLabel>Адрес</FormLabel>
        <Input type="text" value={state.address || ''} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, 'address')}/>
        <FormLabel>Описание</FormLabel>
        <Textarea value={state.description || ''} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(event, 'description')}></Textarea>
        <FormLabel>Дата ввода в эксплуатацию</FormLabel>
        <Input type="date" value={state.dateCommissioning || ''} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, 'dateCommissioning')}/>
        <FormLabel>Изображение</FormLabel>
        <Tooltip label='Вставьте ссылку на изображение'>
          <Input
            type='url'
            value={state.image || ''}
            placeholder="https://image.com"
            pattern="https://.*"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, 'image')}
          />
        </Tooltip>
        {state.image &&
          <>
          <FormLabel>Предпросмотр:</FormLabel>
          <Image src={state.image || ''} w='100%'  h={400} objectFit='cover'/>
          </>
        }
        <Button colorScheme='blue' onClick={saveHandler} style={{width: 'fit-content'}}>Сохранить изменения</Button>
      </Stack>
    </FormControl>
  )
})
