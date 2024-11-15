import React from 'react';
import { Field, Switch as HeadlessSwitch } from '@headlessui/react';

const Switch = ({ checked, onChange, label }) => {
  return (
    <Field>
      <div className="flex items-center">
        {label && (
          <label className="mr-4 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <HeadlessSwitch
          checked={checked}
          onChange={onChange}
          className={`${
            checked ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              checked ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </HeadlessSwitch>
      </div>
    </Field>
  );
};

export { Switch };