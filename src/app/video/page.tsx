import Video from 'next-video'
import sampleVideo from '../../../public/sample-video.mp4';

export default function Videosts() {
  return (
    <Video
            src={sampleVideo}
            accentColor='#9333ea'
            className='max-w-[50vw]'
          />
      
  )
}