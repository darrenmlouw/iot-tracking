import logo from '@/assets/logo.png';

const Home = () => {
	return (
		<div className="flex flex-col lg:flex-row sm:items-center sm:justify-start md:items-start w-full h-full sm:pt-5 md:pt-10 lg:pt-20 ">
			<div className="flex w-full lg:h-full justify-center items-start mb-6 lg:mb-0 p-10">
				<div className="flex rounded-xl p-2 relative">
					<div
						className="absolute inset-0 rounded-xl"
						style={{
							backgroundImage: 'var(--logo-home-hero-image-background-image)',
							filter: 'var(--logo-home-hero-image-filter)',
						}}
					></div>
					<img
						src={logo}
						alt="OptiMIM Logo"
						className="object-cover md:max-w-sm lg:max-w-md xl:max-w-lg relative z-10"
					/>
				</div>
			</div>

			<div className="flex flex-col space-y-4 lg:w-full lg:h-full items-center lg:items-start p-5 md:p-10 lg:p-10">
				<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground text-center lg:text-left">
					OptiMIM
				</h1>
				<p className="text-3xl md:text-4xl lg:text-5xl font-semibold text-secondary-foreground text-center lg:text-left">
					Fueling the Future of Industry
				</p>
				<p className="text-lg md:text-xl text-muted text-center lg:text-left">
					OptiMIM transforms fuel management with precision and efficiency,
					driving sustainability and operational excellence in industrial
					landscapes.
				</p>
			</div>
		</div>
	);
};

export default Home;
