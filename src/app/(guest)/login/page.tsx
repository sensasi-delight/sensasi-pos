'use client'

// vendors
import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'
import { FormEvent, useState } from 'react'
import { Input } from '@nextui-org/input'
import Link from 'next/link'
// icons
import { Eye, EyeOff, UserRound } from 'lucide-react'
//
import { User, users } from '@/data/users'
import PageUrlEnum from '@/enums/page-url'
import mergeClass from '@/functions/merge-class'

export default function Page() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasSelectedUser, setHasSelectedUser] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  const toggleHasSelectedUser = (key: string | number | null) =>
    setHasSelectedUser(!!key)

  const handleAuthentication = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="container mt-8">
      <div className="flex justify-center">
        <Card className="max-w-md md:min-w-[400px]">
          <CardHeader>
            <span className="mx-auto block text-xl font-bold">Masuk</span>
          </CardHeader>
          <Divider />
          <CardBody>
            <form className="space-y-4" onSubmit={handleAuthentication}>
              <Autocomplete
                label="Pilih Pengguna"
                onSelectionChange={toggleHasSelectedUser}
                isRequired
                isDisabled={isLoading}>
                {users.map((user: User) => (
                  <AutocompleteItem
                    key={user.id}
                    startContent={
                      <UserRound size={24} className="text-primary-300" />
                    }>
                    {user.name}
                  </AutocompleteItem>
                ))}
              </Autocomplete>

              {hasSelectedUser && (
                <Input
                  label="Kata Sandi"
                  isRequired
                  isDisabled={isLoading}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label="toggle password visibility">
                      {isVisible ? (
                        <EyeOff className="pointer-events-none text-2xl text-default-400" />
                      ) : (
                        <Eye className="pointer-events-none text-2xl text-default-400" />
                      )}
                    </button>
                  }
                  type={isVisible ? 'text' : 'password'}
                />
              )}

              <Button
                color="primary"
                className="w-full"
                isDisabled={!hasSelectedUser}
                isLoading={isLoading}
                type="submit">
                Masuk
              </Button>

              <Link
                href={`${PageUrlEnum.FORGOT_PASSWORD}?method=email`}
                className={mergeClass(
                  isLoading
                    ? 'pointer-events-none text-default-400'
                    : 'pointer-events-auto',
                  'my-4 block text-center text-sm',
                )}>
                Lupa Kata Sandi?
              </Link>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
