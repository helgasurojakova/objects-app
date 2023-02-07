import { Input, Textarea, Image, Stack, FormControl, FormLabel, Heading } from "@chakra-ui/react"
import React, { useEffect } from "react"
import { useState } from "react"
import { ObjectState } from "./types"

export const EditWindow = (props: ObjectState) => {
  const {
      id,
      name,
      address,
      description,
      dateCommissioning,
      image,
  } = props

  const [state, setState] = useState<ObjectState>({
    id,
    name,
    address,
    description,
    dateCommissioning,
    image,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, key: string) => {
    setState((v) => ({...v, [key]: event.target.value}))
  }

  const handleImageInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files) {
      const src = URL.createObjectURL(event.target.files[0])
      setState({...state, image: src})
    }
  }

  useEffect(() => {
    setState(props)
  }, [props])

  return (
    <FormControl w='50%' borderWidth='1px' p='6'>
      <Heading mb={10}>Свойства объекта</Heading>
      <Stack spacing={3}>
        <FormLabel>Наименование</FormLabel>
        <Input type="text" value={state.name} onChange={(event) => handleChange(event, 'name')}/>
        <FormLabel>Адрес</FormLabel>
        <Input type="text" value={state.address} onChange={(event) => handleChange(event, 'address')}/>
        <FormLabel>Описание</FormLabel>
        <Textarea value={state.description} onChange={(event) => handleChange(event, 'description')}></Textarea>
        <FormLabel>Дата ввода в эксплуатацию</FormLabel>
        <Input type="date" value={state.dateCommissioning} onChange={(event) => handleChange(event, 'dateCommissioning')}/>
        <FormLabel>Изображение</FormLabel>
        <Input
          type='file'
          accept="image/*"
          onChange={handleImageInputChange}
        />
        <FormLabel>Предпросмотр:</FormLabel>
        <Image src={state.image} w='100%'  h={400} objectFit='cover'/>
      </Stack>
    </FormControl>
  )
}
