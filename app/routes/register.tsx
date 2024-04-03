import {
  Button,
  Container,
  NativeSelect,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import type { ActionFunctionArgs } from '@netlify/remix-runtime'
import {
  Form,
  Link,
  json,
  useActionData,
  useNavigation,
  type MetaFunction,
} from '@remix-run/react'
import { Layout } from '../components/Layout'

export const meta: MetaFunction = () => {
  return [
    { title: 'Percy Main Cricket and Sports Club - Gift Aid Declaration' },
  ]
}

export const action = async ({ params, request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData()
    const data = {
      title: formData.get('title'),
      firstName: formData.get('firstName'),
      surname: formData.get('surname'),
      address: formData.get('address'),
      postcode: formData.get('postcode'),
      dob: formData.get('dob'),
      telephone: formData.get('telephone'),
      email: formData.get('email'),
      payment: formData.get('payment'),
    }

    await fetch(process.env.PLAYER_REG_WEBHOOK, {
      method: 'POST',
      body: JSON.stringify(data),
    })

    return json({ success: true, error: undefined, data } as const)
  } catch (err) {
    return json({ success: false, error: 'Something went wrong' } as const)
  }
}

export default function Declaration() {
  const navigation = useNavigation()
  const result = useActionData<typeof action>()

  return (
    <Layout>
      <Container>
        <Title order={2}>Player Registration</Title>
        {result && !result.success ? (
          <p>
            We couldn't save your details. Please try again and if it's still
            not working, shout at someone.
          </p>
        ) : result && result.success ? (
          <>
            <p>Thanks for registering. Time for a great season!</p>
            <Link
              to={`/giftaid?title=${result.data.title}&firstName=${result.data.firstName}&surname=${result.data.surname}&address=${result.data.address}&postcode=${result.data.postcode}`}
            >
              If you've donated, and haven't already done so, please complete a
              gift aid declaration.
            </Link>
            <p>Our bank details for payment are:</p>
            <dl>
              <dt>Account Name</dt>
              <dd>Percy Main Cricket and Sports Club</dd>
              <dt>Sort Code</dt>
              <dd>82-12-08</dd>
              <dt>Account Number</dt>
              <dd>00057645</dd>
            </dl>
          </>
        ) : (
          <Form key="declaration" id="declaration" method="post">
            <Stack>
              <Text>
                Please fill in your details to register as a player for the 2024
                season.
              </Text>
              <TextInput name="title" label="Title" required />
              <TextInput name="firstName" label="First Name" required />
              <TextInput name="surname" label="Surname" required />
              <Textarea name="address" label="Address" required />
              <TextInput name="postcode" label="Postcode" required />
              <TextInput
                name="telephone"
                type="tel"
                label="Telephone"
                required
              />
              <TextInput name="email" type="email" label="Email" required />

              <DateInput
                name="dob"
                label="Date of birth"
                placeholder="Date of birth"
              />

              <NativeSelect
                name="payment"
                label="How do you want to pay?"
                data={[
                  'Annual £150',
                  'Annual, No Donation £100',
                  'Monthly by Standing Order of £15',
                ]}
              />

              <Button
                disabled={navigation.state === 'submitting'}
                type="submit"
              >
                Submit
              </Button>
            </Stack>
          </Form>
        )}
      </Container>
    </Layout>
  )
}
