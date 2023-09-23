import { TypeOf, object, string, z } from 'zod';

enum RoleEnumType {
    ADMIN = 'admin',
    USER = 'user'
}

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: 'Name is required'
        }),
        email: string({
            required_error: 'Email adress is required'
        }).email('Invalid email address'),
        password: string({
            required_error: 'Password is required'
        })
            .min(8, 'Password must be more than 8 characters')
            .max(32, 'Password must be less than 32 characters'),
        passwordConfirm: string({
            required_error: 'Plese confirm your password'
        }),
        role: z.optional(z.nativeEnum(RoleEnumType))
    }).refine((data) => data.password == data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'Passwords do not match'
    })
});

export const loginUserSchema = object({
    body: object({
        email: string({
            required_error: 'Email adress is required'
        }).email('Invalid email address'),
        password: string({
            required_error: 'Password us required'
        }).min(8, 'Invalid email or password')
    })
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>['body'], 'passwordConfirm'>;
export type LoginUserinput = TypeOf<typeof loginUserSchema>['body'];
