import { useAbility } from '@casl/react';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Action } from './casl/casl.factory';
import Loader from './Components/Loader';
import Menu from './Components/Menu';
import { AbilityContext, Can } from './Context/Ability';
import { usePages } from './utils/pages';
export default function Router() {
  const ability = useAbility(AbilityContext);
  const pages = usePages(ability);
  return (
    <BrowserRouter basename="/apps/mail">
      <Menu />
      <Routes>
        {pages.map((page, index) => (
          <Route
            key={index}
            path={page.path}
            element={
              <Can
                I={page.right || Action.Read}
                passThrough
                a={page.subject || 'all'}
              >
                {(allowed) =>
                  (allowed || (!page.right && !page.subject)) && (
                    <React.Suspense
                      fallback={
                        <>
                          <Loader />
                        </>
                      }
                    >
                      <page.element />
                    </React.Suspense>
                  )
                }
              </Can>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
