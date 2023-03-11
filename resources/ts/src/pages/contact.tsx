import {
    ArrowRightIcon,
    EnvelopeIcon,
    MapPinIcon,
    PhoneIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import React, { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import { HeadProvider, Link as HeadLink } from "react-head";

import { useContentContext } from "../app/contexts/content";
import MessageType from "../app/types/message";
import Status from "../app/types/enums/status";

import Alert from "../components/frontend/ui/alert";
import SectionBlock from "../components/frontend/ui/blocks/section";
import Button from "../components/frontend/ui/form/button";
import Input from "../components/frontend/ui/form/input";
import TextArea from "../components/frontend/ui/form/text-area";
import SocialNetworks from "../components/frontend/navigation/footer/social-networks";
import Layout, { Head } from "../components/frontend/navigation/layout";
import PageTitle from "../components/frontend/ui/title/page";
import SectionTitle from "../components/frontend/ui/title/section";

const initialState = {
    name: "",
    email: "",
    subject: "",
    message: "",
};

const ContactPage = () => {
    const { content } = useContentContext();
    const {
        cms: {
            global: { app_name, contact },
            frontend: {
                header: { menu },
                pages: { contact: cms },
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
                "/api/contact",
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

    return (
        <>
            <Head
                link="/contact"
                title={`${menu.contact} | ${app_name}`}
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
                                <SectionTitle title={cms.contact.title} />

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
                    id="form"
                    className="relative z-0 bg-grid-primary/[0.05] after:absolute after:inset-0 after:bottom-0 after:-z-10 after:bg-gradient-to-t after:from-white after:to-transparent"
                >
                    <div className="container">
                        <div className="mx-auto max-w-3xl">
                            <SectionTitle centered head={cms.form.head} />

                            <div
                                className="mx-auto mb-6 max-w-xl text-center text-lg"
                                dangerouslySetInnerHTML={{
                                    __html: cms.form.description,
                                }}
                            />

                            {message && (
                                <Alert className="mb-4" color={message.type}>
                                    {message.content}
                                </Alert>
                            )}

                            <form
                                onSubmit={handleSubmit}
                                className="grid grid-cols-2 gap-4"
                            >
                                <Input
                                    name="name"
                                    onChange={onChange}
                                    value={value.name}
                                    required
                                    validation={{ required: true }}
                                    placeholder={cms.form.name}
                                />
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
                                    placeholder={cms.form.email}
                                />
                                <Input
                                    className="col-span-2"
                                    name="subject"
                                    onChange={onChange}
                                    value={value.subject}
                                    required
                                    validation={{ required: true }}
                                    placeholder={cms.form.subject}
                                />
                                <TextArea
                                    className="col-span-2"
                                    name="message"
                                    onChange={onChange}
                                    value={value.message}
                                    required
                                    validation={{ required: true }}
                                    placeholder={cms.form.message}
                                />

                                <div className="col-span-2 pt-5 text-center">
                                    <Button
                                        icon={ArrowRightIcon}
                                        status={status}
                                    >
                                        {cms.form.submit}
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

ContactPage;

export default ContactPage;
