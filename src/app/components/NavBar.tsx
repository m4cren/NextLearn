import NavLinks from "./NavLinks";

const NavBar = () => {
    return (
        <nav className="sticky top-0 flex flex-row items-center justify-between py-12 px-16 bg-[#2c2c2c90] border-2 border-white/20 m-6 rounded-[4rem] backdrop-blur-2xl">
            <h1 className="text-[2.3rem] font-bold text-[#f5f5f5]">
                MetaFeast
            </h1>
            <ul className="w-[40%] flex flex-row items-center justify-around">
                <NavLinks label="Home" href="/" />
                <NavLinks label="About" href="/about" />
                <NavLinks label="Insights" href="/insights" />
                <NavLinks
                    label="Sign Up Now"
                    href="/sign-up"
                    style="bg-[#2c2c2c] px-4 py-2 rounded-full"
                />
            </ul>
        </nav>
    );
};

export default NavBar;
