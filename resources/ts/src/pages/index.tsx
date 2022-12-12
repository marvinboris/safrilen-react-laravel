import { CheckIcon } from '@heroicons/react/20/solid'
import { ArrowRightIcon, BoltIcon, LightBulbIcon, PresentationChartLineIcon, ShieldCheckIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ComponentProps, useEffect, useState } from 'react'

import { useContentContext } from '../app/contexts/content'
import { useWindowSize } from '../app/hooks'

import ImageType from '../app/types/models/image'
import TestimonialType from '../app/types/models/testimonial'
import PublicationType from '../app/types/models/publication'

import { Head } from '../components/frontend/navigation/layout'
import ImageBlock from '../components/frontend/ui/blocks/image'
import SectionBlock from '../components/frontend/ui/blocks/section'
import ServiceBlock from '../components/frontend/ui/blocks/service'
import PublicationBlock from '../components/frontend/ui/blocks/publication'
import TestimonialBlock from '../components/frontend/ui/blocks/testimonial'
import Button from '../components/frontend/ui/form/button'
import SectionTitle from '../components/frontend/ui/title/section'
import SolutionBlock from '../components/frontend/ui/blocks/solution'

type HomeDataType = { images: ImageType[], testimonials: TestimonialType[], publications: PublicationType[] }

const Li = (props: ComponentProps<'li'>) => <li className='flex' {...props}>
  <CheckIcon className='w-4 mr-2 text-primary' />{props.children}
</li>

