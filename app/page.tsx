import Hero from './components/hero/hero';
import Intro from './components/intro';
import { ScrollProvider } from './components/providers/ScrollProvider';
import Works from './components/work/works';

export default function Home() {
	return (
		<ScrollProvider>
			<Hero />
			<Intro />
			<section id='work' className='scroll-mt-24'>
				<Works />
			</section>
		</ScrollProvider>
	);
}
