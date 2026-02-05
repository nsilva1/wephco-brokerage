
import logo from '../../assets/images/logo.png'
import { ShieldCheck, Sparkles, Globe2 } from 'lucide-react'
import { InstallButton } from '../../components/InstallButton'

const Home = () => {
  return (
	<div>
		<div className='flex flex-col items-center p-10 max-w-xl mx-auto'>
			<img src={logo} alt='Wephco Logo' className='h-32' />
			<h3 className='text-4xl font-bold mt-5'>Wephco</h3>
			<p className='text-primary uppercase text-sm'>Global Brokerage</p>
			<h4 className='my-8 text-center font-semibold leading-4 text-lg'>The Future of Real Estate<br /> Brokerage & Investment</h4>
			<div className='flex flex-col gap-4 my-10'>
				<div className='flex items-center gap-4'>
					<div className='bg-amber-100 p-2 rounded-lg'><ShieldCheck className='h-10 w-10 text-primary' /></div>
					<div>
						<p className='leading-3 tracking-wide'>Secure Escrow</p>
						<p className='tracking-wide'>Bank-grade transaction security</p>
					</div>
				</div>
				<div className='flex items-center gap-4'>
					<div className='bg-amber-100 p-2 rounded-lg'><Sparkles className='h-10 w-10 text-primary' /></div>
					<div>
						<p className='leading-3'>AI-Powered</p>
						<p className='tracking-wide'>Smart Insights & auto-drafting</p>
					</div>
				</div>
				<div className='flex items-center gap-4'>
					<div className='bg-amber-100 p-2 rounded-lg'><Globe2 className='h-10 w-10 text-primary' /></div>
					<div>
						<p className='leading-3'>Global Access</p>
						<p className='tracking-wide'>Invest from anywhere in the world</p>
					</div>
				</div>
			</div>
			{/* <button className='bg-primary text-white w-full font-bold rounded-xl flex items-center justify-center gap-3 p-3 hover:bg-primary/90 cursor-pointer'>
				Install
				<Download />
			</button> */}
			<InstallButton />
		</div>
	</div>
  )
}

export { Home }