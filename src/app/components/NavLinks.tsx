"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
    label: string;
    href: string;
    style?: string;
}
const NavLinks = ({ label, href, style }: NavLinkProps) => {
    const pathname = usePathname();
    return (
        <Link
            href={href}
            className={`${pathname === href && "[text-shadow:0_0_4px_rgba(253,253,253,0.4)] font-bold"} text-[#f5f5f5] text-[1.5rem] ${style}`}
        >
            {label}
        </Link>
    );
};

export default NavLinks;
