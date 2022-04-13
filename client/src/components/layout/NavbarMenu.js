import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logoutIcon from '../../assets/logout.svg'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext, useState } from 'react'


const NavbarMenu = () => {
	const {
		authState: {
			user: { username }
		},
		logoutUser
	} = useContext(AuthContext)

	const logout = () => logoutUser()


	const [isSelect, setIsSelect] = useState([{},{},{},{}])

	//'border-bottom': '1px solid white'
	return (
		<Navbar expand='lg' bg='primary' variant='dark' className='shadow px-4'>
			<Navbar.Brand className='font-weight-bolder text-white border border-white p-1 ' to='/dashboard' as={Link}>
				MERN HOTEL
			</Navbar.Brand>

			<Navbar.Toggle aria-controls='basic-navbar-nav' />

			<Navbar.Collapse id='basic-navbar-nav' className='d-flex justify-content-between'>
				<Nav className='mr-auto'>
					<Nav.Link
						className='font-weight-bolder text-white mx-2'
						style={isSelect[0]}
						to='/booking'
						as={Link}
						onClick={() => setIsSelect([{'border-bottom': '2px solid white'},{},{},{}])}
					>
						ĐẶT PHÒNG
					</Nav.Link>
					<Nav.Link
						className='font-weight-bolder text-white  mx-2'
						style={isSelect[1]}
						to='/system-management'
						as={Link}
						onClick={() => setIsSelect([{},{'border-bottom': '2px solid white'},{},{}])}
					>
						QUẢN LÝ HỆ THỐNG
					</Nav.Link>
					<Nav.Link
						className='font-weight-bolder text-white mx-2'
						style={isSelect[2]}
						to='/revenue-management'
						as={Link}
						onClick={() => setIsSelect([{},{},{'border-bottom': '2px solid white'},{}])}
					>
						QUẢN LÝ THU CHI
					</Nav.Link>
					<Nav.Link
						className='font-weight-bolder text-white  mx-2'
						style={isSelect[3]}
						to='/account-management'
						as={Link}
						onClick={() => setIsSelect([{},{},{},{'border-bottom': '2px solid white'}])}
					>
						TÀI KHOẢN
					</Nav.Link>
				</Nav>

				<Nav>
					<Nav.Link className='font-weight-bolder text-white' disabled>
						Welcome {username}
					</Nav.Link>
					<Button
						variant='secondary'
						className='font-weight-bolder text-white'
						size='sm'
						onClick={logout}
					>
						<img
							src={logoutIcon}
							alt='logoutIcon'
							width='32'
							height='32'
							className='mr-2'
						/>
						Logout
					</Button>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default NavbarMenu
