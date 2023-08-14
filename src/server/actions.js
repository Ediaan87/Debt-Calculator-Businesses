import HttpError from '@wasp/core/HttpError.js'

export const createDebtCalculation = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.DebtCalculation.create({
    data: {
      incomeStatement: args.incomeStatement,
      balanceSheet: args.balanceSheet,
      statementOfCashFlows: args.statementOfCashFlows,
      user: {
        connect: { id: context.user.id }
      }
    }
  });
}

export const createWorkingCapitalCalculation = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const newWorkingCapitalCalculation = await context.entities.WorkingCapitalCalculation.create({
    data: {
      cashConversionCycle: args.cashConversionCycle,
      user: { connect: { id: context.user.id } }
    }
  });

  return newWorkingCapitalCalculation;
}