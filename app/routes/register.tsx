import {
  Button,
  Container,
  Fieldset,
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
      title: formData.get('title') as string,
      name: formData.get('name') as string,
      address: formData.get('address') as string,
      postcode: formData.get('postcode') as string,
      dob: formData.get('dob') as string,
      telephone: formData.get('telephone') as string,
      email: formData.get('email') as string,
      emerg_name: formData.get('emerg_name') as string,
      emerg_phone: formData.get('emerg_phone') as string,
      health: formData.get('health') as string,
      payment: formData.get('payment') as string,
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
      <Container style={{ padding: '2rem' }}>
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
              to={`/giftaid?title=${result.data.title}&firstName=${result.data.name?.split(' ')?.[0]}&surname=${result.data.name?.split(' ')?.[1]}&address=${result.data.address}&postcode=${result.data.postcode}`}
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
              <Fieldset legend="Player Details">
                <TextInput name="title" label="Title" required />
                <TextInput name="name" label="Name" required />
                <Textarea name="address" label="Address" required />
                <TextInput name="postcode" label="Postcode" required />
                <DateInput
                  name="dob"
                  label="Date of birth"
                  placeholder="Date of birth"
                />
              </Fieldset>

              <Fieldset legend="Contact Details">
                <TextInput
                  name="telephone"
                  type="tel"
                  label="Telephone"
                  required
                />
                <TextInput name="email" type="email" label="Email" required />
              </Fieldset>

              <Fieldset legend="Keeping you safe">
                <TextInput
                  name="emerg_name"
                  label="Emergency Contact Name"
                  required
                />
                <TextInput
                  name="emerg_phone"
                  type="tel"
                  label="Emergency Contact Telephone"
                  required
                />
                <Textarea
                  name="health"
                  label="Any health issues that might affect cricket?"
                />
              </Fieldset>

              <NativeSelect
                name="payment"
                label="How do you want to pay?"
                data={[
                  'Annual £150',
                  'Annual, No Donation £100',
                  'Monthly by Standing Order of £15',
                ]}
              />
              <Text>
                Payment to be made by bank transfer/standing order - account
                details available when you register.
              </Text>

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
