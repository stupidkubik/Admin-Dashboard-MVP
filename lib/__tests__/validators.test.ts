import { userSchema } from '../validators'

describe('userSchema', () => {
  it('validates a correct user', () => {
    const data = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      role: 'admin',
      active: true,
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
