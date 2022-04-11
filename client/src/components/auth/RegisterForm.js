import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'


const RegisterForm = () => {
	return (
		<>
			<Form className='my-4' >
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
				<Form.Group>
					<Form.Control
						className='my-3 py-2'
						type='password'
						placeholder='Confirm Password'
						name='confirmPassword'
						required
						/>
				</Form.Group>
				<Button className='px-5'
				variant='success' type='submit'>
					Register
				</Button>
			</Form>
			<p>
				Already have an account?
				<Link to='/login'>
					<Button variant='info' size='sm' className='ml-2'>
						Login
					</Button>
				</Link>
			</p>
		</>
	)
}

export default RegisterForm
