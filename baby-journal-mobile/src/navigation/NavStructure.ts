import { LoadingScreen } from './Loading.screen';
import { AppNavigator } from './Root/App/App.navigator';
import { AppTabsNavigator } from './Root/App/AppTabs/AppTabs.navigator';
import { MileageDashboardScreen } from './Root/App/AppTabs/Mileage/MileageDashboard.screen';
import { ReportDashboardScreen } from './Root/App/AppTabs/Report/ReportDashboard.screen';
import { MenuScreen } from './Root/App/AppTabs/Settings/Menu.screen';
import { DashboardScreen } from './Root/App/AppTabs/Summary/Dashboard.screen';
import { TransactionDashboardScreen } from './Root/App/AppTabs/Transaction/TransactionDashboard.screen';
import { OnboardingNavigator } from './Root/App/Onboarding/Onboarding.navigator';
import { AccountInfoScreen } from './Root/App/Settings/AccountInfo.screen';
import { DebugScreen } from './Root/App/Settings/Debug.screen';
import { ExportScreen } from './Root/App/Settings/Export.screen';
import { AuthNavigator } from './Root/Auth/Auth.navigator';
import { LoginScreen } from './Root/Auth/Login.screen';
import { SignUpScreen } from './Root/Auth/SignUp.screen';
import { WelcomeScreen } from './Root/Auth/Welcome.screen';
import { RootNavigator } from './Root/Root.navigator';

/**
 * An overview of the entire nav structure of the app
 * TODO: update to reflect new stack navigators to organize parts of app
 */
export const NavStructure = {
  Root: {
    navigator: RootNavigator,
    screens: {
      Loading: LoadingScreen,
      Auth: {
        navigator: AuthNavigator,
        screens: {
          Welcome: WelcomeScreen,
          Login: LoginScreen,
          SignUp: SignUpScreen,
        },
      },
      App: {
        navigator: AppNavigator,
        screens: {
          AppTabs: {
            navigator: AppTabsNavigator,
            screens: {
              Summary: DashboardScreen,
              Transactions: TransactionDashboardScreen,
              Mileages: MileageDashboardScreen,
              Reports: ReportDashboardScreen,
              Settings: MenuScreen,
            },
          },
          Modal: undefined,
          Onboarding: {
            navigator: OnboardingNavigator,
            screens: {
              SetupSettings: undefined,
              SetupTeam: undefined,
              TryFeatures: undefined,
            },
          },
          // TODO: come back and clean this up when navigation is settled
          // NewExpense: undefined,
          // EditExpense: undefined,
          // ExpenseDetails: undefined,
          Export: ExportScreen,
          Unsent: undefined,
          Sent: undefined,
          Complete: undefined,
          AccountInfo: AccountInfoScreen,
          Debug: DebugScreen,
        },
      },
    },
  },
};
