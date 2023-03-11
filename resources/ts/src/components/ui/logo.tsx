import { ComponentProps } from "react";

export default function Logo(props: ComponentProps<"img">) {
    return (
        <img
            {...props}
            sizes="(max-width: 1400px) 100vw, 1400px"
            srcSet="
                /images/logo-white_sqe0tm/logo-white_sqe0tm_c_scale,w_200.webp 200w,
                /images/logo-white_sqe0tm/logo-white_sqe0tm_c_scale,w_1400.webp 1400w"
            src="/images/logo-white.webp"
            alt="Logo"
            className="h-7 w-auto md:h-10"
        />
    );
    // return <span className="text-primary font-bold text-3xl flex items-center space-x-1"><span>HIALA</span><TvIcon className="w-8" /></span>
}
