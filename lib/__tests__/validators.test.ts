import { userSchema } from '../validators'

describe('userSchema', () => {
  it('validates a correct user', () => {
    const data = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      role: 'admin',
      active: true,
      password: 'Password1!',
      confirmPassword: 'Password1!',
      dateOfBirth: '1990-01-01',
      skills: ['React'],
      address: {
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '12345',
        country: 'US',
      },
      agreement: true,
      notifications: {
        email: true,
        sms: false,
        push: true,
      },
    }
    expect(userSchema.parse(data)).toMatchObject(data)
  })

  it('rejects invalid email', () => {
    const data = {
      name: 'Jane Doe',
      email: 'invalid',
      role: 'admin',
      active: true,
    }
    expect(() => userSchema.parse(data)).toThrow()
  })
})
