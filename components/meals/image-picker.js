'use client'
import { useRef, useState } from 'react'
import classes from './image-picker.module.css'
import Image from 'next/image'

export default function ImagePicker({ label, name }) {
  const imageInpRef = useRef()
  const [pickedImage, setPickedImage] = useState()

  const handleImagePick = () => {
    imageInpRef.current.click()
  }

  const handleImageChange = (event) => {
    // const file = imageInpRef.current.files[0]
    const file = event.target.files[0]

    if (!file) {
      setPickedImage(null)
      return
    }

    const fileReader = new FileReader()
    fileReader.onload = () => {
      setPickedImage(fileReader.result)
    }
    fileReader.readAsDataURL(file)
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {pickedImage ? (
            <Image
              src={pickedImage}
              alt='Picked by user'
              layout='fill'
              objectFit='cover'
            />
          ) : (
            <p>No image picked yet.</p>
          )}
        </div>
        <input
          className={classes.input}
          type='file'
          id={name}
          name={name}
          accept='image/*'
          ref={imageInpRef}
          onChange={handleImageChange}
          required
        />
        <button
          className={classes.button}
          type='button'
          onClick={handleImagePick}
        >
          PICK AN IMAGE
        </button>
      </div>
    </div>
  )
}
