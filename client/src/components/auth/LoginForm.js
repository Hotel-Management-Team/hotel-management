import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'


const LoginForm = () => {

	return (
		<>
			<Form className='my-4'>

				<Form.Group>
					<Form.Control 
						className='my-3 py-2'
						type='text'
						placeholder='Email'
						name='email'
						required
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						className='my-3 py-2'
						type='password'
						placeholder='Password'
						name='password'
						required
					/>
				</Form.Group>
				<Button className='px-5' variant='success' type='submit'>
					Login
				</Button>
			</Form>
			<p>
				Don't have an account?
				<Link to='/register'>
					<Button variant='info' size='sm' className='ml-2'>
						Register
					</Button>
				</Link>
			</p>
		</>
	)
}

export default LoginForm
