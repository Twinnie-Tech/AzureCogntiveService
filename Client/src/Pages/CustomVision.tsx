import React from 'react'
import { Card } from 'flowbite-react'
import { Link } from 'react-router-dom'
const CustomVision = () => {
  return (
    <div className='grid grid-cols-2 gap-6 mx-8'>
        <Link to="/vision/tags">
        <Card>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Tags
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
       Helps one to know what the image contains
      </p>
        </Card>
        </Link>
        <Link to="/vision/brands">
        <Card>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Brand
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
       Check to see if the image is a barand of a product
      </p>
        </Card>
        </Link>
        <Link to="/vision/compare">
        <Card>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Compare
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      Compare two images to see if they match
      </p>
        </Card>
        </Link>
        <Link to="/vision/colors">
        <Card>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Color Scheme
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
     Check the various color scheme content in an image
      </p>
        </Card>
        </Link>
        <Link to="/vision/adult">
        <Card>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Prevent exploitation of Children
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
     Remove any exploting content before your eyes and children
      </p>
        </Card>
        </Link>
    </div>
  )
}

export default CustomVision