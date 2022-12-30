import { createContextualCan } from '@casl/react';
import React from 'react';
import { createForUser } from '../casl/casl.factory';

export const AbilityContext = React.createContext(createForUser());
export const Can = createContextualCan(AbilityContext.Consumer);
