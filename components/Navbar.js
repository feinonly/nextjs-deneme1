import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link href="/">Ana Sayfa</Link>
            <Link href="/about">Hakkında</Link>
            <Link href="/services">Hizmetler</Link>
            <Link href="/contact">İletişim</Link>
        </nav>
    );
};

export default Navbar;