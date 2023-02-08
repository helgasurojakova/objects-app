import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
  } from '@chakra-ui/react'

import { useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ObjectStore } from './store'

type CreateObjectProps = {
  objectsStore: ObjectStore
}

export const CreateObject = (props: CreateObjectProps) => {
  const { objectsStore } = props
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleSave = () => {
    objectsStore.add(name)
    onClose()
  }
  
  return (
    <>
      <Button colorScheme='blue' onClick={onOpen} w='100%' m='24px' style={{width: 'fit-content'}}>Добавить объект</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Добавить объект</ModalHeader>
          <ModalCloseButton/>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Наименование</FormLabel>
              <Input value={name} onChange={handleChange} maxLength={30}/>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSave}>Сохранить</Button>
            <Button onClick={onClose}>Отмена</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

