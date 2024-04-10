import { LoginType } from '@microsoft/mgt/dist/es6/exports.js';
import {
  registerMgtComponents,
  Providers,
  MockProvider,
  Msal2Provider,
} from './node_modules/@microsoft/mgt/dist/es6/index.js';

// Providers.globalProvider = new MockProvider(true);
Providers.globalProvider = new Msal2Provider({
  clientId: '30a88f34-83cd-4417-9b96-4aaa38744fd6',
  scopes: [
    'Calendars.ReadBasic',
    'Calendars.Read',
    'Calendars.ReadWrite',
    'Presence.Read.All',
    'User.Read.All',
    'People.Read.All',
    'Sites.Read.All',
    'Mail.Read',
    'Mail.ReadBasic',
    'Contacts.Read',
    'Chat.ReadWrite',
  ],
  loginType: LoginType.Popup,
});
registerMgtComponents();
