import { Card } from 'flowbite-react'
const Home = () => {
  return (
    <div>
        <p className='text-center text-lg font-extrabold'>Azure Cogntive service Categories</p>
        <div className='grid grid-cols-4 gap-4 justify-center mt-[10vh]'>
<Card href='/vision' className='vision'>
<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
       Vision service
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
    Includes Computer vision,Custom Vision,Face detection
  </p>
</Card>
<Card href="/speech" className='speech'>
<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
       Speech Service
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
       Speech-to-text,text-to-speech,speech-translation,speech recognition
  </p>
</Card>
<Card href='/language' className='language'>
<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    Language service
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      Language detection,Language translation,Language identification
  </p>
</Card>
<Card href='.decision' className='decision'>
<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
       Decision service
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
  Decision-making,Decision-making,Decision-making,Decision-making
  </p>
</Card>
        </div>
      
    </div>
  )
}

export default Home