import HttpError from '@wasp/core/HttpError.js'

export const getDebtCalculations = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.DebtCalculation.findMany({
    where: {
      user: { id: context.user.id }
    }
  })
}

export const getWorkingCapitalCalculations = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.WorkingCapitalCalculation.findMany({
    where: {
      user: { id: context.user.id }
    }
  })
}