import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, Linking, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
// import api from '../../services/api';
import { FontAwesome as Icon } from "@expo/vector-icons";

import Button from "../../components/Button";
import Logo from "../../components/Logo";

import {
  Container,
  Title,
  TripList,
  Card,
  CardTitle,
  CardText,
  CardHeader,
  Stars,
  StarsTop,
  CardHeadeTop
} from "./styles";
import { RectButton } from 'react-native-gesture-handler';

interface Params {
  point_id: number;
}

interface Data {
  point: {
    image: string;
    image_url: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  items: {
    title: string;
  }[];
}

const Detail = () => {

  const [data, setData] = useState<Data>({} as Data);

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  // useEffect(() => {
  //   api.get(`points/${routeParams.point_id}`).then(response => {
  //     setData(response.data);
  //   });
  // }, []);

  function handleNavigateBack () {
    navigation.goBack();
  }

  function handleWhatsapp () {
    Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse sobre coleta de resíduos`);
  }

  function handleComposeMail () {
    // MailComposer.composeAsync({
    //   subject: 'Interesse na coleta de resíduos',
    //   recipients: [data.point.email],
    // })
  }

  // if (!data.point) {
  //   return null;
  // }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
       
        <View style={styles.header}>
          <TouchableOpacity onPress={handleNavigateBack}>
            <Icon name="arrow-left" size={25} color="#000" />
          </TouchableOpacity>
          <Title>Informações</Title>
          <Text></Text>
        </View>

        <Image style={styles.pointImage} source={require('../../assets/posto.jpg')} />
        <Text style={styles.pointName}>Posto São José</Text>
        <Text style={styles.pointItems}>Rua Sete de Setembro, 60</Text>
        <Text style={styles.pointItems}>São José dos Campos - SP</Text>

        {/* <Image style={styles.pointImage} source={{ uri: data.point.image_url }} />
      
        <Text style={styles.pointName}>{data.point.name}</Text>
        <Text style={styles.pointItems}>
          {data.items.map(item => item.title).join(', ')}
        </Text> */}
        <CardHeadeTop>
          <View>
            <Text style={styles.textTitle}>Preço</Text>
          </View>
          <StarsTop>
            <Icon name="star" size={20} color="#FFF" />
            <Icon name="star" size={20} color="#FFF" />
            <Icon name="star" size={20} color="#FFF" />
            <Icon name="star-half-o" size={20} color="#FFF" />
            <Icon name="star-o" size={20} color="#FFF" />
          </StarsTop>
        </CardHeadeTop>
        <CardHeadeTop>
          <View>
            <Text style={styles.textTitle}>Alimentação</Text>
          </View>
          <StarsTop>
            <Icon name="star" size={20} color="#FFF" />
            <Icon name="star" size={20} color="#FFF" />
            <Icon name="star" size={20} color="#FFF" />
            <Icon name="star" size={20} color="#FFF" />
            <Icon name="star-o" size={20} color="#FFF" />
          </StarsTop>
        </CardHeadeTop>
        <CardHeadeTop>
          <View>
            <Text style={styles.textTitle}>Segurança</Text>
          </View>
          <StarsTop>
            <Icon name="star" size={20} color="#FFF" />
            <Icon name="star" size={20} color="#FFF" />
            <Icon name="star" size={20} color="#FFF" />
            <Icon name="star" size={20} color="#FFF" />
            <Icon name="star-o" size={20} color="#FFF" />
          </StarsTop>
        </CardHeadeTop>
        <Title>Avaliações</Title>
        <Card>
          <CardHeader>
            <View>
              <CardTitle>João</CardTitle>
            </View>
            <Stars>
              <Icon name="star" size={20} color="#000" />
              <Icon name="star" size={20} color="#000" />
              <Icon name="star" size={20} color="#000" />
              <Icon name="star" size={20} color="#000" />
            </Stars>
          </CardHeader>

          <CardText>
            Este posto é muito bom!
          </CardText>
        </Card>
       
      </View> 
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 20,
    backgroundColor: "#fbd762",
  },
  header: {
    paddingHorizontal: 8,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },

  pointImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 32,
    marginBottom: 32
  },

  pointName: {
    color: '#000',
    fontSize: 24,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 0,
  },

  pointItems: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: '#000'
  },

  address: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    marginBottom: 10,
    marginTop: 0

  },

  textTitle: {
    color: '#322153',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },

  textContent: {
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  button: {
    width: '48%',
    backgroundColor: '#34CB79',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
  },
});

export default Detail;