const HomePage = () => {
  const { width } = useWindowSize()

  const { content } = useContentContext()
  const { services, cms: { global: { app_name }, frontend: { components: { solutions }, pages: { home: cms } } } } = content!

  const [home, setProducts] = useState<HomeDataType>({ images: [], testimonials: [], publications: [] })

  useEffect(() => {
    axios.get<HomeDataType>(`/api/home`).then(res => setProducts(res.data))
  }, [])

  const servicesContent = services.filter((_service, i) => i < 3).map(service => <div key={`service-${service.id}`} className='flex-none w-full md:w-1/2 xl:w-1/3 px-2 md:px-3'>
    <ServiceBlock {...service} />
  </div>)

  const solutionsContent = solutions.map((solution, i) => {
    const Icon = [LightBulbIcon, PresentationChartLineIcon, BoltIcon, ShieldCheckIcon, WrenchScrewdriverIcon][i]

    return <div key={`solution-${solution}`} className="flex-none flex flex-col w-1/2 md:w-1/3 p-2 md:p-3">
      <SolutionBlock icon={Icon} title={solution} description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati nemo quae error deserunt dignissimos doloremque, dolorum fugit veniam quam ducimus! Ullam doloribus maxime dignissimos quo ex quibusdam, alias excepturi voluptate?"} />
    </div>
  })

  const carouselContent = [
    '/images/gallery/hobi-industri-NLBJ2I0lNr4-unsplash.jpg',
    '/images/frontend/danilo-alvesd-AzqJSCPkZkI-unsplash.jpg',
    '/images/gallery/thomas-kelley-xVptEZzgVfo-unsplash.jpg',
  ].map(src => <div key={`carousel-item-${src}`} className='before:absolute before:inset-0 before:bg-grid-white/[0.05] before:z-20 after:absolute after:inset-0 after:bg-gradient-to-t after:from-primary/70 after:to-primary/30 after:z-10 w-full h-full'>
    <img src={src} alt='Bannière' className='image-cover' />
  </div>)

  const galleryContent = home.images.map((image: ImageType, index: number) => <ImageBlock key={`image-${image.id}-${index}`} {...image} />)

  const testimonialsContent = []
  const renderTestimonial = (testimonial: TestimonialType, index: number) => <TestimonialBlock key={`testimonial-${testimonial.body}-${index}`} {...testimonial} />
  for (let i = 0; i < Math.ceil(home.testimonials.length / 2); i++) {
    testimonialsContent.push(<li key={`testimonialsContent-${i}`}>
      <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
        {renderTestimonial(home.testimonials[2 * i], 2 * i)}
        {(home.testimonials.length > 2 * i + 1) && renderTestimonial(home.testimonials[2 * i + 1], 2 * i + 1)}
      </ul>
    </li>)
  }

  const publicationsContent = home.publications.map((publication: PublicationType, index: number) => <div key={`publication-${publication.id}-${index}`} className='flex-none w-full md:w-1/2 xl:w-1/3 px-2 md:px-3'>
    <PublicationBlock {...publication} />
  </div>)

  return <>
    <Head link='/' title={app_name} description={cms.about.description} />
    <main>
      <header className='py-40 lg:py-52 relative flex flex-col items-center justify-center text-center text-white z-0'>
        <div className='absolute inset-0 -z-20 after:absolute after:inset-0 after:bg-primary/30'>
          {/* <Carousel
            leftControl={width !== undefined && width > 768 ? undefined : <></>}
            rightControl={width !== undefined && width > 768 ? undefined : <></>}>
            {carouselContent}
          </Carousel> */}
          <img src='/images/frontend/industrie.jpg' alt='Banner BG' className='image-cover' />
        </div>

        <div className="container">
          <h1 className='mx-auto max-w-4xl font-display text-5xl font-extrabold tracking-tight sm:text-7xl'>{cms.banner.title}</h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight">{cms.banner.subtitle}</p>
        </div>
      </header>

      <SectionBlock id='about' className="flex items-center">
        <div className='container'>
          <div className='grid md:gap-12 md:grid-cols-2'>
            <div>
              <SectionTitle head={cms.about.head} title={cms.about.title} />

              <div className="mb-5">{cms.about.description}</div>

              <ul className='mb-6 md:mb-14'>{cms.about.services.map((service, i) => <Li key={`home-about-service-${i}`}>{service}</Li>)}</ul>

              <div className="hidden md:block">
                <Link to='/about'><Button icon={ArrowRightIcon}>{cms.about.read_more}</Button></Link>
              </div>
            </div>

            <div>
              <div className='relative md:pl-[34.79px] md:pr-[36.81px] md:pb-[38px]'>
                <div className="aspect-square md:aspect-[4/3] relative">
                  <img src="/images/frontend/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station_627829-4822.jpg" alt="Banner" className="absolute rounded-[30px] top-0 z-20 image-cover" />
                </div>

                <div className="absolute z-0 bottom-0 left-0 rounded-[38.0488px] bg-orange/10 shadow-lg shadow-orange/10 ratio-4by3 w-2/5" />
                <div className="absolute z-0 top-0 right-0 rounded-[30px] bg-primary/10 shadow-lg shadow-primary/10 ratio-4by3 w-3/5" />
              </div>

              <div className="text-center mt-[39.13px] md:hidden">
                <Link to='/about'><Button icon={ArrowRightIcon}>{cms.about.read_more}</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="services" className="bg-grid-primary/[0.05] relative z-0 after:absolute after:bottom-0 after:inset-0 after:bg-gradient-to-t after:from-white after:to-transparent after:-z-10">
        <div className="container">
          <SectionTitle centered head={cms.services.head} title={cms.services.title} />

          <div className="flex flex-nowrap md:flex-wrap overflow-auto -mx-7 px-5 md:px-4 mb-6">
            {servicesContent}
          </div>

          <div className='text-center'>
            <Link to='/services'><Button icon={ArrowRightIcon}>{cms.services.view_all}</Button></Link>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="solutions">
        <div className="container">
          <SectionTitle centered head={cms.solutions.head} title={cms.solutions.title} />

          <div className="flex flex-wrap justify-center -mx-2 px-2 md:-mx-3 md:px-3">
            {solutionsContent}
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="testimonials" className="bg-grid-primary/[0.05] relative z-0 after:absolute after:bottom-0 after:inset-0 after:bg-gradient-to-t after:from-white after:to-transparent after:-z-10">
        <div className="container">
          <div className="lg:flex flex-wrap items-center lg:-mx-3">
            <div className="order-1 lg:order-2 lg:w-6/12 xl:w-5/12 lg:px-3">
              <SectionTitle centered head={cms.testimonials.head} title={cms.testimonials.title} />

              <ul role="list" className="grid grid-cols-1 gap-6">
                {testimonialsContent}
              </ul>
            </div>

            <div className="order-2 lg:order-1 mt-16 lg:mt-0 lg:w-6/12 xl:w-7/12 lg:px-3">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 md:gap-6">
                {galleryContent}
              </div>
            </div>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="publications">
        <div className="container">
          <SectionTitle centered head={cms.publications.head} title={cms.publications.title} />

          <div className="flex flex-nowrap md:flex-wrap overflow-auto -mx-7 px-5 md:px-4 mb-6 pb-5">
            {publicationsContent}
          </div>

          <div className='text-center'>
            <Link to='/blog'><Button icon={ArrowRightIcon}>{cms.publications.view_all}</Button></Link>
          </div>
        </div>
      </SectionBlock>
    </main>
  </>
}

export default HomePage