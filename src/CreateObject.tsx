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
import { ObjectState } from './types'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch } from 'react-redux'
import { CREATE_OBJECT } from './reducer'


export const CreateObject = () => {
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const id = uuidv4()
    const [state, setState] = useState<ObjectState>({
      id,
      name: "",
      address: "",
      description: "",
      dateCommissioning: "",
      image: "",
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setState((v) => ({...v, name: event.target.value}))
    }

    const handleSave = () => {
      dispatch({ type: CREATE_OBJECT, payload: state})
      onClose()
    }
  
    return (
      <>
        <Button onClick={onOpen} w='100%'>Добавить объект</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay/>
          <ModalContent>
            <ModalHeader>Добавить объект</ModalHeader>
            <ModalCloseButton/>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Наименование</FormLabel>
                <Input value={state.name} onChange={handleChange} maxLength={30}/>
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

