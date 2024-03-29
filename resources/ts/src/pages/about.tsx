import {
    ArrowRightIcon,
    EnvelopeIcon,
    MapPinIcon,
    PhoneIcon,
} from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import {
    ChangeEvent,
    ComponentProps,
    FormEvent,
    ReactElement,
    useState,
} from "react";
import { HeadProvider, Link as HeadLink } from "react-head";
import { Link } from "react-router-dom";

import { useContentContext } from "../app/contexts/content";
import Status from "../app/types/enums/status";
import MessageType from "../app/types/message";

import SocialNetworks from "../components/frontend/navigation/footer/social-networks";
import Layout, { Head } from "../components/frontend/navigation/layout";
import Alert from "../components/frontend/ui/alert";
import SectionBlock from "../components/frontend/ui/blocks/section";
import ServiceBlock from "../components/frontend/ui/blocks/service";
import Button from "../components/frontend/ui/form/button";
import Input from "../components/frontend/ui/form/input";
import PageTitle from "../components/frontend/ui/title/page";
import SectionTitle from "../components/frontend/ui/title/section";

const initialState = {
    first_name: "",
    email: "",
};

const Li = (props: ComponentProps<"li">) => (
    <li className="flex" {...props}>
        <CheckIcon className="mr-2 w-4 text-primary" />
        {props.children}
    </li>
);

const Article = (props: ComponentProps<"article"> & { title: string }) => (
    <article {...props}>
        <div className="mb-1 font-semibold text-primary">{props.title}</div>

        <div>{props.children}</div>
    </article>
);

