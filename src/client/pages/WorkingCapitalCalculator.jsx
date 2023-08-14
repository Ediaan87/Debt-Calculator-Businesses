import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAction } from '@wasp/actions';
import { useQuery } from '@wasp/queries';
import createWorkingCapitalCalculation from '@wasp/actions/createWorkingCapitalCalculation';
import getWorkingCapitalCalculations from '@wasp/queries/getWorkingCapitalCalculations';

export function WorkingCapitalCalculator() {
  const [cashConversionCycle, setCashConversionCycle] = useState(0);
  const createWorkingCapitalCalculationFn = useAction(createWorkingCapitalCalculation);
  const { data: workingCapitalCalculations, isLoading, error } = useQuery(getWorkingCapitalCalculations);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCalculate = () => {
    createWorkingCapitalCalculationFn({ cashConversionCycle });
    setCashConversionCycle(0);
  };

  return (
    <div className='p-4'>
      <div className='mb-4'>
        <label htmlFor='cashConversionCycle' className='mr-2'>Cash Conversion Cycle:</label>
        <input
          id='cashConversionCycle'
          type='number'
          className='border rounded px-2 py-1'
          value={cashConversionCycle}
          onChange={(e) => setCashConversionCycle(Number(e.target.value))}
        />
      </div>
      <button
        onClick={handleCalculate}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Calculate
      </button>
      <div className='mt-4'>
        {workingCapitalCalculations.map((calculation) => (
          <div key={calculation.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
            <div>Cash Conversion Cycle: {calculation.cashConversionCycle}</div>
          </div>
        ))}
      </div>
    </div>
  );
}