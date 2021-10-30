import { Switch } from '@headlessui/react'
import * as z from 'zod'
import { Form, InputField, SelectField } from '@/components/Form'
import { useAuth } from '@/config/auth'
import { useState } from 'react'
import clsx from 'clsx'
import { useTeams } from '@/features/teams/api/getTeams'
import { Button } from '@/components/Elements'
import { Link } from '@/components/Elements/Link'

const schema = z
  .object({
    email: z.string().min(1, 'Required'),
    firstName: z.string().min(1, 'Required'),
    lastName: z.string().min(1, 'Required'),
    password: z.string().min(1, 'Required'),
  })
  .and(
    z
      .object({
        teamId: z.string().min(1, 'Required'),
      })
      .or(
        z.object({
          teamName: z.string().min(1, 'Required'),
        })
      )
  )

type RegisterValues = {
  firstName: string
  lastName: string
  email: string
  password: string
  teamId: string
  teamName: string
}

type RegisterFormType = {
  onSuccess: () => void
}

export const RegisterForm = ({ onSuccess }: RegisterFormType) => {
  const { register, isRegistering } = useAuth()
  const [chooseTeam, setChooseTeam] = useState(false)

  const teamQuery = useTeams({
    config: {
      enabled: chooseTeam,
    },
  })

  return (
    <div>
      <Form<RegisterValues, typeof schema>
        onSubmit={async (values) => {
          await register(values)
          onSuccess()
        }}
        schema={schema}
        options={{
          shouldUnregister: true,
        }}>
        {({ register, formState }) => (
          <>
            <InputField
              type="text"
              label="First Name"
              error={formState.errors['firstName']}
              registration={register('firstName')}
            />
            <InputField
              type="text"
              label="Last Name"
              error={formState.errors['lastName']}
              registration={register('lastName')}
            />
            <InputField
              type="text"
              label="Email Address"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <InputField
              type="text"
              label="Password"
              error={formState.errors['password']}
              registration={register('password')}
            />
            <Switch.Group>
              <div className="flex items-center">
                <Switch
                  checked={chooseTeam}
                  onChange={setChooseTeam}
                  className={clsx(
                    'relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                    chooseTeam ? 'bg-blue-600' : 'bg-gray-200'
                  )}>
                  <span
                    className={clsx(
                      'inline-block w-4 h-4 transform bg-white rounded-full transition-transform',
                      chooseTeam ? 'translate-x-6' : 'translate-x-1'
                    )}
                  />
                </Switch>
                <Switch.Label className="ml-4">Join Existing Team</Switch.Label>
              </div>
            </Switch.Group>

            {chooseTeam && teamQuery.data ? (
              <SelectField
                label="team"
                error={formState.errors['teamId']}
                registration={register('teamId')}
                options={teamQuery?.data?.map((team) => ({
                  label: team.name,
                  value: team.id,
                }))}
              />
            ) : (
              <InputField
                type="text"
                label="Team Name"
                error={formState.errors['teamName']}
                registration={register('teamName')}
              />
            )}
            <div>
              <Button
                isLoading={isRegistering}
                type="submit"
                className="w-full">
                Register
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <Link
            href="/auth/login"
            className="font-medium text-blue-600 hover:text-blue-500">
            Log In
          </Link>
        </div>
      </div>
    </div>
  )
}
