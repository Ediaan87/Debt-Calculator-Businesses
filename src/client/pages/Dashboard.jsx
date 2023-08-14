import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getDebtCalculations from '@wasp/queries/getDebtCalculations';
import createDebtCalculation from '@wasp/actions/createDebtCalculation';

export function DashboardPage() {
  const { data: debtCalculations, isLoading, error } = useQuery(getDebtCalculations);
  const createDebtCalculationFn = useAction(createDebtCalculation);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateDebtCalculation = () => {
    createDebtCalculationFn({});
  };

  return (
    <div className='p-4'>
      <h1>Debt Capacity Calculator</h1>
      <p>This page will display the Debt Capacity Calculator.</p>
      <button
        onClick={handleCreateDebtCalculation}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Create Debt Calculation
      </button>
      <div>
        {debtCalculations.map((debtCalculation) => (
          <div
            key={debtCalculation.id}
            className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
          >
            <div>{debtCalculation.incomeStatement}</div>
            <div>{debtCalculation.balanceSheet}</div>
            <div>{debtCalculation.statementOfCashFlows}</div>
          </div>
        ))}
      </div>
    </div>
  );
}