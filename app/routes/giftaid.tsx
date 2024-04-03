import {
  Button,
  Checkbox,
  Container,
  Group,
  InputLabel,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core'
import type { ActionFunctionArgs } from '@netlify/remix-runtime'
import {
  Form,
  json,
  useActionData,
  useNavigation,
  useSearchParams,
  type MetaFunction,
} from '@remix-run/react'
import { Layout } from '../components/Layout'

export const meta: MetaFunction = () => {
  return [
    { title: 'Percy Main Cricket and Sports Club - Gift Aid Declaration' },
  ]
}

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const response = await fetch(process.env.GIFT_AID_WEBHOOK, {
    method: 'POST',
    body: JSON.stringify({
      title: formData.get('title'),
      firstName: formData.get('firstName'),
      surname: formData.get('surname'),
      address: formData.get('address'),
      postcode: formData.get('postcode'),
    }),
  })

  const url: string = await response.json()

  return json({ url })
}

export default function Declaration() {
  const navigation = useNavigation()
  const result = useActionData<typeof action>()

  const [params] = useSearchParams()

  const title = params.get('title') ?? undefined
  const firstName = params.get('firstName') ?? undefined
  const surname = params.get('surname') ?? undefined
  const address = params.get('address') ?? undefined
  const postcode = params.get('postcode') ?? undefined

  return (
    <Layout>
      <Container>
        <Title order={2}>Gift Aid Declaration</Title>
        {result?.url ? (
          <p>
            Your declaration has been submitted. You can view your declaration{' '}
            <a target="_blank" rel="noreferrer" href={result.url}>
              here
            </a>
            .
          </p>
        ) : (
          <Form key="declaration" id="declaration" method="post">
            <Stack>
              <Text>
                Boost your donation by 25p of Gift Aid for every £1 you donate
                Gift Aid is reclaimed by the charity from the tax you pay for
                the current tax year. Your address is needed to identify you as
                a current UK taxpayer.
              </Text>
              <TextInput
                name="title"
                label="Title"
                defaultValue={title}
                required
              />
              <TextInput
                name="firstName"
                label="First Name"
                defaultValue={firstName}
                required
              />
              <TextInput
                name="surname"
                label="Surname"
                defaultValue={surname}
                required
              />
              <Textarea
                name="address"
                label="Address"
                defaultValue={address}
                required
              />
              <TextInput
                name="postcode"
                label="Postcode"
                defaultValue={postcode}
                required
              />

              <InputLabel>
                <Group wrap="nowrap">
                  <Checkbox required />
                  <Text>
                    I am a UK taxpayer and understand that if I pay less Income
                    Tax and/or Capital Gains Tax than the amount of Gift Aid
                    claimed on all my donations in that tax year it is my
                    responsibility to pay any difference.
                  </Text>
                </Group>
              </InputLabel>

              <InputLabel>
                <Group wrap="nowrap">
                  <Checkbox required />
                  <Text>
                    I want to Gift Aid all donations I make in the future or
                    have made in the past 4 years to Percy Main Cricket and
                    Sports Club
                  </Text>
                </Group>
              </InputLabel>

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
