import Head from 'next/head'
import React from 'react'
import { Container } from '@material-ui/core'
import Navbar from '../components/Navbar'
import Player from '../components/Player'

interface MainLayoutProps {
	title?: string
	description?: string
	keywords?: string
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title, description, keywords }) => (
	<>
		<Head>
			<title>{title || 'Музыкальная площадка'}</title>
			<meta name='description'
			      content={`Музыкальная площадка. Здесь каждый может оставить свой трек и стать знаменитым.` + description} />
			<meta name='robots' content='index, follow' />
			<meta name='keywords' content={keywords || 'Музыка, треки, артисты'} />
			<meta name='viewport' content='width=device-width, initial-scale=1' />
		</Head>
		<Navbar />
		<Container style={{ margin: '90px 0' }}>
			{children}
		</Container>
		<Player />
	</>
)

export default MainLayout
