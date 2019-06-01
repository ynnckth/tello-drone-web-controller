import React from 'react';
import BatteryStatus from './BatteryStatus';
import {render} from '@testing-library/react';

it('should render the component text correctly',async () => {
  const batteryStatusComponent = render(<BatteryStatus  batteryStatus={50}/>);
  expect(batteryStatusComponent.getByTestId('battery-status-text').innerHTML).toBe('50%');
});
