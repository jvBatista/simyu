import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { TabButton } from '../components/molecules/TabButton';
import { Comparison } from '../screens/Comparison';
import { Info } from '../screens/Info';
import { Simulation } from '../screens/Simulation';
import theme from '../theme';

const {
    Screen,
    Navigator } = createBottomTabNavigator();

export const TabRoutes = () => {
    return (
        <Navigator
            screenOptions={{
                tabBarIconStyle: {
                    display: "none"
                },
                tabBarIcon: ({}) => {
                    return <View></View>;
                },
            }}
        >
            <Screen
                name='Simular'
                component={Simulation}
                options={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: theme.colors.ayu_900,
                        height: 58,
                        borderTopColor: theme.colors.ayu_900
                    },
                    tabBarActiveTintColor: theme.colors.orange,
                    tabBarInactiveTintColor: theme.colors.white,
                    tabBarIconStyle: {
                        display: "none"
                    },
                    tabBarLabelPosition: 'beside-icon',
                    tabBarLabelStyle: {
                        position: 'absolute',
                        fontFamily: theme.fonts.medium,
                        fontSize: 18,
                        letterSpacing: 1,
                        margin: 0,
                        padding: 0,
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        textAlignVertical: 'center',
                    },
                    tabBarButton: TabButton
                }}
            />

            <Screen
                name='Comparar'
                component={Comparison}
                options={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: theme.colors.ayu_900,
                        height: 58,
                        borderTopColor: theme.colors.ayu_900
                    },
                    tabBarActiveTintColor: theme.colors.orange,
                    tabBarInactiveTintColor: theme.colors.white,
                    tabBarIconStyle: {
                        display: "none"
                    },
                    tabBarLabelPosition: 'beside-icon',
                    tabBarLabelStyle: {
                        position: 'absolute',
                        fontFamily: theme.fonts.medium,
                        fontSize: 18,
                        letterSpacing: 1,
                        margin: 0,
                        padding: 0,
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        textAlignVertical: 'center',

                    },
                    tabBarButton: TabButton
                }}
            />

            <Screen
                name='Taxas'
                component={Info}
                options={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: theme.colors.ayu_900,
                        height: 58,
                        borderTopColor: theme.colors.ayu_900
                    },
                    tabBarActiveTintColor: theme.colors.orange,
                    tabBarInactiveTintColor: theme.colors.white,
                    tabBarIconStyle: {
                        display: "none"
                    },
                    tabBarLabelPosition: 'beside-icon',
                    tabBarLabelStyle: {
                        position: 'absolute',
                        fontFamily: theme.fonts.medium,
                        fontSize: 18,
                        letterSpacing: 1,
                        margin: 0,
                        padding: 0,
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        textAlignVertical: 'center',

                    },
                    tabBarButton: TabButton,
                }}
            />
        </Navigator>
    )
}