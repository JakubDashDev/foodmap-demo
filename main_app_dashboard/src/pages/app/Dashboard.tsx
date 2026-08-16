import { Link } from 'react-router'
import { HiOutlineChatBubbleLeftRight, HiOutlineMapPin, HiOutlineUserGroup } from 'react-icons/hi2'

import { Card, CardHeader } from '@/components/common/Card'
import { Container } from '@/components/common/Container'
import { Typography } from '@/components/common/Typography'

const QUICK_ACTIONS = [
  {
    to: '/locations',
    label: 'Add Location',
    description: 'Create a new location entry',
    icon: HiOutlineMapPin,
  },
  {
    to: '/reviews',
    label: 'Add Review',
    description: 'Create a new review',
    icon: HiOutlineChatBubbleLeftRight,
  },
  {
    to: '/content-creators',
    label: 'Invite Creator',
    description: 'Add a content creator',
    icon: HiOutlineUserGroup,
  },
]

const REVIEW_TABLE_COLUMNS = ['Location', 'Reviewer', 'Rating', 'Date', 'Status']

export function Dashboard() {
  return (
    <Container>
      <Typography variant="h1">Dashboard</Typography>

      <section className="mt-8">
        <Card>
          <CardHeader>
            <Typography variant="h4">Quick Actions</Typography>
          </CardHeader>

          <div className="grid grid-cols-1 divide-y divide-gray-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {QUICK_ACTIONS.map(({ to, label, description, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex flex-col items-center gap-2 px-4 py-6 text-center transition-colors hover:bg-gray-50"
              >
                <Icon className="size-6 text-primary-600" />
                <Typography variant="subtitle1" as="span">
                  {label}
                </Typography>
                <Typography variant="body2" className="text-gray-500">
                  {description}
                </Typography>
              </Link>
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-8">
        <Card>
          <CardHeader>
            <Typography variant="h4">Latest Reviews</Typography>
          </CardHeader>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  {REVIEW_TABLE_COLUMNS.map((column) => (
                    <th key={column} scope="col" className="px-3 py-2 font-medium text-gray-500">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={REVIEW_TABLE_COLUMNS.length} className="px-3 py-8 text-center">
                    <Typography variant="body2" className="text-gray-500">
                      No reviews yet.
                    </Typography>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </Container>
  )
}
