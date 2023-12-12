import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { computed } from '@angular/core';
import { TUser } from '@libs/models';

export const AppStore = signalStore(
  {providedIn: 'root'},
  withState({
    user: null as TUser | null
  }),
  withComputed((store) => ({
    isAuthenticated: computed(() => !!store.user())
  })),
  withMethods((state) => {
    return {
      updateUser: (user: TUser) => {
        patchState(state, {
          user
        })
      }
    }
  })
);
