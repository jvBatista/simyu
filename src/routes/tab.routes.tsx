import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBar } from '../components/molecules/TabBar';
import { Comparison } from '../screens/Comparison';
import { Info } from '../screens/Info';
import { Simulation } from '../screens/Simulation';

const {
    Screen,
    Navigator } = createBottomTabNavigator();

export const TabRoutes = () => {
    return (
        <Navigator
            tabBar={props => <TabBar {...props} />}
            screenOptions={{ headerShown: false, }}
        >
            <Screen
                name='Simular'
                component={Simulation}
            />

            <Screen
                name='Comparar'
                component={Comparison}
            />

            <Screen
                name='Taxas'
                component={Info}
            />
        </Navigator>
    )
}