import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Product } from '../types';

export type RootStackParamList = {
  Home: undefined;
  Detail: { product: Product };
  Add: undefined;
};

export type ItemDetailScreenNavigationProps = NativeStackNavigationProp<RootStackParamList,'Detail'>;
export type ItemDetailScreenRouteProps = RouteProp<RootStackParamList, 'Detail'>;
export type AddItemScreenNavigationProps = NativeStackNavigationProp<RootStackParamList,'Add'>;
