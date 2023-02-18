import { EnvelopeIcon, LockOpenIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { useContentContext } from "../../../app/contexts/content";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Status from "../../../app/types/enums/status";

import { Head } from "../../../components/auth/navigation/layout";
import Alert from "../../../components/frontend/ui/alert";
import Button from "../../../components/frontend/ui/form/button";
import Input from "../../../components/frontend/ui/form/input";

import { selectAuth, userLogin } from "../../../features/auth/authSlice";

const params = {
    link: '/auth/user/login',
    title: "Connexion utilisateur | Safrilen",
    description: "Safrilen: Page de connexion en tant qu'utilisateur"
}

const AuthUserLoginPage = () => {
    const [value, setValue] = useState({
        email: '',
        password: '',
    })

    const dispatch = useAppDispatch()
    const { token, status, message } = useAppSelector(selectAuth)

    const { content } = useContentContext()
    const { cms: { auth: { pages: { user: { login } } } } } = content!

    const navigate = useNavigate()

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue({ ...value, [e.target.name]: e.target.value })
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (status !== Status.LOADING) dispatch(userLogin(value))
    }

    useEffect(() => {
        if (token) navigate('/user/dashboard')
    }, [navigate, token])

    return <form onSubmit={onSubmit} className='max-w-lg mx-auto px-5 md:px-0 min-h-[380px] flex flex-col relative z-10'>
        <Head {...params} />

        <div className="font-bold text-primary text-lg md:text-3xl text-center md:text-left mb-[17px] md:mb-[5px]">{login.title}</div>

        <div className='text-sm md:text-lg text-center md:text-left mb-[30px] md:mb-[22px]'>{login.sign_in}</div>

        <div className='px-3 md:px-0 overflow-auto mb-6 md:mb-[33px]'>
            <div className="grid gap-x-[17.34px] gap-y-[13.63px] mb-[22.8px]">
                {message && <Alert color={message.type}>{message.content}</Alert>}
                <Input icon={EnvelopeIcon} type='email' name='email' placeholder={login.email_address} onChange={onChange} value={value.email} />
                <Input icon={LockOpenIcon} type='password' name='password' placeholder={login.password} onChange={onChange} value={value.password} />
            </div>
        </div>

        <div className="text-center">
            <Button type='submit'>{status === Status.LOADING ? <div className='w-8 h-8 rounded-full border border-t-transparent border-white animate-spin' /> : login.continue}</Button>
        </div>
    </form>
}

export default AuthUserLoginPage