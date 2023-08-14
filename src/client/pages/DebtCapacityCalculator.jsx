import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import createDebtCalculation from '@wasp/actions/createDebtCalculation';
import getDebtCalculations from '@wasp/queries/getDebtCalculations';

export function DebtCapacityCalculator() {
  const { data: debtCalculations, isLoading, error } = useQuery(getDebtCalculations);
  const createDebtCalculationFn = useAction(createDebtCalculation);
  const [incomeStatement, setIncomeStatement] = useState(0);
  const [balanceSheet, setBalanceSheet] = useState(0);
  const [statementOfCashFlows, setStatementOfCashFlows] = useState(0);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCalculateDebtCapacity = () => {
    createDebtCalculationFn({
      incomeStatement,
      balanceSheet,
      statementOfCashFlows
    });
    setIncomeStatement(0);
    setBalanceSheet(0);
    setStatementOfCashFlows(0);
  };

  return (
    <div className='p-4'>
      <div className='flex gap-x-4 py-5'>
        <input
          type='number'
          placeholder='Income Statement'
          className='px-1 py-2 border rounded text-lg'
          value={incomeStatement}
          onChange={(e) => setIncomeStatement(Number(e.target.value))}
        />
        <input
          type='number'
          placeholder='Balance Sheet'
          className='px-1 py-2 border rounded text-lg'
          value={balanceSheet}
          onChange={(e) => setBalanceSheet(Number(e.target.value))}
        />
        <input
          type='number'
          placeholder='Statement of Cash Flows'
          className='px-1 py-2 border rounded text-lg'
          value={statementOfCashFlows}
          onChange={(e) => setStatementOfCashFlows(Number(e.target.value))}
        />
        <button
          onClick={handleCalculateDebtCapacity}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Calculate
        </button>
      </div>
      <div>
        {debtCalculations.map((calculation) => (
          <div
            key={calculation.id}
            className='py-2 px-2 flex items-center hover:bg-slate-100 gap-x-2 rounded'
          >
            <p>Income Statement: {calculation.incomeStatement}</p>
            <p>Balance Sheet: {calculation.balanceSheet}</p>
            <p>Statement of Cash Flows: {calculation.statementOfCashFlows}</p>
          </div>
        ))}
      </div>
    </div>
  );
}