const AboutPage = () => {
    const { content } = useContentContext();
    const {
        services,
        cms: {
            global: { app_name, contact },
            frontend: {
                header: { menu },
                pages: { about: cms },
            },
        },
    } = content!;

    const [status, setStatus] = useState(Status.IDLE);
    const [message, setMessage] = useState<MessageType | null>(null);
    const [value, setValue] = useState({ ...initialState });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (status === Status.LOADING) return;
        try {
            setStatus(Status.LOADING);
            const res = await axios.post<{ message: MessageType }>(
                "/api/newsletter",
                value
            );
            setMessage(res.data.message);
            setStatus(Status.IDLE);
            setValue({ ...initialState });
        } catch (error) {
            setMessage({ type: "danger", content: (error as Error).message });
            setStatus(Status.FAILED);
        }
    };

    const onChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setValue((v) => ({ ...v, [name]: value }));
    };

    const servicesContent = services
        .filter((_service, i) => i < 3)
        .map((service) => (
            <div
                key={`service-${service.id}`}
                className="w-full flex-none px-2 md:w-1/2 md:px-3 xl:w-1/3"
            >
                <ServiceBlock white {...service} />
            </div>
        ));

    return (
        <>
            <Head
                link="/about"
                title={`${menu.about} | ${app_name}`}
                description={cms.description}
            />
            <HeadProvider>
                <HeadLink rel="preconnect" href="https://www.google.com" />
                <HeadLink
                    rel="preload"
                    as="image"
                    imageSizes="(max-width: 628px) 100vw, 628px"
                    imageSrcSet="
                        /images/frontend/15_afeho2/15_afeho2_c_scale,w_200.webp 200w,
                        /images/frontend/15_afeho2/15_afeho2_c_scale,w_628.webp 628w"
                    href="/images/frontend/15.webp"
                    className="image-cover"
                />
            </HeadProvider>
            <main>
                <PageTitle title={cms.title} />

                <SectionBlock id="about" className="flex items-center">
                    <div className="container">
                        <SectionTitle centered title={cms.about.title} />

                        <div className="grid gap-6 md:grid-cols-3">
                            <div>
                                <div className="relative">
                                    <img
                                        src="/images/frontend/15.webp"
                                        alt="Banner"
                                        className="top-0 z-20 rounded-[30px]"
                                    />
                                    {/* <div className="aspect-square relative">
                                </div> */}
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <div className="space-y-6">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: cms.about.description,
                                        }}
                                    />

                                    <Article title={cms.about.goal.title}>
                                        <ul>
                                            {cms.about.goal.items.map(
                                                (goal, i) => (
                                                    <Li
                                                        key={`about-about-goal-${i}`}
                                                    >
                                                        {goal}
                                                    </Li>
                                                )
                                            )}
                                        </ul>
                                    </Article>

                                    <Article title={cms.about.strengths.title}>
                                        <ul>
                                            {cms.about.strengths.items.map(
                                                (strength, i) => (
                                                    <Li
                                                        key={`about-about-strength-${i}`}
                                                    >
                                                        {strength}
                                                    </Li>
                                                )
                                            )}
                                        </ul>
                                    </Article>
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <div className="space-y-6">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: cms.about.expertise,
                                        }}
                                    />

                                    <Article title={cms.about.follow.title}>
                                        {cms.about.follow.body}
                                    </Article>
                                </div>
                            </div>

                            <div>
                                <div className="relative">
                                    <div className="relative aspect-video">
                                        <img
                                            src="/images/frontend/page-2.webp"
                                            alt="Banner"
                                            className="image-cover absolute top-0 z-20 rounded-[30px]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SectionBlock>

                <SectionBlock
                    id="services"
                    className="relative z-0 before:absolute before:inset-0 before:-z-10 before:bg-grid-white/[0.05] after:absolute after:inset-0 after:bottom-0 after:-z-20 after:bg-gradient-to-t after:from-primary after:to-primary/60"
                >
                    <div className="container">
                        <SectionTitle
                            white
                            centered
                            title={cms.services.title}
                        />

                        <div className="-mx-7 mb-6 flex flex-nowrap overflow-auto px-5 md:flex-wrap md:px-4">
                            {servicesContent}
                        </div>

                        <div className="text-center">
                            <Link to="/services">
                                <Button color="white" icon={ArrowRightIcon}>
                                    {cms.services.view_all}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </SectionBlock>

                <SectionBlock id="contact">
                    <div className="container">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="order-2 mt-[31px] pb-[49px] md:order-1 md:mt-0 md:pb-0">
                                <div className="relative aspect-video overflow-hidden rounded-[27.759px] shadow-lg">
                                    <iframe
                                        title="Location on Google Maps"
                                        src={contact.map}
                                        className="absolute inset-0 h-full w-full bg-white"
                                    />
                                </div>
                            </div>

                            <div className="order-1 md:order-2">
                                <SectionTitle
                                    head={cms.contact.head}
                                    title={cms.contact.title}
                                />

                                <div className="space-y-6">
                                    <div className="flex">
                                        <div>
                                            <div className="w-12">
                                                <MapPinIcon className="w-7 text-primary" />
                                            </div>
                                        </div>

                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: cms.contact.address,
                                            }}
                                        />
                                    </div>

                                    <div className="flex">
                                        <div>
                                            <div className="w-12">
                                                <EnvelopeIcon className="w-7 text-primary" />
                                            </div>
                                        </div>

                                        <div>{contact.email}</div>
                                    </div>

                                    <div className="flex">
                                        <div>
                                            <div className="w-12">
                                                <PhoneIcon className="w-7 text-primary" />
                                            </div>
                                        </div>

                                        <div>{contact.phone}</div>
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <SocialNetworks />
                                </div>
                            </div>
                        </div>
                    </div>
                </SectionBlock>

                <SectionBlock
                    id="newsletter"
                    className="relative z-0 bg-grid-primary/[0.05] after:absolute after:inset-0 after:bottom-0 after:-z-10 after:bg-gradient-to-t after:from-white after:to-transparent"
                >
                    <div className="container">
                        <div className="mx-auto max-w-3xl">
                            <SectionTitle
                                centered
                                head={cms.newsletter.head}
                                title={cms.newsletter.title}
                            />

                            {/* <div className='mx-auto max-w-xl text-center mb-6 text-lg'>{cms.newsletter.description}</div> */}

                            {message && (
                                <Alert className="mb-4" color={message.type}>
                                    {message.content}
                                </Alert>
                            )}

                            <form onSubmit={handleSubmit}>
                                {/* <Input name='first_name' onChange={onChange} value={value.first_name} required validation={{ required: true }} placeholder={cms.newsletter.form.first_name} /> */}
                                <Input
                                    type="email"
                                    name="email"
                                    onChange={onChange}
                                    value={value.email}
                                    required
                                    validation={{
                                        required: true,
                                        isEmail: true,
                                    }}
                                    placeholder={cms.newsletter.form.email}
                                />

                                <div className="col-span-2 pt-5 text-center">
                                    <Button
                                        icon={ArrowRightIcon}
                                        status={status}
                                    >
                                        {cms.newsletter.form.submit}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </SectionBlock>
            </main>
        </>
    );
};

AboutPage;

export default AboutPage;
