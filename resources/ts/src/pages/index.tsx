import { CheckIcon } from "@heroicons/react/20/solid";
import {
    ArrowRightIcon,
    BoltIcon,
    LightBulbIcon,
    PresentationChartLineIcon,
    ShieldCheckIcon,
    WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { ComponentProps, useEffect, useState } from "react";
import { HeadProvider, Link as HeadLink } from "react-head";
import { Link } from "react-router-dom";

import { useContentContext } from "../app/contexts/content";
import { useWindowSize } from "../app/hooks";

import ImageType from "../app/types/models/image";
import TestimonialType from "../app/types/models/testimonial";
import PublicationType from "../app/types/models/publication";

import { Head } from "../components/frontend/navigation/layout";
import ImageBlock from "../components/frontend/ui/blocks/image";
import SectionBlock from "../components/frontend/ui/blocks/section";
import ServiceBlock from "../components/frontend/ui/blocks/service";
import PublicationBlock from "../components/frontend/ui/blocks/publication";
import TestimonialBlock from "../components/frontend/ui/blocks/testimonial";
import Button from "../components/frontend/ui/form/button";
import SectionTitle from "../components/frontend/ui/title/section";
import SolutionBlock from "../components/frontend/ui/blocks/solution";

type HomeDataType = {
    images: ImageType[];
    testimonials: TestimonialType[];
    publications: PublicationType[];
};

const Li = (props: ComponentProps<"li">) => (
    <li className="flex" {...props}>
        <CheckIcon className="mr-2 w-4 text-primary" />
        {props.children}
    </li>
);

const HomePage = () => {
    const { width } = useWindowSize();

    const { content } = useContentContext();
    const {
        services,
        cms: {
            global: { app_name },
            frontend: {
                components: { solutions },
                pages: { home: cms },
            },
        },
    } = content!;

    const [home, setProducts] = useState<HomeDataType>({
        images: [],
        testimonials: [],
        publications: [],
    });

    useEffect(() => {
        axios
            .get<HomeDataType>(`/api/home`)
            .then((res) => setProducts(res.data));
    }, []);

    const servicesContent = services
        .filter((_service, i) => i < 3)
        .map((service) => (
            <div
                key={`service-${service.id}`}
                className="w-full flex-none px-2 md:w-1/2 md:px-3 xl:w-1/3"
            >
                <ServiceBlock {...service} />
            </div>
        ));

    const solutionsContent = solutions.map((solution, i) => {
        const Icon = [
            LightBulbIcon,
            PresentationChartLineIcon,
            BoltIcon,
            ShieldCheckIcon,
            WrenchScrewdriverIcon,
        ][i];

        return (
            <div
                key={`solution-${solution}`}
                className="flex w-1/2 flex-none flex-col p-2 md:w-1/3 md:p-3"
            >
                <SolutionBlock
                    icon={Icon}
                    title={solution}
                    rank={i + 1}
                    description={
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati nemo quae error deserunt dignissimos doloremque, dolorum fugit veniam quam ducimus! Ullam doloribus maxime dignissimos quo ex quibusdam, alias excepturi voluptate?"
                    }
                />
            </div>
        );
    });

    const galleryContent = home.images.map(
        (image: ImageType, index: number) => (
            <ImageBlock key={`image-${image.id}-${index}`} {...image} />
        )
    );

    const testimonialsContent = [];
    const renderTestimonial = (testimonial: TestimonialType, index: number) => (
        <TestimonialBlock
            key={`testimonial-${testimonial.link}-${index}`}
            {...testimonial}
        />
    );
    for (let i = 0; i < Math.ceil(home.testimonials.length / 2); i++) {
        testimonialsContent.push(
            <li key={`testimonialsContent-${i}`}>
                <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                    {renderTestimonial(home.testimonials[2 * i], 2 * i)}
                    {home.testimonials.length > 2 * i + 1 &&
                        renderTestimonial(
                            home.testimonials[2 * i + 1],
                            2 * i + 1
                        )}
                </ul>
            </li>
        );
    }

    const publicationsContent = home.publications.map(
        (publication: PublicationType, index: number) => (
            <div
                key={`publication-${publication.id}-${index}`}
                className="w-full flex-none px-2 md:w-1/2 md:px-3 xl:w-1/3"
            >
                <PublicationBlock {...publication} />
            </div>
        )
    );

    return (
        <>
            <Head
                link="/"
                title={app_name}
                description={cms.about.description}
            />
            <HeadProvider>
                <HeadLink
                    rel="preload"
                    as="image"
                    imageSizes="(max-width: 1400px) 100vw, 1400px"
                    imageSrcSet="
                              /images/frontend/industrie_lk4epn/industrie_lk4epn_c_scale,w_200.webp 200w,
                              /images/frontend/industrie_lk4epn/industrie_lk4epn_c_scale,w_427.webp 427w,
                              /images/frontend/industrie_lk4epn/industrie_lk4epn_c_scale,w_814.webp 814w,
                              /images/frontend/industrie_lk4epn/industrie_lk4epn_c_scale,w_843.webp 843w,
                              /images/frontend/industrie_lk4epn/industrie_lk4epn_c_scale,w_942.webp 942w,
                              /images/frontend/industrie_lk4epn/industrie_lk4epn_c_scale,w_1051.webp 1051w,
                              /images/frontend/industrie_lk4epn/industrie_lk4epn_c_scale,w_1174.webp 1174w,
                              /images/frontend/industrie_lk4epn/industrie_lk4epn_c_scale,w_1292.webp 1292w,
                              /images/frontend/industrie_lk4epn/industrie_lk4epn_c_scale,w_1396.webp 1396w,
                              /images/frontend/industrie_lk4epn/industrie_lk4epn_c_scale,w_1400.webp 1400w"
                    href="/images/frontend/industrie.webp"
                    className="image-cover"
                />
            </HeadProvider>
            <main>
                <header className="relative z-0 flex flex-col items-center justify-center py-40 text-center text-white lg:py-52">
                    <div className="absolute inset-0 -z-20 after:absolute after:inset-0 after:bg-primary/30">
                        <img
                            sizes="(max-width: 1400px) 100vw, 1400px"
                            srcSet="
                              /images/frontend/industrie_lk4epn/industrie_lk4epn_c_scale,w_200.webp 200w,
                              /images/frontend/industrie_lk4epn/industrie_lk4epn_c_scale,w_427.webp 427w,
                              /images/frontend/industrie_lk4epn/industrie_lk4epn_c_scale,w_814.webp 814w,
                              /images/frontend/industrie_lk4epn/industrie_lk4epn_c_scale,w_843.webp 843w,
                              /images/frontend/industrie_lk4epn/industrie_lk4epn_c_scale,w_942.webp 942w,
                              /images/frontend/industrie_lk4epn/industrie_lk4epn_c_scale,w_1051.webp 1051w,
                              /images/frontend/industrie_lk4epn/industrie_lk4epn_c_scale,w_1174.webp 1174w,
                              /images/frontend/industrie_lk4epn/industrie_lk4epn_c_scale,w_1292.webp 1292w,
                              /images/frontend/industrie_lk4epn/industrie_lk4epn_c_scale,w_1396.webp 1396w,
                              /images/frontend/industrie_lk4epn/industrie_lk4epn_c_scale,w_1400.webp 1400w"
                            src="/images/frontend/industrie.webp"
                            alt="Banner BG"
                            className="image-cover"
                        />
                    </div>

                    <div className="container">
                        <h1 className="font-display mx-auto max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl">
                            {cms.banner.title}
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-2xl tracking-tight">
                            {cms.banner.subtitle}
                        </p>
                    </div>
                </header>

                <SectionBlock id="about" className="flex items-center">
                    <div className="container">
                        <div className="grid md:grid-cols-2 md:gap-12">
                            <div>
                                <SectionTitle title={cms.about.title} />

                                <div
                                    className="mb-5 md:mb-14"
                                    dangerouslySetInnerHTML={{
                                        __html: cms.about.description,
                                    }}
                                />

                                <div className="hidden md:block">
                                    <Link to="/about">
                                        <Button icon={ArrowRightIcon}>
                                            {cms.about.read_more}
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <div className="relative md:pl-[34.79px] md:pr-[36.81px] md:pb-[38px]">
                                    <div className="relative aspect-square md:aspect-[4/3]">
                                        <img
                                            sizes="(max-width: 1060px) 100vw, 1060px"
                                            srcSet="
                                              /images/frontend/technician_vparuh/technician_vparuh_c_scale,w_200.webp 200w,
                                              /images/frontend/technician_vparuh/technician_vparuh_c_scale,w_825.webp 825w,
                                              /images/frontend/technician_vparuh/technician_vparuh_c_scale,w_1060.webp 1060w"
                                            src="/images/frontend/technician.webp"
                                            alt="Banner"
                                            className="image-cover absolute top-0 z-20 rounded-[30px]"
                                        />
                                    </div>

                                    <div className="ratio-4by3 absolute bottom-0 left-0 z-0 w-2/5 rounded-[38.0488px] bg-orange/10 shadow-lg shadow-orange/10" />
                                    <div className="ratio-4by3 absolute top-0 right-0 z-0 w-3/5 rounded-[30px] bg-primary/10 shadow-lg shadow-primary/10" />
                                </div>

                                <div className="mt-[39.13px] text-center md:hidden">
                                    <Link to="/about">
                                        <Button icon={ArrowRightIcon}>
                                            {cms.about.read_more}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </SectionBlock>

                <SectionBlock
                    id="services"
                    className="relative z-0 bg-grid-primary/[0.05] after:absolute after:inset-0 after:bottom-0 after:-z-10 after:bg-gradient-to-t after:from-white after:to-transparent"
                >
                    <div className="container">
                        <SectionTitle centered title={cms.services.title} />

                        <div className="-mx-7 mb-6 flex flex-nowrap overflow-auto px-5 md:flex-wrap md:px-4">
                            {servicesContent}
                        </div>

                        <div className="text-center">
                            <Link to="/services">
                                <Button icon={ArrowRightIcon}>
                                    {cms.services.view_all}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </SectionBlock>

                <SectionBlock id="solutions">
                    <div className="container">
                        <SectionTitle centered title={cms.solutions.title} />

                        <div className="-mx-2 flex flex-wrap justify-center px-2 md:-mx-3 md:px-3">
                            {solutionsContent}
                        </div>
                    </div>
                </SectionBlock>

                <SectionBlock
                    id="testimonials"
                    className="relative z-0 bg-grid-primary/[0.05] after:absolute after:inset-0 after:bottom-0 after:-z-10 after:bg-gradient-to-t after:from-white after:to-transparent"
                >
                    <div className="container">
                        <div className="flex-wrap items-center lg:-mx-3 lg:flex">
                            <div className="order-1 lg:order-2 lg:w-6/12 lg:px-3">
                                <SectionTitle
                                    centered
                                    title={cms.testimonials.title}
                                />

                                <ul
                                    role="list"
                                    className="grid grid-cols-1 gap-6"
                                >
                                    {testimonialsContent}
                                </ul>
                            </div>

                            <div className="order-2 mt-16 lg:order-1 lg:mt-0 lg:w-6/12 lg:px-3">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
                                    {galleryContent}
                                </div>
                            </div>
                        </div>
                    </div>
                </SectionBlock>

                <SectionBlock id="publications">
                    <div className="container">
                        <SectionTitle centered title={cms.publications.title} />

                        <div className="-mx-7 mb-6 flex flex-nowrap overflow-auto px-5 pb-5 md:flex-wrap md:px-4">
                            {publicationsContent}
                        </div>

                        <div className="text-center">
                            <Link to="/blog">
                                <Button icon={ArrowRightIcon}>
                                    {cms.publications.view_all}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </SectionBlock>
            </main>
        </>
    );
};

export default HomePage;
