import Header from '@/widgets/layout/ui/Header'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<Header />
			<div className='wrapper' style={{ background: '#fff' }}>
				{children}
			</div>
		</>
	)
}

export default Layout
