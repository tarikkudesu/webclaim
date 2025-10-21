'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
	name: string;
	href: string;
}

interface NavProps {
	navItems: NavItem[];
}

const Nav: React.FC<NavProps> = ({ navItems }) => {
	const pathname = usePathname();
	const [underlineStyle, setUnderlineStyle] = useState({
		width: 0,
		left: 0,
		scaleX: 0,
	});

	const [isClient, setIsClient] = useState(false);
	const navRef = useRef<HTMLDivElement>(null);
	const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		if (!isClient) return;
		const updateUnderline = () => {
			const activeIndex = navItems.findIndex((item) => pathname === item.href);
			if (activeIndex !== -1 && linksRef.current[activeIndex]) {
				const activeLink = linksRef.current[activeIndex];
				setUnderlineStyle({
					width: activeLink.offsetWidth,
					left: activeLink.offsetLeft,
					scaleX: 1,
				});
			}
		};
		updateUnderline();
		const timer = setTimeout(updateUnderline, 50);
		return () => clearTimeout(timer);
	}, [pathname, isClient, navItems]);

	return (
		<nav className="hidden md:flex items-center space-x-8 relative" ref={navRef}>
			{navItems.map((item, index) => {
				const isActive = pathname === item.href;
				return (
					<Link
						key={item.name}
						href={item.href}
						ref={(el) => {
							linksRef.current[index] = el;
						}}
						className={`transition-colors font-medium relative z-10 pb-1 ${
							isActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
						}`}
					>
						{item.name}
					</Link>
				);
			})}
			<div
				className="absolute -bottom-2 h-1 bg-gray-900 transition-all duration-300 ease-out origin-center"
				style={{
					width: `${underlineStyle.width}px`,
					left: `${underlineStyle.left}px`,
					transform: `scaleX(${underlineStyle.scaleX})`,
				}}
			/>
		</nav>
	);
};

const Header: React.FC = ({}) => {
	const navItems = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' },
		{ name: 'Services', href: '/services' },
	];

	return (
		<header className="bg-white border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<Link href="/" className="flex items-center space-x-2">
						<div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
							<svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
								<circle cx="8" cy="8" r="3" fill="white" />
								<circle cx="16" cy="8" r="3" fill="white" />
								<circle cx="8" cy="16" r="3" fill="white" />
								<circle cx="16" cy="16" r="3" fill="white" />
							</svg>
						</div>
						<span className="text-xl font-semibold text-gray-900">Asigncy</span>
					</Link>
					<Nav navItems={navItems} />
					<Link href="/contact">
						<button className="bg-gray-900 text-white px-6 py-2 rounded-full font-medium relative overflow-hidden group">
							<span className="relative z-10">Contact</span>
							<div className="absolute inset-0 bg-pink-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
						</button>
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
