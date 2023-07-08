import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { marketingStrategyValidationSchema } from 'validationSchema/marketing-strategies';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.marketing_strategy
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getMarketingStrategyById();
    case 'PUT':
      return updateMarketingStrategyById();
    case 'DELETE':
      return deleteMarketingStrategyById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getMarketingStrategyById() {
    const data = await prisma.marketing_strategy.findFirst(convertQueryToPrismaUtil(req.query, 'marketing_strategy'));
    return res.status(200).json(data);
  }

  async function updateMarketingStrategyById() {
    await marketingStrategyValidationSchema.validate(req.body);
    const data = await prisma.marketing_strategy.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteMarketingStrategyById() {
    const data = await prisma.marketing_strategy.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
