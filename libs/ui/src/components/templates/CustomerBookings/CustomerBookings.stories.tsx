import { bookings } from '@parkora-org/network/src/data'
import {
  BookingsQuery,
  namedOperations,
} from '@parkora-org/network/src/generated'
import { ReduxAddUid } from '@parkora-org/store/Provider'
import type { Meta, StoryObj } from '@storybook/react'
import { graphql } from 'msw'
import { CustomerBookings } from './CustomerBookings'

const meta: Meta<typeof CustomerBookings> = {
  component: CustomerBookings,
  decorators: [(Story) => <ReduxAddUid>{Story()}</ReduxAddUid>],
}
export default meta

type Story = StoryObj<typeof CustomerBookings>

export const Primary: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query<BookingsQuery>(
          namedOperations.Query.bookings,
          (req, res, ctx) =>
            res(
              ctx.data({
                bookings: bookings.bookings,
                bookingsCount: { count: bookings.bookings.length },
              }),
            ),
        ),
      ],
    },
  },
}
